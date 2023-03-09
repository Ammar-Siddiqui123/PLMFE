import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventoryMasterService } from '../inventory-master.service';
import labels from '../../../labels/labels.json'
import { AuthService } from 'src/app/init/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-kit-item',
  templateUrl: './kit-item.component.html',
  styleUrls: ['./kit-item.component.scss']
})
export class KitItemComponent implements OnInit, OnChanges {

  @Input() kitItem: FormGroup;
  public userData: any;
  kitItemsList: any = [];
  dialogitemNumber: any = '';
  dialogDescription: any = '';
  dialogitemNumberDisplay: any = '';
  isFormFilled:any;
  Ikey:any;
  oldNumber="";
  @ViewChild('namebutton', { read: ElementRef, static:false }) namebutton: ElementRef;



  searchValue: any = '';
  searchList: any;
  isValidForm: boolean = false;

  @ViewChild('additemNumber') additemNumber: TemplateRef<any>;
  @ViewChild('description') description: TemplateRef<any>;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  sendNotification(e?) {
    this.notifyParent.emit(e);
  }

  constructor(private invMasterService: InventoryMasterService,
    private toastr: ToastrService,
    private authService: AuthService,
    private dialog: MatDialog,
    private el: ElementRef
    ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.kitItem.controls['kitInventories'].value) {
      this.kitItemsList = [...this.kitItem.controls['kitInventories'].value];
    }
  }

  openPrintRangeDialog() {

  }
  addCatRow(e: any) {
    this.Ikey =  this.kitItemsList.length;
    this.kitItemsList.push({
      itemNumber: '',
      description: '',
      specialFeatures: '',
      kitQuantity: 0
      
    })
    // console.log(this.kitItemsList);
    
  }

  dltCategory(e: any) {

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
     if(result === 'Yes'){
      if (e?.itemNumber) {
        let paylaod = {
          "itemNumber": this.kitItem.controls['itemNumber'].value,
          "kitItem": e.itemNumber,
          "kitQuantity": e.kitQuantity,
          "specialFeatures": e.specialFeatures,
          "username": this.userData.userName,
          "wsid": this.userData.wsid,
        }
        this.invMasterService.get(paylaod, '/Admin/DeleteKit').subscribe((res: any) => {
  
          if (res.isExecuted) {
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.sendNotification();
          }
  
        })
      } else {
        this.kitItemsList.shift()
      }
     }
    })

    

    

  }


  saveKit(newItem: any, e: any) {

    if (!e.itemNumber || !e.kitQuantity) {            
      this.toastr.error("Please fill required fields", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }

    if (parseInt(e.kitQuantity) < 0) {
      this.toastr.error("Qty must be greater than 0", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;        
    }

    let newRecord = true;
    this.kitItem.controls['kitInventories'].value.forEach(element => {
      if (element.itemNumber == newItem) {
        newRecord = false;
        return;
      }
    });
    if (e.itemNumber && newRecord && e.kitQuantity) {
      let paylaod = {
        "itemNumber": this.kitItem.controls['itemNumber'].value,
        "kitItem": newItem,
        "kitQuantity": e.kitQuantity,
        "specialFeatures": e.specialFeatures,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      this.invMasterService.get(paylaod, '/Admin/InsertKit').subscribe((res: any) => {

        if (res.isExecuted) {
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          this.sendNotification();
        } else {
          this.toastr.error("Invalid Input", 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }

      })
    } else if (e.itemNumber && !newRecord && e.kitQuantity) {

      let paylaod = {
        "itemNumber": this.kitItem.controls['itemNumber'].value,
        "oldKitItem": this.oldNumber!=""?this.oldNumber:newItem,
        "newKitItem": newItem,
        "kitQuantity": e.kitQuantity,
        "specialFeatures": e.specialFeatures,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      
      // console.log(paylaod);
      this.invMasterService.get(paylaod, '/Admin/UpdateKit').subscribe((res: any) => {

        if (res.isExecuted) {
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          this.sendNotification();
        } else {
          this.toastr.error("Invalid Input", 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }

      })
    }

  }


  
  closeDialog()
  {
    this.dialog.closeAll();
  }

  openAddItemNumDialog(e): void {
    const dialogRef = this.dialog.open(this.additemNumber, {
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((x) => {

      if (x) {
        this.oldNumber = e.itemNumber;
        e.itemNumber =  this.dialogitemNumber!=""?this.dialogitemNumber:e.itemNumber;
        e.description = this.dialogDescription!=""?this.dialogDescription:e.description;
        this.isFormFilled = true;
      }
    })
  }

  openDescriptionDialog(e): void {
    const dialogRef = this.dialog.open(this.description, {
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((x) => {

      if (x) {
        e.description =  this.dialogDescription!=""?this.dialogDescription:e.description 
      }
    })
  }


  getSearchList(e: any) {

    this.searchValue = e.currentTarget.value;
    // console.log(e.currentTarget.value)
    let paylaod = {
      "itemNumber": e.currentTarget.value,
      "beginItem": "---",
      "isEqual": false,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Common/SearchItem').subscribe((res: any) => {
      if (res.data) {
        this.searchList = res.data
        if (this.searchList.length > 0) {
          this.isValidForm = false;
        }
      }
    });
  }

  onSearchSelect(e: any) {

    if (this.kitItem.controls['itemNumber'].value == e.option.value.itemNumber) {
      this.dialogitemNumber = '';
      this.dialogDescription = '';
      this.toastr.error("Item " + e.option.value.itemNumber + " cannot belong to itself in a kit.", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.isValidForm = false
      return;
    } else {

      let alreadyExits = false;
      this.kitItem.controls['kitInventories'].value.forEach(element => {
        if (element.itemNumber == e.option.value.itemNumber) {
          alreadyExits = true;
          return;
        }
      });
      if (!alreadyExits) {
        this.dialogitemNumber = e.option.value.itemNumber;
        this.dialogDescription = e.option.value.description;
      } else {
        this.isValidForm = false
        this.toastr.error("Item " + this.dialogitemNumber + " already exists in kit.", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.dialogitemNumber = '';
        this.dialogDescription = '';
        return;
      }
    }

    if (e.option.value.itemNumber.trim() !== '') {
      this.isValidForm = true
    }
    else {
      this.isValidForm = false;
    }
  }

  displayFn(e) {
    return e?.itemNumber
  }

  submitFunc(){
    this.dialogitemNumberDisplay = '';
  }
  checkIfFilled(val: any, input?: any, index?:any){
    //Work need to be continue from here
    // console.log('kit_'+index);
    // console.log(this.namebutton.nativeElement.classList);
    
    if(this.namebutton.nativeElement.classList.contains('kit_'+index)){
      this.namebutton.nativeElement.disabled = false;
      this.namebutton.nativeElement.classList.remove('mat-button-disabled')
    }
    if(this.namebutton.nativeElement.classList.contains('kit_push_'+index)){
      // console.log('kit_push_'+index);
      // const myHtmlEl = document.getElementsByClassName('kit_push_'+index).item(0) as HTMLElement;
      // myHtmlEl.removeAttribute('disabled');
      
      this.namebutton.nativeElement.disabled = false;
      this.namebutton.nativeElement.classList.remove('mat-button-disabled')
    }
    // this.namebutton.nativeElement.classList.remove('mat-button-disabled')
    // let myTag = this.el.nativeElement.querySelector("kit_"+index); 
    // myTag.classList.remove('mat-button-disabled');

    if(input === 'kitQuantity'){
      if(val > 0){
        // console.log(index);
        // console.log(val.target.dataset.index);
        this.isFormFilled = true;
      }
    }
     if(input === 'specialFeatures'){
        this.isFormFilled = true;
    }

    if(val.toString().trim() !== ''){
      this.isFormFilled = true;
    } 
    else{
      this.isFormFilled = false;
    }  
  }

}

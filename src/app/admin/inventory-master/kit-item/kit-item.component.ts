import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventoryMasterService } from '../inventory-master.service';
import labels from '../../../labels/labels.json'
import { AuthService } from 'src/app/init/auth.service';
import { MatDialog } from '@angular/material/dialog';

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
  dialogitemNumberDisplay: any  ='';

  searchValue: any = '';
  searchList: any;

  @ViewChild('additemNumber') additemNumber: TemplateRef<any>;
  @ViewChild('description') description: TemplateRef<any>;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  sendNotification(e?) {
    this.notifyParent.emit(e);
  }

  constructor(private invMasterService: InventoryMasterService,
    private toastr: ToastrService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.kitItem.controls['kitInventories'].value) {
      this.kitItemsList = this.kitItem.controls['kitInventories'].value;
    }
  }

  openPrintRangeDialog() {

  }
  addCatRow(e: any) {
    this.kitItemsList.unshift({
      itemNumber: '',
      description: '',
      specialFeatures: '',
      kitQuantity: ''
    })

  }

  dltCategory(e: any) {
    if (e.itemNumber) {
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
          this.toastr.success(labels.alert.success, 'Success!', {
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

  saveKit(newItem: any, e: any) {
    
    let newRecord = true;
    this.kitItemsList.forEach(element => {
      if(element.itemNumber == newItem){
        newRecord = false;
        return;
      }
    });
      if (e.itemNumber && newRecord) {
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
      } else if (e.itemNumber && !newRecord ){

       let paylaod = {
        "itemNumber": this.kitItem.controls['itemNumber'].value,
        "oldKitItem": e.itemNumber,
        "newKitItem": newItem,
        "kitQuantity": e.kitQuantity,
        "specialFeatures": e.specialFeatures,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
        }
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

  openAddItemNumDialog(e): void {
    const dialogRef = this.dialog.open(this.additemNumber, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((x) => {

      if (x) {
        e.itemNumber = this.dialogitemNumber;
        e.description = this.dialogDescription;
      }
    })
  }

  openDescriptionDialog(e): void {
    const dialogRef = this.dialog.open(this.description, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((x) => {

      if (x) {
        e.description = this.dialogDescription
      }
    })
  }


  getSearchList(e: any) {

    this.searchValue = e.currentTarget.value;
    console.log(e.currentTarget.value)
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
      }
    });
  }

  onSearchSelect(e: any) {
    
    if (this.kitItem.controls['itemNumber'].value == e.option.value.itemNumber) {
      this.dialogitemNumber = '';
      this.dialogDescription = '';
      this.toastr.error("Item Number and Kit Item Number cann't be same", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    } else {

    let alreadyExits = false;
    this.kitItemsList.forEach(element => {
      if(element.itemNumber == e.option.value.itemNumber){
        alreadyExits = true;
        return;
      }
    });
    if(!alreadyExits){
      this.dialogitemNumber = e.option.value.itemNumber;
      this.dialogDescription = e.option.value.description;
    } else {
      this.toastr.error("Already Exists", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.dialogitemNumber = '';
      this.dialogDescription = '';
    }
  }
  }

  displayFn(e){
    return e.itemNumber
  }

}

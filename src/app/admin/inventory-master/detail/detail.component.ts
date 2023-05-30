import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { ItemCategoryComponent } from '../../dialogs/item-category/item-category.component';
import { ItemNumberComponent } from '../../dialogs/item-number/item-number.component';
import { UnitMeasureComponent } from '../../dialogs/unit-measure/unit-measure.component';
import { UpdateDescriptionComponent } from '../../dialogs/update-description/update-description.component';
import { InventoryMasterService } from '../inventory-master.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private eventsSubscription: Subscription;
  @Input() events: Observable<String>;

  @Input() details: FormGroup;  
  public userData: any;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  sendNotification(e) {
      this.notifyParent.emit(e);
  }

  public setVal: boolean = false;
  spliUrl;
  

  constructor(   
    private invMasterService: InventoryMasterService, 
    private router: Router,
    private sharedService:SharedService,
    private authService: AuthService, 
    private dialog: MatDialog,
    private toastr: ToastrService,) { }
  
  ngOnInit(): void {
     
    this.userData = this.authService.userData();
    this.setVal = localStorage.getItem('routeFromOrderStatus') == 'true' ? true : false;
   
    this.spliUrl=this.router.url.split('/');
   
    this.eventsSubscription = this.events.subscribe((val) => {
      if(val==='h' && this.details.controls['histCount'].value!=0){
        this.RedirectInv('TransactionHistory')
      }
      if(val==='v' && this.details.controls['openCount'].value!=0){
        this.RedirectInv('OpenTransaction')
      }
      if(val==='r' && this.details.controls['procCount'].value!=0){
        this.RedirectInv('ReprocessTransaction')
      }
    
    });
  }



  handleInputChange(event: Event) {
    this.sharedService.updateInvMasterState(event,true)
  }
  public openItemNumDialog() {

    let dialogRef = this.dialog.open(ItemNumberComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        itemNumber: this.details.controls['itemNumber'].value,
        newItemNumber : '',
        addItem : false
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        let paylaod = {
          "oldItemNumber": this.details.controls['itemNumber'].value,
          "newItemNumber": result,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.invMasterService.update(paylaod, '/Admin/UpdateItemNumber').subscribe((res: any) => {
          // console.log(res.data);
          if (res.isExecuted) {
            this.details.patchValue({
              'itemNumber' : res.data.newItemNumber
            }); 
            this.sendNotification({newItemNumber: res.data.newItemNumber});
          } else {
            this.toastr.error("Item Number Already Exists.", 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      }

    })
  }

  public openDescriptionDialog() {
    let dialogRef = this.dialog.open(UpdateDescriptionComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        description: this.details.controls['description'].value,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sharedService.updateInvMasterState(result,true)
        this.details.patchValue({
          'description' : result.description
        });

      }
    })
  }

  public opencategoryDialog() {
    let dialogRef = this.dialog.open(ItemCategoryComponent, {
      height: 'auto',
      width: '860px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      // if(result.category!='' && result!=true)
      // {
        this.details.patchValue({        
          'category': result.category      
        });
      // }
      // if(result.subCategory!='' && result!=true)
      // {
        this.details.patchValue({            
          'subCategory': result.subCategory,        
        });
      // }
      
      this.sharedService.updateInvMasterState(result,true)
    })
  }
  public openUmDialog() {
    // console.log(this.details.controls['replenishmentLevel'].value)
    let dialogRef = this.dialog.open(UnitMeasureComponent, {
      height: 'auto',
      width: '750px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if(result!='' && result!=true)
      { 
        this.details.patchValue({
          'unitOfMeasure' : result
        });
  
      }
    })
  }


 RedirectInv(type){

// if(this.details.controls['histCount'].value==0 || this.details.controls['openCount'].value==0 ||this.details.controls['procCount'].value==0 ) return


//   if( this.spliUrl[1] == 'OrderManager' ){
//     this.router.navigate([]).then((result) => {
//       let url = '/#/OrderManager/OrderStatus?itemNumber=' + this.details.controls['itemNumber'].value + '&type='+ type.toString().replace(/\+/gi, '%2B');
//       window.open(url, '_blank');
//     });
//  }
//  else {
//   this.router.navigate([]).then((result) => {
//     let url = '/#/admin/transaction?itemNumber=' + this.details.controls['itemNumber'].value + '&type='+ type.toString().replace(/\+/gi, '%2B');
//     window.open(url, '_blank');
//   });

//  }

  if(this.setVal == true){

this.router.navigate([]).then((result) => {
      let url = '/#/OrderManager/OrderStatus?itemNumber=' + this.details.controls['itemNumber'].value + '&type='+ type.toString().replace(/\+/gi, '%2B');
      window.open(url, '_blank');
    });
  }else{

    this.router.navigate([]).then((result) => {
      let url = '/#/admin/transaction?itemNumber=' + this.details.controls['itemNumber'].value + '&type='+ type.toString().replace(/\+/gi, '%2B');
      window.open(url, '_blank');
    });
  }

  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}

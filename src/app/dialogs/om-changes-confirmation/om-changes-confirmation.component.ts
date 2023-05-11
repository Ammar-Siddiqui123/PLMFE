import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/common/services/global.service';
import { AuthService } from 'src/app/init/auth.service';
import { OrderManagerService } from 'src/app/order-manager/order-manager.service';

@Component({
  selector: 'app-om-changes-confirmation',
  templateUrl: './om-changes-confirmation.component.html',
  styleUrls: ['./om-changes-confirmation.component.scss']
})
export class OmChangesConfirmationComponent implements OnInit {

  public userData: any;

  orderForm   : FormGroup;

  constructor(private dialog          : MatDialog,
              public dialogRef        : MatDialogRef<OmChangesConfirmationComponent>,
              private toastr           : ToastrService,
              public formBuilder      : FormBuilder,
              private authService     : AuthService,
              public globalService    : GlobalService,
              private OMService       : OrderManagerService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.orderForm = this.formBuilder.group({
      reqDate        : new FormControl({ value: false, disabled : data.reqDateDis }, Validators.compose([])),
      notes          : new FormControl({ value: false, disabled : data.notesDis }, Validators.compose([])),
      priority       : new FormControl({ value: false, disabled : data.priorityDis }, Validators.compose([])),
      user1          : new FormControl({ value: false, disabled : data.user1Dis }, Validators.compose([])),      
      user2          : new FormControl({ value: false, disabled : data.user2Dis }, Validators.compose([])),      
      user3          : new FormControl({ value: false, disabled : data.user3Dis }, Validators.compose([])),      
      user4          : new FormControl({ value: false, disabled : data.user4Dis }, Validators.compose([])),      
      user5          : new FormControl({ value: false, disabled : data.user5Dis }, Validators.compose([])),      
      user6          : new FormControl({ value: false, disabled : data.user6Dis }, Validators.compose([])),      
      user7          : new FormControl({ value: false, disabled : data.user7Dis }, Validators.compose([])),      
      user8          : new FormControl({ value: false, disabled : data.user8Dis }, Validators.compose([])),      
      user9          : new FormControl({ value: false, disabled : data.user9Dis }, Validators.compose([])),      
      user10         : new FormControl({ value: false, disabled : data.user10Dis }, Validators.compose([])),
      emergency      : new FormControl({ value: false, disabled : data.emergencyDis }, Validators.compose([])),
      label          : new FormControl({ value: false, disabled : data.labelDis }, Validators.compose([])),
    });

  }

  ngOnInit(): void {

    this.userData = this.authService.userData();
    // if(this.data.reqDateDis) this.orderForm.controls['reqDate'].disable();
    // else this.orderForm.controls['reqDate'].enable();

    // if(this.data.notesDis) this.orderForm.controls['notes'].disable();
    // else this.orderForm.controls['notes'].enable();
    
    // if(this.data.priorityDis) this.orderForm.controls['priority'].disable();
    // else this.orderForm.controls['priority'].enable();

    // if(this.data.user1Dis) this.orderForm.controls['user1'].disable();
    // else this.orderForm.controls['user1'].enable();

    // if(this.data.user2Dis) this.orderForm.controls['user2'].disable();
    // else this.orderForm.controls['user2'].enable();

    // if(this.data.user3Dis) this.orderForm.controls['user3'].disable();
    // else this.orderForm.controls['user3'].enable();

    // if(this.data.user4Dis) this.orderForm.controls['user4'].disable();
    // else this.orderForm.controls['user4'].enable();
    
    // if(this.data.user5Dis) this.orderForm.controls['user5'].disable();
    // else this.orderForm.controls['user5'].enable();

    // if(this.data.user6Dis) this.orderForm.controls['user6'].disable();
    // else this.orderForm.controls['user6'].enable();

    // if(this.data.user7Dis) this.orderForm.controls['user7'].disable();
    // else this.orderForm.controls['user7'].enable();

    // if(this.data.user8Dis) this.orderForm.controls['user8'].disable();
    // else this.orderForm.controls['user8'].enable();

    // if(this.data.user9Dis) this.orderForm.controls['user9'].disable();
    // else this.orderForm.controls['user9'].enable();

    // if(this.data.user10Dis) this.orderForm.controls['user10'].disable();
    // else this.orderForm.controls['user10'].enable();
    
    // if(this.data.emergencyDis) this.orderForm.controls['emergency'].disable();
    // else this.orderForm.controls['emergency'].enable();

    // if(this.data.labelDis) this.orderForm.controls['label'].disable();
    // else this.orderForm.controls['label'].enable();
  }

  updateOrder() {
    try {

      let payload = {
        username: this.userData.userName,
        wsid: this.userData.wsid,
        viewType: this.data.viewType,
        orderType: this.data.orderType,
        id: this.data.order.id,
        requiredDate: this.data.order.reqDate,
        notes: this.data.order.notes,
        priority: this.data.order.priority,
        user1: this.data.order.user1,
        user2: this.data.order.user2,
        user3: this.data.order.user3,
        user4: this.data.order.user4,
        user5: this.data.order.user5,
        user6: this.data.order.user6,
        user7: this.data.order.user7,
        user8: this.data.order.user8,
        user9: this.data.order.user9,
        user10: this.data.order.user10,
        emergency: this.data.order.emergency,
        label: this.data.order.label,
        checkRequiredDate: this.orderForm.controls['reqDate'].value,
        checkNotes: this.orderForm.controls['notes'].value,
        checkPriority: this.orderForm.controls['priority'].value,
        checkUser1: this.orderForm.controls['user1'].value,
        checkUser2: this.orderForm.controls['user2'].value,
        checkUser3: this.orderForm.controls['user3'].value,
        checkUser4: this.orderForm.controls['user4'].value,
        checkUser5: this.orderForm.controls['user5'].value,
        checkUser6: this.orderForm.controls['user6'].value,
        checkUser7: this.orderForm.controls['user7'].value,
        checkUser8: this.orderForm.controls['user8'].value,
        checkUser9: this.orderForm.controls['user9'].value,
        checkUser10: this.orderForm.controls['user10'].value,
        checkEmergency: this.orderForm.controls['emergency'].value,
        checkLabel: this.orderForm.controls['label'].value,        
      };
  
      this.OMService.get(payload, '/OrderManager/OrderManagerRecordUpdate').subscribe((res: any) => {
        if (res.isExecuted) {
          this.dialogRef.close({
            isExecuted: true,
            disableUpdateBtn: true,
            clickDisplayRecord: true,
          });
        }
        else this.toastr.error("An Error occured while retrieving data.", 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
      });

    } catch (error) {
      console.log(error);      
    }
  }

}

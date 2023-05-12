import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OmChangesConfirmationComponent } from '../om-changes-confirmation/om-changes-confirmation.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/common/services/global.service';

@Component({
  selector: 'app-om-update-record',
  templateUrl: './om-update-record.component.html',
  styleUrls: ['./om-update-record.component.scss']
})
export class OmUpdateRecordComponent implements OnInit {

  orderForm   : FormGroup;

  constructor(private dialog          : MatDialog,
              public dialogRef        : MatDialogRef<OmUpdateRecordComponent>,
              public formBuilder      : FormBuilder,
              public globalService    : GlobalService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.orderForm = this.formBuilder.group({
      orderNum       : new FormControl({ value: '', disabled : true }, Validators.compose([])),
      itemNum        : new FormControl({ value: '', disabled : true }, Validators.compose([])),
      supItemNum     : new FormControl({ value: '', disabled : true }, Validators.compose([])),
      reqDate        : new FormControl('', Validators.compose([])),
      notes          : new FormControl('', Validators.compose([])),
      priority       : new FormControl('', Validators.compose([])),
      user1          : new FormControl('', Validators.compose([])),      
      user2          : new FormControl('', Validators.compose([])),      
      user3          : new FormControl('', Validators.compose([])),      
      user4          : new FormControl('', Validators.compose([])),      
      user5          : new FormControl('', Validators.compose([])),      
      user6          : new FormControl('', Validators.compose([])),      
      user7          : new FormControl('', Validators.compose([])),      
      user8          : new FormControl('', Validators.compose([])),      
      user9          : new FormControl('', Validators.compose([])),      
      user10         : new FormControl('', Validators.compose([])),
      emergency      : new FormControl('', Validators.compose([])),
      label          : new FormControl('', Validators.compose([])),
    });

  }

  ngOnInit(): void {
    this.orderForm.patchValue({
      orderNum       : this.data.orderNumber,
      itemNum        : this.data.itemNumber,
      supItemNum     : this.data.supplierItemID,
      reqDate        : this.data.requiredDate,
      notes          : this.data.notes,
      priority       : this.data.priority,
      user1          : this.data.userField1,
      user2          : this.data.userField2,
      user3          : this.data.userField3,
      user4          : this.data.userField4,
      user5          : this.data.userField5,
      user6          : this.data.userField6,
      user7          : this.data.userField7,
      user8          : this.data.userField8,
      user9          : this.data.userField9,
      user10         : this.data.userField10,
      emergency      : this.data.emergency ? 'True' : 'False',
      label          : this.data.label ? 'True' : 'False',
    });
  }

  openOmChangesConfirm() {

    const values = this.orderForm.value;

    let dialogRef = this.dialog.open(OmChangesConfirmationComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
      data: {
        order      : { id : this.data.id, ...this.orderForm.value },
        reqDateDis : (values.reqDate != this.data.requiredDate) ? false : true,
        notesDis   : (values.notes != this.data.notes) ? false : true,
        priorityDis: (values.priority != this.data.priority) ? false : true,
        user1Dis   : (values.user1 != this.data.userField1) ? false : true,
        user2Dis   : (values.user2 != this.data.userField2) ? false : true,
        user3Dis   : (values.user3 != this.data.userField3) ? false : true,
        user4Dis   : (values.user4 != this.data.userField4) ? false : true,
        user5Dis   : (values.user5 != this.data.userField5) ? false : true,
        user6Dis   : (values.user6 != this.data.userField6) ? false : true,
        user7Dis   : (values.user7 != this.data.userField7) ? false : true,
        user8Dis   : (values.user8 != this.data.userField8) ? false : true,
        user9Dis   : (values.user9 != this.data.userField9) ? false : true,
        user10Dis  : (values.user10 != this.data.userField10) ? false : true,        
        emergencyDis: (values.emergency != this.data.emergency) || (values.emergency.toLowerCase() == 'true' && this.data.emergency == '0') || (values.emergency.toLowerCase() == 'false' && this.data.emergency == '1')
                      ? false : true,
        labelDis    : (values.label != this.data.label) || (values.label == 'True' && this.data.label == '0') || (values.label == 'False' && this.data.label == '1')
                      ? false : true,        
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { OrderManagerService } from 'src/app/order-manager/order-manager.service';
import labels from '../../labels/labels.json';

@Component({
  selector: 'app-om-user-field-data',
  templateUrl: './om-user-field-data.component.html',
  styleUrls: ['./om-user-field-data.component.scss']
})
export class OmUserFieldDataComponent implements OnInit {

  userData: any;
  userFieldData: any;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private orderManagerService: OrderManagerService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<OmUserFieldDataComponent>,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getUserFieldData();
  }

  getUserFieldData(loader: boolean = false) {
    let payload = {
      "userName": this.userData.userName,
      "wsid": this.userData.wsid,
      "appName": ""
    }
    this.orderManagerService.get(payload, '/OrderManager/UserFieldData', loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.userFieldData = res.data[0];
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  updateUserFieldData(loader: boolean = false) {
    let payload: any = {
      userField1: this.userFieldData.userField1,
      userField2: this.userFieldData.userField2,
      userField3: this.userFieldData.userField3,
      userField4: this.userFieldData.userField4,
      userField5: this.userFieldData.userField5,
      userField6: this.userFieldData.userField6,
      userField7: this.userFieldData.userField7,
      userField8: this.userFieldData.userField8,
      userField9: this.userFieldData.userField9,
      userField10: this.userFieldData.userField10,
      wsid: this.userData.wsid
    };
    this.orderManagerService.get(payload, '/OrderManager/UserFieldDataUpdate',loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.dialogRef.close(res.data);
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalconfigService } from 'src/app/global-config/globalconfig.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-global-config-set-sql',
  templateUrl: './global-config-set-sql.component.html',
  styleUrls: ['./global-config-set-sql.component.scss'],
})
export class GlobalConfigSetSqlComponent implements OnInit {
  form_heading = 'SQL Auth Username and Password';
  userName: any = '';
  password: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
    private globalConfService: GlobalconfigService
  ) {}

  ngOnInit(): void {
    this.getConnectionUser();
  }

  getConnectionUser() {
    let payload = {
      ConnectionName: this.data.connectionName,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/ConnectionUserPassword')
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.userName = res.data.user;
            this.password = res.data.password;
          }
        },
        (error) => {}
      );
  }
  saveLogin() {
    let payload = {
      ConnectionName: this.data.connectionName,
      UserName: this.userName,
      Password: this.password,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/ConnectionUserPasswordUpdate')
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
            this.dialog.closeAll();
          }
        },
        (error) => {
          this.toastr.success(labels.alert.went_worng, 'Errpr!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          this.dialog.closeAll();
        }
      );
  }
  clearLoginInfo() {
    this.userName = '';
    this.password = '';
  }
}

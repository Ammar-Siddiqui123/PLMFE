import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalconfigService } from 'src/app/global-config/globalconfig.service';
import labels from '../../../labels/labels.json';
import { SqlAuthConfirmationComponent } from '../sql-auth-confirmation/sql-auth-confirmation.component';

@Component({
  selector: 'app-global-config-set-sql',
  templateUrl: './global-config-set-sql.component.html',
  styleUrls: ['./global-config-set-sql.component.scss'],
})
export class GlobalConfigSetSqlComponent implements OnInit {
  form_heading = 'SQL Auth Username and Password';
  userName: any ;
  password: any;
  connectionName:any;
  public toggle_password = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
    private globalConfService: GlobalconfigService
  ) {

    this.userName=data.userName
    this.password=data.password;
    this.connectionName=data.ConnectionName;
  }

  ngOnInit(): void {
   
    // this.getConnectionUser();
  }

  getConnectionUser() {
    // let payload = {
    //   ConnectionName: this.data.connectionName,
    // };
    // this.globalConfService
    //   .get(payload, '/GlobalConfig/ConnectionUserPassword')
    //   .subscribe(
    //     (res: any) => {
   
          
    //       if (res.isExecuted) {
         
    //         this.userName='';
    //         this.password='';
    //         this.userName = res.data && res.data.user?res.data.user:'';
    //         this.password = res.data && res.data.password?res.data.password:'';
    //       }
    //     },
    //     (error) => {}
    //   );
  }
  saveLogin() {

    const dialogRef = this.dialog.open(SqlAuthConfirmationComponent, {
      height: 'auto',
      width: '560px',
    
    });
    dialogRef.afterClosed().subscribe((res) => {
    

      if(res.isExecuted){
        let payload = {
          ConnectionName: this.connectionName,
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
                this.dialogRef.close({isExecuted:true})
    
              }
            },
            (error) => {
              this.toastr.success(labels.alert.went_worng, 'Errpr!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
              this.dialogRef.close({isExecuted:true})
    
            }
          );
      }
    });

   
   
  }
  clearLoginInfo() {
    this.userName = '';
    this.password = '';
  }
}

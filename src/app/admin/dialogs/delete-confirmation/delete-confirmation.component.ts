import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import { WarehouseService } from 'src/app/common/services/warehouse.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json';
import { InventoryMapService } from '../../inventory-map/inventory-map.service';
import { VelocityCodeService } from 'src/app/common/services/velocity-code.service';
import { GlobalconfigService } from 'src/app/global-config/globalconfig.service';
import { TransactionService } from '../../transaction/transaction.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
})
export class DeleteConfirmationComponent implements OnInit {
  isChecked = true;
  action="remove";
  Message:any;
  public userData;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private invMapService: InventoryMapService,
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private authService: AuthService,
    private router: Router,
    private whService: WarehouseService,
    private velcodeService: VelocityCodeService,
    private globalconfigService:GlobalconfigService,
    private transactionService:TransactionService
    ) { }

  ngOnInit(): void {
    this.Message = "";
    console.log(this.data);
    if(this.data.ErrorMessage)
    {
      this.Message = this.data.ErrorMessage;
    }
    this.userData = this.authService.userData();
    if(this.data?.action)
    {
      this.action = this.data.action;
    }
  }

  onConfirmdelete() {
    if (this.data) {
      if (this.data.mode === 'delete-zone') {
        let zoneData = {
          "zone": this.data.zone,
          "username": this.data.userName
        }
        this.employeeService.deleteEmployeeZone(zoneData).subscribe((res: any) => {
          if (res.isExecuted) {
            this.dialog.closeAll();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
           // this.reloadCurrentRoute()
          } else {
            this.dialog.closeAll();
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-picklevel') {
        let pickLevelData = {
          "wsid": "TESTWID",
          "levelID": this.data.picklevel.levelID.toString(),
          "startShelf": this.data.picklevel.startCarousel.toString(),
          "endShelf": this.data.picklevel.endCarousel.toString(),
          "userName": this.data.userName
        }
        this.employeeService.deletePickLevels(pickLevelData).subscribe((res: any) => {
          if (res.isExecuted) {
            this.dialog.closeAll();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          } else {
            this.dialog.closeAll();
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      // else if (this.data.mode === 'delete-allowedgroup') {
      //   let pickLevelData = {
      //     "wsid": "TESTWID",
      //     "GroupName": this.data.allowedGroup,
      //     "userName": "1234"
      //   }
      //   this.employeeService.deletePickLevels(pickLevelData).subscribe((res: any) => {
      //     if (res.isExecuted) {
      //       this.dialog.closeAll();
      //       this.toastr.success(labels.alert.delete, 'Success!', {
      //         positionClass: 'toast-bottom-right',
      //         timeOut: 2000
      //       });
      //     } else {
      //       this.dialog.closeAll();
      //       this.toastr.error(labels.alert.went_worng, 'Error!', {
      //         positionClass: 'toast-bottom-right',
      //         timeOut: 2000
      //       });
      //     }
      //   });
      // }
      else if (this.data.mode === 'delete-location') {

        let locationData = {
          "startLocation": this.data.location.startLocation,
          "endLocation": this.data.location.endLocation,
          "username": this.data.userName
        }
        this.employeeService.deleteEmployeeLocation(locationData).subscribe((res: any) => {
          if (res.isExecuted) {
            this.dialog.closeAll();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          } else {
            this.dialog.closeAll();
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-connection-string') {

      
        let payload = {
          ConnectionName: this.data.connectionName,
        };
        this.globalconfigService
          .get(payload, '/GlobalConfig/ConnectionDelete')
          .subscribe(
            (res: any) => {
              if (res.isExecuted) {
                this.toastr.success(res.responseMessage, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({isExecuted:true})
              }
            },
            (error) => {
              this.toastr.error(labels.alert.went_worng, 'Error!!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
            }
          );
      }
      else if (this.data.mode === 'delete-group') {
        let groupData = {
          "wsid": "TESTWID",
          "GroupName": this.data.grp_data.groupName,
          "userName": this.data.userName
        }
        this.employeeService.deleteGroup(groupData).subscribe((res: any) => {
          if (res.isExecuted) {
            this.dialog.closeAll();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          } else {
            this.dialog.closeAll();
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-allowed-group') {
        let groupData = {
          "wsid": "TESTWID",
          "GroupName": this.data.allowedGroup,
          "userName": this.data.userName
        }
        this.employeeService.deleteGroup(groupData).subscribe((res: any) => {
          if (res.isExecuted) {
            this.dialog.closeAll();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          } else {
            this.dialog.closeAll();
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-inventory-map') {

        let payload = {
          "inventoryMapID": this.data.id,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.invMapService.deleteInventoryMap(payload).subscribe((res: any) => {
          if (res.isExecuted) {
            this.dialog.closeAll();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          } else {
            this.dialog.closeAll();
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-emp') {
        let emp_data = {
          "userName": this.data.emp_data.username,
          "deleteBy": this.userData.userName,
          "wsid": "TESTWSID"
        };
        this.employeeService.deleteAdminEmployee(emp_data).subscribe((res: any) => {
          if (res.isExecuted) {
            this.dialog.closeAll();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-grpallowed') {
        let emp_data = {
          "groupname": this.data.allowedGroup.groupName,
          "username": this.data.allowedGroup.userName,
        };
        this.employeeService.deleteUserGroup(emp_data).subscribe((res: any) => {
          if (res.isExecuted) {
            this.dialog.closeAll();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
         //   this.reloadCurrentRoute();
          }else{
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-warehouse') {
        let emp_data = {
          "warehouse": this.data.warehouse,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        };
        this.whService.dltWareHouse(emp_data).subscribe((res: any) => {
          if (res.isExecuted) {
            //this.dialog.closeAll();
            this.dialogRef.close("Yes");
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
         //   this.reloadCurrentRoute();
          }else{
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-velocity') {
        let emp_data = {
          "velocity": this.data.velocity,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        };
        this.velcodeService.dltVelocityCode(emp_data).subscribe((res: any) => {
          if (res.isExecuted) {
            //this.dialog.closeAll();
            this.dialogRef.close("Yes");
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
         //   this.reloadCurrentRoute();
          }else{
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
      else if (this.data.mode === 'delete-order-status') {
      
    
        this.transactionService
          .get(this.data.paylaod, '/Admin/DeleteOrderStatus')
          .subscribe(
            (res: any) => {
              if (res.isExecuted) {
                this.toastr.success(labels.alert.success, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({isExecuted:true})
            
              } else {
                this.toastr.error(labels.alert.went_worng, 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({isExecuted:false})
              }
            },
            (error) => {}
            // this.columnValues = res.data?.openTransactionColumns;
            // this.columnValues.push('actions');
            // this.displayOrderCols=res.data.openTransactionColumns;
          );
      }


      else if (this.data.mode === 'delete_workstation') {
        let payload={
          WSID: this.data.wsid,
        }
   
   
          this.globalconfigService.get(payload,'/GlobalConfig/WorkStationDelete').subscribe((res: any)=>{
            if(res.isExecuted){
              this.toastr.success(labels.alert.success, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
              this.dialogRef.close({isExecuted:true})
            }else{
              this.toastr.error(labels.alert.went_worng, 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
            }
            this.dialogRef.close({isExecuted:false})
          },(err)=>{
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          })
     
        // this.employeeService.deleteEmployeeLocation(locationData).subscribe((res: any) => {
        //   // if (res.isExecuted) {
        //   //   this.dialog.closeAll();
        //   //   this.toastr.success(labels.alert.delete, 'Success!', {
        //   //     positionClass: 'toast-bottom-right',
        //   //     timeOut: 2000
        //   //   });
        //   // } else {
        //   //   this.dialog.closeAll();
        //   //   this.toastr.error(labels.alert.went_worng, 'Error!', {
        //   //     positionClass: 'toast-bottom-right',
        //   //     timeOut: 2000
        //   //   });
        //   // }
        // });
      }


      


      else {
        this.dialogRef.close("Yes");
        // this.dialog.closeAll();
      }
    } else {
      this.dialogRef.close("Yes");
    }

  }

  checkOptions(event: MatCheckboxChange): void {
   if(event.checked){
    this.isChecked = false;
   }
   else{
    this.isChecked = true;
   }
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}

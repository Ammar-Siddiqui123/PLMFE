import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json';
import { InventoryMapService } from '../../inventory-map/inventory-map.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
})
export class DeleteConfirmationComponent implements OnInit {
  isChecked = true;
  public userData;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private invMapService: InventoryMapService,
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
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
            this.reloadCurrentRoute()
          } else {
            this.dialog.closeAll();
            this.toastr.error(labels.alert.went_worng, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
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
      else if (this.data.mode === 'delete-picklevel') {
        console.log(this.data);

        let pickLevelData = {
          "wsid": "TESTWID",
          "levelID": this.data.picklevel.levelID.toString(),
          "startShelf": this.data.picklevel.startCarousel.toString(),
          "endShelf": this.data.picklevel.endCarousel.toString(),
          "userName": "1234"
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
      else if (this.data.mode === 'delete-allowedgroup') {
        let pickLevelData = {
          "wsid": "TESTWID",
          "GroupName": this.data.allowedGroup,
          "userName": "1234"
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
      else if (this.data.mode === 'delete-group') {
        let groupData = {
          "wsid": "TESTWID",
          "GroupName": this.data.allowedGroup,
          "userName": "1234"
        }
        this.employeeService.deleteGroup(groupData).subscribe((res: any) => {
          console.log(res);

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
          "username": "1234",
          "wsid": "TESTWID"
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
          "deleteBy": "1234",
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

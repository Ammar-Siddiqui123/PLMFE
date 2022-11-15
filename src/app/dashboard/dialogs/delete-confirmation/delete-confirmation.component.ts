import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onConfirmdelete() {
    console.log("data mode",this.data)
    if (this.data.mode === 'delete-zone') {
      let zoneData = {
        "zone": this.data.zone,
        "username": "1234"
      }
      this.employeeService.deleteEmployeeZone(zoneData).subscribe((res: any) => {
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
        "username": "1234"
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
        }else{
          this.dialog.closeAll();
          this.toastr.error(labels.alert.went_worng, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
    else if (this.data.mode === 'delete-allowedgroup') {
      console.log(this.data);

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
        }else{
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
        "username": "1234"
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
             "username": "1234",
             "wsid": "TESTWID",
             "GroupName": this.data.grp_data.groupName


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

    else {
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



  }

}

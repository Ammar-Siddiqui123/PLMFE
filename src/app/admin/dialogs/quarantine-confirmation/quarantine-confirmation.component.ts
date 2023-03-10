import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json';
import { InventoryMapService } from '../../inventory-map/inventory-map.service';

@Component({
  selector: 'app-quarantine-confirmation',
  templateUrl: './quarantine-confirmation.component.html',
})
export class QuarantineConfirmationComponent implements OnInit {

  action: any;
  userData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService,private authService: AuthService,
  private invMapService: InventoryMapService ) {

    if (this.data.mode === 'inventory-map-quarantine') {
    this.action = 'Quarantine'
    } else if(this.data.mode === 'inventory-map-unquarantine') {
      this.action = 'Unquarantine'
    }
   }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  onConfirmQuarantine () {
    // console.log("data mode",this.data)
    if (this.data.mode === 'inventory-map-quarantine') {
      let payload = {
        "mapID": this.data.id,
        "userName": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMapService.quarantineInventoryMap(payload).subscribe((res: any) => {

      if (res.isExecuted) {
        //console.log(res);
        this.dialog.closeAll();
        this.toastr.success(labels.alert.quarantine, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      } else {
        //console.log(res);
        this.dialog.closeAll();
        this.toastr.error(labels.alert.went_worng, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
      
    } else if(this.data.mode === 'inventory-map-unquarantine') {

      let payload = {
        "mapID": this.data.id,
        "userName": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMapService.unQuarantineInventoryMap(payload).subscribe((res: any) => {

      if (res.isExecuted) {
        //console.log(res);
        this.dialog.closeAll();
        this.toastr.success(labels.alert.quarantine.replace("quarantine","unquarantined"), 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      } else {
        //console.log(res);
        this.dialog.closeAll();
        this.toastr.error(labels.alert.went_worng, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });

    }
  }

}

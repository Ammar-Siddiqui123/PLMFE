import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import labels from '../../../labels/labels.json';
import { InventoryMapService } from '../../inventory-map/inventory-map.service';

@Component({
  selector: 'app-quarantine-confirmation',
  templateUrl: './quarantine-confirmation.component.html',
})
export class QuarantineConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService,
  private invMapService: InventoryMapService ) { }

  ngOnInit(): void {
  }

  onConfirmQuarantine () {
    // console.log("data mode",this.data)
    if (this.data.mode === 'inventory-map-quarantine') {
      let payload = {
        "mapID": this.data.id,
        "username": "1234",
        "wsid": "TESTWID"
    }
    this.invMapService.quarantineInventoryMap(payload).subscribe((res: any) => {

      if (res.isExecuted) {
        this.dialog.closeAll();
        this.toastr.success(labels.alert.quarantine, 'Success!', {
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
  }

}

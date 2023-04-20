import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SystemReplenishmentService } from 'src/app/admin/system-replenishment/system-replenishment.service';
import { AuthService } from 'src/app/init/auth.service';
import labels from '../../labels/labels.json';

@Component({
  selector: 'app-delete-range',
  templateUrl: './delete-range.component.html',
  styleUrls: ['./delete-range.component.scss']
})
export class DeleteRangeComponent implements OnInit {

  public userData: any;
  repByDeletePayload: any = {
    identity: "Batch Pick ID",
    filter1: "",
    filter2: "",
    searchString: "",
    searchColumn: "",
    status: "",
    username: "",
    wsid: ""
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private systemReplenishmentService: SystemReplenishmentService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteRangeComponent>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.repByDeletePayload.username = this.userData.userName;
    this.repByDeletePayload.wsid = this.userData.wsid;
  }

  ReplenishmentsByDelete() {
    this.systemReplenishmentService.get(this.repByDeletePayload, '/Admin/ReplenishmentsByDelete').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.dialog.closeAll();
        this.dialogRef.close(this.data);
      } else {
        this.toastr.error("Deleting by range has failed", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.dialog.closeAll();
      }
    });
  }

}

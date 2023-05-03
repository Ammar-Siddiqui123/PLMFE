import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SystemReplenishmentService } from 'src/app/admin/system-replenishment/system-replenishment.service';
import { AuthService } from 'src/app/init/auth.service';
import labels from '../../labels/labels.json';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';

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
  public options: any;


  @ViewChild(MatAutocompleteTrigger) autocompleteStart: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger) autocompleteEnd: MatAutocompleteTrigger;

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
    this.repByDeletePayload.identity = "Batch Pick ID";
    this.options = this.data.pickLocation
  }

  ReplenishmentsByDelete() {
    if (this.repByDeletePayload.filter2 && this.repByDeletePayload.filter2) {
      const dialogRef2 = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'delete-selected-current-orders',
          action: 'delete'
        },
      });
      dialogRef2.afterClosed().subscribe((result) => {
        if (result === 'Yes') {
          this.systemReplenishmentService.get(this.repByDeletePayload, '/Admin/ReplenishmentsByDelete').subscribe((res: any) => {
            if (res.isExecuted && res.data) {
              this.toastr.success(labels.alert.delete, 'Success!', {
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
      });
    }
  }

  closeautoMenuStart() {
    this.autocompleteStart.closePanel();
  }

  closeautoMenuEnd() {
    this.autocompleteEnd.closePanel();
  }

  changeBegin(event: any) {
    console.log(event);
  }

  changeEnd(event: any) {
    console.log(event);
  }

  showChange(event: any) {
    if (event == 'Batch Pick ID') {
      this.options = this.data.batchPickIdOptions;
    }
    else if (event == 'Pick Location') {
      this.options = this.data.pickLocationOptions;
    }
    else if (event == 'Put Away Location') {
      this.options = this.data.putAwayLocationOptions;
    }
  }
}

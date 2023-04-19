import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SystemReplenishmentService } from 'src/app/admin/system-replenishment/system-replenishment.service';
import labels from '../../labels/labels.json'
import { AuthService } from 'src/app/init/auth.service';
@Component({
  selector: 'app-transaction-qty-edit',
  templateUrl: './transaction-qty-edit.component.html',
  styleUrls: ['./transaction-qty-edit.component.scss']
})
export class TransactionQtyEditComponent implements OnInit {

  public userData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private systemReplenishmentService: SystemReplenishmentService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TransactionQtyEditComponent>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  transactionQtyReplenishmentUpdate() {
    let payload: any = {
      "rP_ID": this.data.rP_ID,
      "transactionQuantity": this.data.transactionQuantity,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.systemReplenishmentService.get(payload, '/Admin/TransactionQtyReplenishmentUpdate').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.dialog.closeAll();
        this.dialogRef.close(this.data);
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.dialog.closeAll();
      }
    });
  }
}

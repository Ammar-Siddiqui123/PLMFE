import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-short-transaction',
  templateUrl: './short-transaction.component.html',
  styleUrls: ['./short-transaction.component.scss']
})
export class ShortTransactionComponent implements OnInit {

  selectedTransaction: any;
  toteQuantity: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private Api: ApiFuntions,
    public dialogRef: MatDialogRef<ShortTransactionComponent>,
  ) { }

  ngOnInit(): void {
    this.selectedTransaction = this.data.selectedTransaction;
  }

  ShortTransaction() {
    if (this.toteQuantity >= 0 && this.toteQuantity < this.selectedTransaction.transactionQuantity) {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          heading: 'Process Short',
          message: 'Short this transaction?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'Yes') {
          let payload: any = {
            "otid": this.selectedTransaction.id,
            "shortQuantity": this.toteQuantity,
            "shortMethod": "Complete"
          }
          this.Api.shortTransaction(payload).subscribe((res: any) => {
            if (res.isExecuted) {
              this.dialogRef.close(res);
            }
            else {
              this.toastr.error("An error occured when shorting this transaction", 'Error', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
            }
          });
        }
      });
    }
    else {
      this.toastr.error("Please enter a quantity that is greater than or equal to 0 and less than the transaction qty", 'Invalid Qty Entered', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.toteQuantity = undefined;
    }
  }

}

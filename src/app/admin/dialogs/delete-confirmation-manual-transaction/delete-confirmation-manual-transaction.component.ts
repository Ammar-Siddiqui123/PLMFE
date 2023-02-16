import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../../transaction/transaction.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-delete-confirmation-manual-transaction',
  templateUrl: './delete-confirmation-manual-transaction.component.html',
  styleUrls: ['./delete-confirmation-manual-transaction.component.scss'],
})
export class DeleteConfirmationManualTransactionComponent implements OnInit {
  isChecked = true;
  heading: '';
  message: '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<any>
  ) {
    this.heading = data.heading;
    this.message = data.message;
  }

  ngOnInit(): void {}
  checkOptions(event: MatCheckboxChange): void {
    if (event.checked) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  onConfirmdelete() {
    if (this.data) {
      if (this.data.mode === 'delete-trans') {
        let payload = {
          transID: this.data.element.id,
          username: this.data.userName,
          wsid: this.data.wsid,
        };
        this.transactionService
          .get(payload, '/Admin/TransactionDelete')
          .subscribe(
            (res: any) => {
              if (res.isExecuted) {
                this.toastr.success(labels.alert.delete, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({ isExecuted: true });
              } else {
                this.toastr.error(labels.alert.went_worng, 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({ isExecuted: false });
              }
            },
            (error) => {}
          );
      } else if (this.data.mode === 'delete-order') {
   
        let payload = {
          orderNumber: this.data.orderNumber,
          username: this.data.userName,
          wsid: this.data.wsid,
        };
 
        this.transactionService
          .get(payload, '/Admin/TransactionForOrderDelete')
          .subscribe(
            (res: any) => {
              if (res.isExecuted) {
                this.toastr.success(labels.alert.delete, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({ isExecuted: true });
              } else {
                this.toastr.error(labels.alert.went_worng, 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({ isExecuted: false });
              }
            },
            (error) => {}
          );
      }
      else if (this.data.mode === 'delete-manual-transaction') { 
        let payload = {
          transID: this.data.transID,
          username: this.data.userName,
          wsid: this.data.wsid,
        };
        return
        this.transactionService.get(payload, '/Admin/TransactionDelete').subscribe(
          (res: any) => {
            if (res && res.isExecuted) {
              this.toastr.success(labels.alert.delete, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
              this.dialogRef.close({ isExecuted: true });
            }else{
              this.toastr.error(labels.alert.went_worng, 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
              this.dialogRef.close({ isExecuted: false });
            }
          },
          (error) => {}
        );
      }
    }
  }
}

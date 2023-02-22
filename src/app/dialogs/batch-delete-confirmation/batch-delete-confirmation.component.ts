import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProcessPutAwayService } from 'src/app/induction-manager/processPutAway.service';
import labels from '../../labels/labels.json';

@Component({
  selector: 'app-batch-delete-confirmation',
  templateUrl: './batch-delete-confirmation.component.html',
  styleUrls: ['./batch-delete-confirmation.component.scss'],
})
export class BatchDeleteConfirmationComponent implements OnInit {
  isChecked = true;
  heading: '';
  message: '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private service: ProcessPutAwayService,
    private toastr: ToastrService
  ) {
    this.heading = data.heading;
    this.message = data.message;
  }

  ngOnInit(): void {
    
  }
  checkOptions(event: MatCheckboxChange): void {
    if (event.checked) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  onConfirmdelete() {
    if (this.data) {
      if (this.data.mode === 'deallocate_clear_batch') {
        this.service
          .get(this.data.payload, '/Induction/BatchTotesDelete')
          .subscribe(
            (res: any) => {
              if (res.data && res.isExecuted) {
                this.toastr.success(labels.alert.delete, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({ isExecuted: true });
              } else {
                this.toastr.error('Something went wrong', 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({isExecuted:false});
              }
            },
            (error) => {}
          );
      } else if (this.data.mode === 'delete_all_batch') {
     
        this.service
          .get(this.data.payload, '/Induction/BatchTotesDelete')
          .subscribe(
            (res: any) => {
              if (res.data && res.isExecuted) {
                this.toastr.success(labels.alert.delete, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({ isExecuted: true });
              } else {
                this.toastr.error('Something went wrong', 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.dialogRef.close({isExecuted:false});
              }
            },
            (error) => {}
          );
      } else {
        this.dialogRef.close({isExecuted:false});
        // this.dialog.closeAll();
      }
    }
  }
}

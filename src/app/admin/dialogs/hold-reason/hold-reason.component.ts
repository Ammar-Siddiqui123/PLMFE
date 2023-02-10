import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import labels from '../../../labels/labels.json';
import { TransactionService } from '../../transaction/transaction.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-hold-reason',
  templateUrl: './hold-reason.component.html',
  styleUrls: ['./hold-reason.component.scss'],
})
export class HoldReasonComponent implements OnInit {
  payload;
  userData;
  reason;
  reasonTextForm = new FormGroup({
    reason: new FormControl('' ,[Validators.pattern(/\s/), Validators.required])
  
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<HoldReasonComponent>,
    private authService: AuthService,
    private transactionService: TransactionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }
  close(){
    this.dialogRef.close({ isExecuted: false });

  }
  onSubmit() {
    this.payload = {
      Reel: this.data.reel,
      OrderItem: this.data.orderItem,
      Order: this.data.Order,
      Reason: this.reason,
      ID: this.data.id,
      UserName: this.data.reel,
    };
    
    this.transactionService
      .get(this.payload, '/Admin/DeallocateTransactions')
      .subscribe((res: any) => {
        if (res.isExecuted) {
          this.toastr.success(res.responseMessage, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          this.dialogRef.close({ isExecuted: true });
        } else {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          this.dialogRef.close({ isExecuted: false });
        }
      });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../../../../app/init/auth.service';
import { TransactionService } from '../../transaction/transaction.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-delete-confirmation-transaction',
  templateUrl: './delete-confirmation-transaction.component.html',
})
export class DeleteConfirmationTransactionComponent implements OnInit {
  isChecked: boolean = true;
  public userData;
  accessLevel = 'Selected Only';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<DeleteConfirmationTransactionComponent>,
    private authService: AuthService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    console.log(this.data);
  }

  selectOption() {
    console.log(this.accessLevel);
  }
  onConfirmdelete() {
    let deletePayload = {
      transType: this.data.transType,
      orderNumber: this.data.orderNo,
      id: this.data.id,
      itemNumber: '',
      lineNumber: '',
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.transactionService.get(deletePayload, '/Admin/DeleteOrder').subscribe(
      (res: any) => {
        if(res.isExecuted){
          this.dialogRef.close("Yes");
          this.toastr.success(labels.alert.delete, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      },
      (error) => {
        this.dialogRef.close("No");
        this.toastr.error(labels.alert.went_worng, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });
      }
    );
  }
  checkOptions(event: MatCheckboxChange): void {
    if (event.checked) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }
}

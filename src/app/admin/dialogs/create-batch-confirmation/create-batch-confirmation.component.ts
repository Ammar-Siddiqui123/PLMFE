import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-batch-confirmation',
  templateUrl: './create-batch-confirmation.component.html',
  styleUrls: ['./create-batch-confirmation.component.scss'],
})
export class CreateBatchConfirmationComponent implements OnInit {
  isChecked = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateBatchConfirmationComponent>
  ) {}

  ngOnInit(): void {}
  createBatch() {
    this.dialogRef.close(true);
  }
  checkOptions(event: MatCheckboxChange): void {
    if (event.checked) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }
}

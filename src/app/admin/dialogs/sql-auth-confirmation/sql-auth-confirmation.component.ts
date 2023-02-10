import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sql-auth-confirmation',
  templateUrl: './sql-auth-confirmation.component.html',
  styleUrls: ['./sql-auth-confirmation.component.scss'],
})
export class SqlAuthConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,

    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  confirmValue(){
    this.dialogRef.close({isExecuted:true})
  }
  close(){
    this.dialogRef.close({isExecuted:false})
  }
}
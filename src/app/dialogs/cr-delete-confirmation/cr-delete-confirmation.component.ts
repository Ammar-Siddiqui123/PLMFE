import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cr-delete-confirmation',
  templateUrl: './cr-delete-confirmation.component.html',
  styleUrls: ['./cr-delete-confirmation.component.scss']
})
export class CrDeleteConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  deleteReport(check){
    this.dialogRef.close(check);
  }

}

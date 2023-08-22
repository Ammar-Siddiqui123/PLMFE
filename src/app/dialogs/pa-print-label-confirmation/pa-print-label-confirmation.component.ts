import { Component, OnInit } from '@angular/core';
import { OmUserFieldDataComponent } from '../om-user-field-data/om-user-field-data.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pa-print-label-confirmation',
  templateUrl: './pa-print-label-confirmation.component.html',
  styleUrls: ['./pa-print-label-confirmation.component.scss']
})
export class PaPrintLabelConfirmationComponent implements OnInit {
  numberLabel:number = 0
  constructor( public dialogRef: MatDialogRef<PaPrintLabelConfirmationComponent>) { }

  ngOnInit(): void {
  }

  sendData(){
    this.dialogRef.close(this.numberLabel);
  }

}

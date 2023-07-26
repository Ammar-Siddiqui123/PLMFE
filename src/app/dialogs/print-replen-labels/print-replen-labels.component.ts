import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-print-replen-labels',
  templateUrl: './print-replen-labels.component.html',
  styleUrls: ['./print-replen-labels.component.scss']
})
export class PrintReplenLabelsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PrintReplenLabelsComponent>,
  ) { }

  ngOnInit(): void {
  }

  printLabelsForCurrentDisplay(){
    // alert("The print service is currently offline");
    this.dialog.closeAll();
    this.dialogRef.close({});
  }

  printLabelsForUnprintedReplens(){
    // alert("The print service is currently offline");
    this.dialog.closeAll();
    this.dialogRef.close({});
  }

  printLabelsForAllReplens(){
    // alert("The print service is currently offline");
    this.dialog.closeAll();
    this.dialogRef.close({});
  }

}

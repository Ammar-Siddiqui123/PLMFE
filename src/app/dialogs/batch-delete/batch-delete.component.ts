import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-batch-delete',
  templateUrl: './batch-delete.component.html',
  styleUrls: ['./batch-delete.component.scss']
})
export class BatchDeleteComponent implements OnInit {
  toteID='';
  batchID='';
  transType='Put Away';
  clearBatchTote:string='clearBatch';
  constructor(public dialogRef: MatDialogRef<BatchDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    console.log(this.data)
    this.toteID=this.data.toteId;
    this.batchID=this.data.batchId;

  }

}

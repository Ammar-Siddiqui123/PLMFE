import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-batch-delete',
  templateUrl: './batch-delete.component.html',
  styleUrls: ['./batch-delete.component.scss']
})
export class BatchDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BatchDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}

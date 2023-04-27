import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cm-order-tote-conflict',
  templateUrl: './cm-order-tote-conflict.component.html',
  styleUrls: ['./cm-order-tote-conflict.component.scss']
})
export class CmOrderToteConflictComponent implements OnInit {
  Order :any;  
  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
async SubmitOrder(){ 
  if(this.Order) this.dialogRef.close(this.Order);  
}
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-staging-location-order',
  templateUrl: './staging-location-order.component.html',
  styleUrls: ['./staging-location-order.component.scss']
})
export class StagingLocationOrderComponent implements OnInit {
  Order :any;  
  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
async SubmitOrder(){ 
  if(this.Order) this.dialogRef.close(this.Order);  
}
closeOrder(){
   this.dialogRef.close(false);  
}
}

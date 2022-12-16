import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-number',
  templateUrl: './item-number.component.html',
  styleUrls: ['./item-number.component.scss']
})
export class ItemNumberComponent implements OnInit {

  // updateItemNumber : boolean = true;
  addItem : boolean = true;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {  
    console.log(this.data)
    if (this.data.addItem) {
      this.addItem = true;
    } else {
      this.addItem = false;
    }    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

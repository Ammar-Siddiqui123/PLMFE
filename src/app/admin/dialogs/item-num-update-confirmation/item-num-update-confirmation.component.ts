import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-num-update-confirmation',
  templateUrl: './item-num-update-confirmation.component.html',
  styleUrls: ['./item-num-update-confirmation.component.scss']
})
export class ItemNumUpdateConfirmationComponent implements OnInit {

  isChecked = true;

  constructor(
    public dialogRef: MatDialogRef<ItemNumUpdateConfirmationComponent>,
  ) { }

  ngOnInit(): void {
  }

  checkOptions(event: MatCheckboxChange): void {
    if(event.checked){
     this.isChecked = false;
    }
    else{
     this.isChecked = true;
    }
   }

   onConfirm(){
    this.dialogRef.close("Yes");
   }
   
}

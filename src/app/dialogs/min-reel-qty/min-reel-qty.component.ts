import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ItemNumUpdateConfirmationComponent } from 'src/app/admin/dialogs/item-num-update-confirmation/item-num-update-confirmation.component';

@Component({
  selector: 'app-min-reel-qty',
  templateUrl: './min-reel-qty.component.html',
  styleUrls: ['./min-reel-qty.component.scss']
})
export class MinReelQtyComponent implements OnInit {

    submit: boolean = false;
    btnDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmationdialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  checkRTS() {
    if(this.data.minDollarRTS === '' || this.data.minDollarRTS === null){
      this.data.minDollarRTS = 0;
    }
    if (this.data.thresholdQty === '' || this.data.thresholdQty === null){
      this.data.thresholdQty = 0;
   }   
  }
  
  checkValues() {
    if(this.data.minDollarRTS === '' || this.data.minDollarRTS === null || this.data.thresholdQty === '' || this.data.thresholdQty === null){
      this.btnDisabled = true;
    } else {
      this.btnDisabled = false;
    }

    if(this.data.minDollarRTS < 0 || this.data.thresholdQty < 0){
      this.btnDisabled = true;
    } else {
      this.btnDisabled = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close({
      minDollarRTS : this.data.minDollarRTS, 
      thresholdQty : this.data.thresholdQty
    });    
  }

}
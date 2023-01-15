import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ItemNumUpdateConfirmationComponent } from '../item-num-update-confirmation/item-num-update-confirmation.component';

@Component({
  selector: 'app-item-number',
  templateUrl: './item-number.component.html',
  styleUrls: ['./item-number.component.scss']
})
export class ItemNumberComponent implements OnInit {

  // updateItemNumber : boolean = true;
  addItem : boolean = true;
  submit: boolean = false;

  constructor(
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private confirmationdialog: MatDialog) { }

  ngOnInit(): void {  
    // console.log(this.data)
    if (this.data.addItem) {
      this.addItem = true;
    } else {
      this.addItem = false;
    }    
  }

  onNoClick(onsubmit: any, status : any): void {
    if(status == 'createNew'){
    this.submit= true;
    if(this.addItem && onsubmit){
      if(this.data.itemNumber && this.data.desc){
      
        this.dialogRef.close(  {itemNumber : this.data.itemNumber, desc : this.data.desc} );
      }
    } else {
      this.dialogRef.close();
    }
    } else if ( status == 'update'){
      if(this.data.newItemNumber){
      const confirmationdialogRef = this.confirmationdialog.open(ItemNumUpdateConfirmationComponent, {
        width: '560px'
      });
      confirmationdialogRef.afterClosed().subscribe((res) => {
        if(res=='Yes'){
          this.dialogRef.close( this.data.newItemNumber );
        }
      })
    }
    }
  }

}

import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WarehouseComponent } from 'src/app/admin/dialogs/warehouse/warehouse.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { AlertConfirmationComponent } from '../alert-confirmation/alert-confirmation.component';

@Component({
  selector: 'app-reel-detail',
  templateUrl: './reel-detail.component.html',
  styleUrls: ['./reel-detail.component.scss']
})
export class ReelDetailComponent implements OnInit {


  ReelOrder:any
  ReelLot:any
  ReelExpDate:any
  ReelUF1:any
  ReelUF2:any
  ReelWarehouse:any
  ReelQty:any
  ReelNotes:any
  wareHouseSensitivity:any

  @ViewChild('reelQuantitytemp') reelQuantitytemp: ElementRef

  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<ReelDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private Api:ApiFuntions,private toastr: ToastrService) { }

  ngOnInit(): void {
    // debugger
    if(!this.data.fromtrans){
      this.ReelOrder = this.data.hvObj.order
      this.ReelLot = this.data.hvObj.lot
      this.ReelExpDate = this.data.hvObj.expdate
      this.ReelUF1 = this.data.hvObj.uf1
      this.ReelUF2 = this.data.hvObj.uf2
      this.ReelWarehouse = this.data.hvObj.warehouse
      this.ReelQty = this.data.gReelQty
      this.ReelNotes = this.data.hvObj.notes
      this.wareHouseSensitivity = this.data.itemObj.whseRequired
    }
    else{
      this.ReelOrder = this.data.fromtrans.reelOrder
      this.ReelLot = this.data.fromtrans.reelLot
      this.ReelExpDate = this.data.fromtrans.reelExpDate
      this.ReelUF1 = this.data.fromtrans.reelUF1
      this.ReelUF2 = this.data.fromtrans.reelUF2
      this.ReelWarehouse = this.data.fromtrans.reelWarehouse
      this.ReelQty = this.data.gReelQty
      this.ReelNotes = this.data.fromtrans.reelNotes
      this.wareHouseSensitivity = this.data.itemObj.whseRequired
    }
  }


  ngAfterViewInit() {
    this.checkWareHouse()
  }

  checkWareHouse(){
    this.reelQuantitytemp.nativeElement.focus()
    if(this.wareHouseSensitivity){
      this.wareHouseSensitivity = true
   if(!this.ReelWarehouse){
    setTimeout(() => {
      this.openWareHouse()
    }, 300);
   }
      
    }
    else{
      this.ReelWarehouse = '';
      // this.ReelQty = '';
      this.wareHouseSensitivity = false
    }
  }

  reelDetailSubmit(){
    if(this.ReelQty == ''){
      const dialogRef = this.dialog.open(AlertConfirmationComponent, {
        height: 'auto',
        width: '560px',
        data: {
          message: 'You must provide a quantity for this reel.',
        },
        autoFocus: '__non_existing_element__',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          return
        }
      })
    }
    if(this.ReelLot == ''){
      this.ReelLot = 0
    }
     if(this.wareHouseSensitivity &&(this.ReelWarehouse == '') && this.ReelQty != ''){
      const dialogRef = this.dialog.open(AlertConfirmationComponent, {
        height: 'auto',
        width: '560px',
        data: {
          message: 'This item is warehouse sensitive.  Assign a warehouse to the reel in order to create the transaction.',
        },
        autoFocus: '__non_existing_element__',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.openWareHouse()
          // return
        }
      })
   
    }else if(this.wareHouseSensitivity &&(this.ReelWarehouse != '') && this.ReelQty != ''){
      let  reelDetail =[
        {reelQty:this.ReelQty},
        {
          reelOrder:this.ReelOrder,
          reelLot:this.ReelLot.toString(),
          reelUF1:this.ReelUF1,
          reelUF2:this.ReelUF2,
          reelWarehouse:this.ReelWarehouse,
          reelExpDate:this.ReelExpDate,
          reelNotes:this.ReelNotes,
          reelQty:this.ReelQty,
        }]
        this.dialogRef.close(reelDetail);
    }

    if(!this.wareHouseSensitivity &&this.ReelQty != '' ){
      let  reelDetail =[
      {reelQty:this.ReelQty},
      {
        reelOrder:this.ReelOrder,
        reelLot:this.ReelLot.toString(),
        reelUF1:this.ReelUF1,
        reelUF2:this.ReelUF2,
        reelWarehouse:this.ReelWarehouse,
        reelExpDate:this.ReelExpDate,
        reelNotes:this.ReelNotes,
        reelQty:this.ReelQty,
      }]
      this.dialogRef.close(reelDetail);
    }
  }

  openWareHouse(){
    let dialogRef = this.dialog.open(WarehouseComponent, {
      height: 'auto',
      width: '640px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'addlocation',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      

      if (result != true && result != false) {
        this.ReelWarehouse = result
      this.reelQuantitytemp.nativeElement.focus()


      }
      if (result == 'clear') {
        this.ReelWarehouse = ''
      }
    })
  }

  fetchReelQty(event){
    if(event.keyCode=='13'){
      this.reelDetailSubmit()
    }
  }

}

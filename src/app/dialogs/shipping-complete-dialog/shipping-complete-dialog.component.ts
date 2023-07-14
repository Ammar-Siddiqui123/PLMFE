import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-complete-dialog',
  templateUrl: './shipping-complete-dialog.component.html',
  styleUrls: ['./shipping-complete-dialog.component.scss']
})
export class ShippingCompleteDialogComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {itemNo: '1202122'},
    {itemNo: '1202123'},
    {itemNo: '1202124'},
    {itemNo: '1202125'},
    {itemNo: '1202126'},
    {itemNo: '1202127'},
    
  ]

    displayedColumns: string[] = ['itemNo' , 'lineNo', 'toteId', 'orderQty'];
    displayedColumns1: string[] = ['containerID'  , 'carrierName', 'trackingNo', 'freight'];
    tableData = this.ELEMENT_DATA
    dataSourceList:any


  constructor() { }

  ngOnInit(): void {
  }

}

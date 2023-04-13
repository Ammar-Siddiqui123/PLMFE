import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cm-shipping-transaction',
  templateUrl: './cm-shipping-transaction.component.html',
  styleUrls: ['./cm-shipping-transaction.component.scss']
})
export class CmShippingTransactionComponent implements OnInit {
  ELEMENT_DATA_1: any[] =[
    {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },
    {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },
    {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },
    
   
  ];
  
  displayedColumns_1: string[] = ['item_no', 'line_no', 'tote_id', 'order_qty', 'picked_qty', 'container_id', 'ship_qty', 'action'];
  tableData_1 = this.ELEMENT_DATA_1
  dataSourceList_1:any
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CmConfirmAndPackingProcessTransactionComponent } from '../cm-confirm-and-packing-process-transaction/cm-confirm-and-packing-process-transaction.component';

@Component({
  selector: 'app-cm-confirm-and-packing',
  templateUrl: './cm-confirm-and-packing.component.html',
  styleUrls: ['./cm-confirm-and-packing.component.scss']
})
export class CmConfirmAndPackingComponent implements OnInit {
  
  ELEMENT_DATA: any[] =[
    {tote_id: '30022', location: 'Work 2141'},
    {tote_id: '30022', location: 'Work 2141'},
    {tote_id: '30022', location: 'Work 2141'},
    {tote_id: '30022', location: 'Work 2141'},
   
  ];

 displayedColumns: string[] = ['tote_id', 'location'];
 tableData = this.ELEMENT_DATA
 dataSourceList:any

 ELEMENT_DATA_1: any[] =[
  {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },
  {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },
  {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },
  
 
];

displayedColumns_1: string[] = ['item_no', 'line_no', 'tote_id', 'order_qty', 'picked_qty', 'container_id', 'ship_qty', 'action'];
tableData_1 = this.ELEMENT_DATA_1
dataSourceList_1:any
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  openScanItem() {
    let dialogRef = this.dialog.open(CmConfirmAndPackingProcessTransactionComponent, {
      height: 'auto',
      width: '96vw',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }
}

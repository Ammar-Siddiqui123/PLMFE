import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CmSplitLineComponent } from '../cm-split-line/cm-split-line.component';

@Component({
  selector: 'app-cm-confirm-and-packing-process-transaction',
  templateUrl: './cm-confirm-and-packing-process-transaction.component.html',
  styleUrls: ['./cm-confirm-and-packing-process-transaction.component.scss']
})
export class CmConfirmAndPackingProcessTransactionComponent implements OnInit {

  displayedColumns: string[] = ['item_no', 'line_no', 'tote_id', 'order_qty', 'completed_qty', 'ship_qty', ]
 
  dataSourceList:any
 
  ELEMENT_DATA: any[] =[
   {item_no: '30022', line_no: 'Work 2141', tote_id: 'Main 52', order_qty: 'Jan-25-2023', completed_qty: 'Jan-25-2023', ship_qty: 'Jan-25-2023', }]
   tableData = this.ELEMENT_DATA
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openCmSplitLine() {
    let dialogRef = this.dialog.open(CmSplitLineComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }
  
}

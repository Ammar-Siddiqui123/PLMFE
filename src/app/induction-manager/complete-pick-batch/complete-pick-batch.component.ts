import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CpbBlossomToteComponent } from 'src/app/dialogs/cpb-blossom-tote/cpb-blossom-tote.component';
import { ShortTransactionComponent } from 'src/app/dialogs/short-transaction/short-transaction.component';

@Component({
  selector: 'app-complete-pick-batch',
  templateUrl: './complete-pick-batch.component.html',
  styleUrls: ['./complete-pick-batch.component.scss']
})
export class CompletePickBatchComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {order_no: '1202122', tote_id: '36', item_number: '7896541230', description: 'Treat with care', transaction_qty: '212', location: 'LOC12345', zone: 'FC'},
    {order_no: '1202122', tote_id: '36', item_number: '7896541230', description: 'Treat with care', transaction_qty: '212', location: 'LOC12345', zone: 'FC'},
    {order_no: '1202122', tote_id: '36', item_number: '7896541230', description: 'Treat with care', transaction_qty: '212', location: 'LOC12345', zone: 'FC'},
  ];
         
  displayedColumns: string[] = ['order_no','tote_id','item_number', 'description', 'transaction_qty', 'location', 'zone','action'];
  tableData = this.ELEMENT_DATA
  dataSourceList:any


  constructor(    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }

  ShortTransactionDialogue() {
    const dialogRef = this.dialog.open(ShortTransactionComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
  }

  CpbBlossomToteDialogue() {
    const dialogRef = this.dialog.open(CpbBlossomToteComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
  }

}

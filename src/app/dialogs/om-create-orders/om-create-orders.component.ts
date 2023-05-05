import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmAddRecordComponent } from '../om-add-record/om-add-record.component';
import { OmAddTransactionComponent } from '../om-add-transaction/om-add-transaction.component';
import { OmEditTransactionComponent } from '../om-edit-transaction/om-edit-transaction.component';
import { OmUserFieldDataComponent } from '../om-user-field-data/om-user-field-data.component';

@Component({
  selector: 'app-om-create-orders',
  templateUrl: './om-create-orders.component.html',
  styleUrls: ['./om-create-orders.component.scss']
})
export class OmCreateOrdersComponent implements OnInit {

  ELEMENT_DATA: any[] = [
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '125874', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '632598', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '30022', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },

  ];

  displayedColumns: string[] = ['date', 'message', 'event_code', 'username', 'event_type', 'event_location', 'notes', 'trans_id', 'actions'];
  tableData = this.ELEMENT_DATA
  dataSourceList: any


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openOmAddRecord() {
    let dialogRef = this.dialog.open(OmAddRecordComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }
   openOmEditTransaction() {
    let dialogRef = this.dialog.open(OmEditTransactionComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }

   openOmAddTransaction() {
    let dialogRef = this.dialog.open(OmAddTransactionComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }

   openOmUserFieldData() {
    let dialogRef = this.dialog.open(OmUserFieldDataComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }

}

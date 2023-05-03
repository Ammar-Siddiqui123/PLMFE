import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OmCreateOrdersComponent } from 'src/app/dialogs/om-create-orders/om-create-orders.component';
import { OmEventLogEntryDetailComponent } from 'src/app/dialogs/om-event-log-entry-detail/om-event-log-entry-detail.component';

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.scss']
})
export class EventLogComponent implements OnInit {

  ELEMENT_DATA: any[] = [
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '125874', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '632598', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },
    { date: '11/02/2022 11:58 AM', message: 'deleted Item Number 123', event_code: '30022', username: '120', event_type: '650', event_location: '123641', notes: '999', trans_id: '999' },

  ];

  displayedColumns: string[] = ['date', 'message', 'event_code', 'username', 'event_type', 'event_location', 'notes', 'trans_id'];
  tableData = this.ELEMENT_DATA
  dataSourceList: any



  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openOmEventLogEntryDetail() {
    let dialogRef = this.dialog.open(OmEventLogEntryDetailComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
     
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      
    });

    

   }
   

}
function openOmCreateOrders(order: any, any: any) {
  throw new Error('Function not implemented.');
}


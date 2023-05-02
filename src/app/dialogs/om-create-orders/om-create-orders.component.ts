import { Component, OnInit } from '@angular/core';

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

  displayedColumns: string[] = ['date', 'message', 'event_code', 'username', 'event_type', 'event_location', 'notes', 'trans_id'];
  tableData = this.ELEMENT_DATA
  dataSourceList: any


  constructor() { }

  ngOnInit(): void {
  }

}

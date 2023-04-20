import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cm-confirm-and-packing-select-transaction',
  templateUrl: './cm-confirm-and-packing-select-transaction.component.html',
  styleUrls: ['./cm-confirm-and-packing-select-transaction.component.scss']
})
export class CmConfirmAndPackingSelectTransactionComponent implements OnInit {
  ELEMENT_DATA: any[] =[
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},
    {tote_id: '30022', location: 'Work 2141',  staged_by: 'Main 52', staged_date: 'Jan-25-2023'},

  ];

 displayedColumns: string[] = ['tote_id', 'status', 'location', 'staged_by', 'staged_date'];
 tableData = this.ELEMENT_DATA
 dataSourceList:any

  constructor() { }

  ngOnInit(): void {
  }

}

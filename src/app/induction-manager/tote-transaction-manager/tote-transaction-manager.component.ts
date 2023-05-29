import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tote-transaction-manager',
  templateUrl: './tote-transaction-manager.component.html',
  styleUrls: ['./tote-transaction-manager.component.scss']
})
export class ToteTransactionManagerComponent implements OnInit {

  ELEMENT_DATA: any[] =[

 {batch_id: '253215', pos_no: '28', tote_id: '30022', zone: '120322', trans_type: 'pick', host_trans_id: '123641'},
 {batch_id: '253215', pos_no: '28', tote_id: '30022', zone: '120322', trans_type: 'pick', host_trans_id: '123641'},
 {batch_id: '253215', pos_no: '28', tote_id: '30022', zone: '120322', trans_type: 'pick', host_trans_id: '123641'},
    
  ];
    
    
  displayedColumns: string[] = ['batch_id', 'pos_no', 'tote_id', 'zone', 'trans_type', 'host_trans_id','action'];
    
  tableData = this.ELEMENT_DATA
    
   dataSourceList:any

  constructor() { }

  ngOnInit(): void {
  }

}

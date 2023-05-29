import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.scss']
})
export class PickComponent implements OnInit {

  ELEMENT_DATA: any[] =[

    {order_no: '32125', priority: '12', quantity: '320', req_date: '20/May/2023'},
       
     ];
       
       
     displayedColumns: string[] = ['status','order_no', 'priority', 'quantity', 'req_date','action'];
      
     displayedColumns1: string[] = ['order_no', 'priority', 'quantity', 'req_date','action'];

     tableData = this.ELEMENT_DATA;
       
      dataSourceList:any


   

  constructor() { }

  ngOnInit(): void {
  }

}

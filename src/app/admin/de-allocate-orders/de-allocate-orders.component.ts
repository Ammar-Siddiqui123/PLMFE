import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-de-allocate-orders',
  templateUrl: './de-allocate-orders.component.html',
  styleUrls: ['./de-allocate-orders.component.scss']
})
export class DeAllocateOrdersComponent implements OnInit {

  ELEMENT_DATA_1: any[] =[
    {order_no: '1202122'},
    {order_no: '1202122'},
    {order_no: '1202122'},
  ]

    displayedColumns_1: string[] = ['select','order_no'];
    tableData_1 = this.ELEMENT_DATA_1
    dataSourceList_1:any
  

  ELEMENT_DATA: any[] =[
    {trans_type: 'Count', order_no: '1202122', priority: '36', required_date: '11/02/2022 11:58 AM', user_field_1: 'Treat with care'},
    {trans_type: 'Count', order_no: '1202122', priority: '36', required_date: '11/02/2022 11:58 AM', user_field_1: 'Treat with care'},
    {trans_type: 'Count', order_no: '1202122', priority: '36', required_date: '11/02/2022 11:58 AM', user_field_1: 'Treat with care'},
  ];
         
  displayedColumns: string[] = ['trans_type','order_no','priority','required_date', 'user_field_1',];
  tableData = this.ELEMENT_DATA
  dataSourceList:any

  constructor() { }

  ngOnInit(): void {
  }

}

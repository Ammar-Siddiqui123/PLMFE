import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-reports-and-labels',
  templateUrl: './basic-reports-and-labels.component.html',
  styleUrls: ['./basic-reports-and-labels.component.scss']
})
export class BasicReportsAndLabelsComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {order_no: '1202122'},
    {order_no: '1202122'},
    {order_no: '1202122'},
  ]

    displayedColumns: string[] = ['fields','expression_type','value_to_test','actions'];
    tableData = this.ELEMENT_DATA
    dataSourceList:any

      
  constructor() { }

  ngOnInit(): void {
  }

}

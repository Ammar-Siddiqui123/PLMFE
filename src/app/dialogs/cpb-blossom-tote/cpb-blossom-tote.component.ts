import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpb-blossom-tote',
  templateUrl: './cpb-blossom-tote.component.html',
  styleUrls: ['./cpb-blossom-tote.component.scss']
})
export class CpbBlossomToteComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {item_number: '7896541230', transaction_qty: '212', qty_in_old_date: '420'},
    {item_number: '7896541230', transaction_qty: '212', qty_in_old_date: '420'},
    {item_number: '7896541230', transaction_qty: '212', qty_in_old_date: '420'},
  ];
         
  displayedColumns: string[] = ['item_number', 'transaction_qty', 'qty_in_old_date'];
  tableData = this.ELEMENT_DATA
  dataSourceList:any


  constructor() { }

  ngOnInit(): void {
  }

}

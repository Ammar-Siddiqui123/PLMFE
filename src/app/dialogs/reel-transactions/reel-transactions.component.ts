import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reel-transactions',
  templateUrl: './reel-transactions.component.html',
  styleUrls: ['./reel-transactions.component.scss']
})
export class ReelTransactionsComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {reel_serial_number: '1202122', reel_part_quantity: '36'},
    {reel_serial_number: '1202122', reel_part_quantity: '36'},
    {reel_serial_number: '1202122', reel_part_quantity: '36'},
  ];
    
  displayedColumns: string[] = ['reel_serial_number','button','reel_part_quantity','action'];
  tableData = this.ELEMENT_DATA
  dataSourceList:any



  constructor() { }

  ngOnInit(): void {
  }

}

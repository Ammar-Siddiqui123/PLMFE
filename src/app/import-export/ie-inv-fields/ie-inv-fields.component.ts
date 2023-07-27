import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ie-inv-fields',
  templateUrl: './ie-inv-fields.component.html',
  styleUrls: ['./ie-inv-fields.component.scss']
})
export class IeInvFieldsComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {table_name: 'Active'},
    {table_name: 'Avg Piece Weight'},
    {table_name: 'Bulk Cell Size'},
    {table_name: 'Bulk Max Qty'},
    {table_name: 'Bulk Min Qty'},
    {table_name: 'Archive Shipping History'},
  ]

    displayedColumns: string[] = ['table_name','modify'];
    tableData = this.ELEMENT_DATA
    dataSourceList:any

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}

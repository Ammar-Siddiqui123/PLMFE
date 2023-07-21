import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lookup-tote-setup',
  templateUrl: './lookup-tote-setup.component.html',
  styleUrls: ['./lookup-tote-setup.component.scss']
})
export class LookupToteSetupComponent implements OnInit {


  ELEMENT_DATA: any[] =[
    {tote_id: '125874', cells: '120' },
  ];

  displayedColumns: string[] = ['tote_id', 'cells', 'actions'];
  tableData = this.ELEMENT_DATA
  dataSourceList:any

  constructor() { }

  ngOnInit(): void {
  }

}

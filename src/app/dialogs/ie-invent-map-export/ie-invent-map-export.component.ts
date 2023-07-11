import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ie-invent-map-export',
  templateUrl: './ie-invent-map-export.component.html',
  styleUrls: ['./ie-invent-map-export.component.scss']
})
export class IeInventMapExportComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {mon: ''},
    {mon: ''},
    {mon: ''},
    {mon: ''},
    {mon: ''},
    
  ]

    displayedColumns: string[] = ['mon','tue','wed','thu','fri','sat','sun','export_hour','export_minute','am_pm','actions'];
    tableData = this.ELEMENT_DATA
    dataSourceList:any


  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}

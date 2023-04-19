import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cm-item-selected',
  templateUrl: './cm-item-selected.component.html',
  styleUrls: ['./cm-item-selected.component.scss']
})
export class CmItemSelectedComponent implements OnInit {
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

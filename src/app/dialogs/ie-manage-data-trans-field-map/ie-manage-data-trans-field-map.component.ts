import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ie-manage-data-trans-field-map',
  templateUrl: './ie-manage-data-trans-field-map.component.html',
  styleUrls: ['./ie-manage-data-trans-field-map.component.scss']
})
export class IeManageDataTransFieldMapComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {container_id: '1202122'},
    {container_id: '1202123'},
    {container_id: '1202124'},
    {container_id: '1202125'},
    {container_id: '1202126'},
    {container_id: '1202127'},
    
  ]

    displayedColumns: string[] = ['container_id','field_type','actions'];
    tableData = this.ELEMENT_DATA
    dataSourceList:any

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}

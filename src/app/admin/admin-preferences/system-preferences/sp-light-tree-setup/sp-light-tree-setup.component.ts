import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sp-light-tree-setup',
  templateUrl: './sp-light-tree-setup.component.html',
  styleUrls: ['./sp-light-tree-setup.component.scss']
})
export class SpLightTreeSetupComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ELEMENT_DATA: any[] =[

    {shelf: '12', alternate_light_positions_no: '22' },
    {shelf: '12', alternate_light_positions_no: '22' },

  ];

  displayedColumns: string[] = ['shelf', 'alternate_light_positions_no','other'];
  tableData = this.ELEMENT_DATA
  dataSourceList:any

}

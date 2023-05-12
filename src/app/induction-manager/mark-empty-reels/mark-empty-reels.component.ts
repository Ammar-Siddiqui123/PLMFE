import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mark-empty-reels',
  templateUrl: './mark-empty-reels.component.html',
  styleUrls: ['./mark-empty-reels.component.scss']
})
export class MarkEmptyReelsComponent implements OnInit {
  ELEMENT_DATA_1: any[] = [
    { scannedserialnumbers: '215412336455232'},
    { scannedserialnumbers: '215412336455232'}
    
   
  ];

  displayedColumns_1: string[] = ['scannedserialnumbers'];
  tableData_1 = this.ELEMENT_DATA_1
  dataSourceList_1: any
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  position: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
];

@Component({
  selector: 'app-process-put-aways',
  templateUrl: './process-put-aways.component.html',
  styleUrls: ['./process-put-aways.component.scss']
})
export class ProcessPutAwaysComponent implements OnInit {
  displayedColumns: string[] = [
    'positions',
    'cells',
    'toteid',
    'save',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  licAppData;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

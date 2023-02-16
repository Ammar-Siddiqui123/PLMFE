import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BatchDeleteComponent } from 'src/app/dialogs/batch-delete/batch-delete.component';
import { SelectZonesComponent } from 'src/app/dialogs/select-zones/select-zones.component';
import { SelectionTransactionForToteComponent } from 'src/app/dialogs/selection-transaction-for-tote/selection-transaction-for-tote.component';
import { TotesAddEditComponent } from 'src/app/dialogs/totes-add-edit/totes-add-edit.component';

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

  displayedColumns1: string[] = [
    'status',
    'orderno',
    'itemno',
    'transaction',
    'location',
    'completed'
  ];
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openSelectZonesDialogue(){
    const dialogRef =  this.dialog.open(SelectZonesComponent, {
      height: '96vh',
      width: '100%',
      autoFocus: '__non_existing_element__'
    })
  }

  openTotesDialogue(){
    const dialogRef =  this.dialog.open(TotesAddEditComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__'
    })
  }

  openDeleteBatchDialogue(){
    const dialogRef =  this.dialog.open(BatchDeleteComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__'
    })
  }

  openSelectionTransactionDialogue(){
    const dialogRef =  this.dialog.open(SelectionTransactionForToteComponent, {
      height: 'auto',
      width: '1100px',
      autoFocus: '__non_existing_element__'
    })
  }

}

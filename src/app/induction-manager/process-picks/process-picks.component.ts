import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BlossomToteComponent } from 'src/app/dialogs/blossom-tote/blossom-tote.component';
import { PickToteManagerComponent } from 'src/app/dialogs/pick-tote-manager/pick-tote-manager.component';
import { ViewOrdersComponent } from 'src/app/dialogs/view-orders/view-orders.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-process-picks',
  templateUrl: './process-picks.component.html',
  styleUrls: ['./process-picks.component.scss']
})
export class ProcessPicksComponent implements OnInit {


  displayedColumns: string[] = ['position', 'toteid', 'orderno', 'priority', 'other'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openPickToteDialogue(){
    const dialogRef =  this.dialog.open(PickToteManagerComponent, {
      height: '90vh',
      width: '100vw',
      autoFocus: '__non_existing_element__'
    })
  }

  openViewOrdersDialogue(){
    const dialogRef =  this.dialog.open(ViewOrdersComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__'
    })
  }

  openBlossomToteDialogue(){
    const dialogRef =  this.dialog.open(BlossomToteComponent, {
      height: 'auto',
      width: '786px',
      autoFocus: '__non_existing_element__'
    })
  }

}

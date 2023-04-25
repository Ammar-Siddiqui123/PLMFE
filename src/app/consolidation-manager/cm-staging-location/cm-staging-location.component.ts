import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CmOrderToteConflictComponent } from 'src/app/dialogs/cm-order-tote-conflict/cm-order-tote-conflict.component';

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
];

@Component({
  selector: 'app-cm-staging-location',
  templateUrl: './cm-staging-location.component.html',
  styleUrls: ['./cm-staging-location.component.scss']
})
export class CmStagingLocationComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position', 'action'];
  tableData = ELEMENT_DATA;


  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCmOrderToteConflict() {
 
    let dialogRef = this.dialog.open(CmOrderToteConflictComponent, {
      height: 'auto',
      width: '620px',
      autoFocus: '__non_existing_element__',
     
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
   }

}

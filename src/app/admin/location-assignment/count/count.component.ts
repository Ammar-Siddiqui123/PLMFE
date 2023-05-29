import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { LaLocationAssignmentQuantitiesComponent } from '../../dialogs/la-location-assignment-quantities/la-location-assignment-quantities.component';

export interface PeriodicElement {
  location: number;
  warehouse: string;
  zone: string;
  carousel: string;
  row: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '14-Feb-2022',row:''},
];
@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {

  displayedColumns: string[] = ['location', 'warehouse', 'zone', 'carousel','row'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private _liveAnnouncer: LiveAnnouncer , private dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('deleteAction') quarantineTemp: TemplateRef<any>;

  @ViewChild('addOrder') addOrderTemp: TemplateRef<any>;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  quarantineDialog(): void {
    const dialogRef = this.dialog.open(this.quarantineTemp, {
      width: '550px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }

  addOrdereDialog(): void {
    const dialogRef = this.dialog.open(this.addOrderTemp, {
      width: '550px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }
  deleteItem($event) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }




  openLAQ() {
    let dialogRef = this.dialog.open(LaLocationAssignmentQuantitiesComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
    
    })
    dialogRef.afterClosed().subscribe(result => {
      
      
    })
  }

}

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  location: number;
  warehouse: string;
  zone: string;
  carousel: string;
  row:string;
  shelf:string;
  bin:string;
  lot:string;
  expiration:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
  {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '05', row: '05', shelf: '05', bin:'05', lot:'05', expiration: '05'},
];

@Component({
  selector: 'app-inventory-location',
  templateUrl: './inventory-location.component.html',
  styleUrls: ['./inventory-location.component.scss']
})
export class InventoryLocationComponent implements OnInit {
  displayedColumns: string[] = ['location', 'warehouse', 'zone', 'carousel', 'row', 'shelf', 'bin', 'lot', 'expiration'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }
  

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

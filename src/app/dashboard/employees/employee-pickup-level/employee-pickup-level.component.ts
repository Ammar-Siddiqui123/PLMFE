import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';


export interface pickup_level_details {
  pick_level: string;
  start_shelf: string;
  end_shelf: string;
  edit: string;
  delete: string;
}

// employee_details table data
const pickup_level_data: pickup_level_details[] = [
  {pick_level: '01', start_shelf: '3', end_shelf: '9', edit: '01', delete: '01'},
  {pick_level: '02', start_shelf: '2', end_shelf: '7', edit: '02', delete: '02'},
  {pick_level: '03', start_shelf: '4', end_shelf: '2', edit: '03', delete: '03'},
  {pick_level: '04', start_shelf: '1', end_shelf: '8', edit: '04', delete: '04'},
  {pick_level: '05', start_shelf: '0', end_shelf: '0', edit: '05', delete: '05'},
  {pick_level: '06', start_shelf: '9', end_shelf: '1', edit: '06', delete: '06'},
];

@Component({
  selector: 'app-employee-pickup-level',
  templateUrl: './employee-pickup-level.component.html',
  styleUrls: ['./employee-pickup-level.component.scss']
})
export class EmployeePickupLevelComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.pickup_level_data_source.sort = this.sort;
  }

   // table initialization
   displayedColumns: string[] = ['pick_level', 'start_shelf', 'end_shelf', 'edit'];
   pickup_level_data_source = new MatTableDataSource(pickup_level_data);

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pickup_level_data_source.filter = filterValue.trim().toLowerCase();
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

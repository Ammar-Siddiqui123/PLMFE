import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';


export interface employees_details {
  id: string;
  first_name: string;
  last_name: string;
  mi: string;
}

// employee_details table data
const employees_details_data: employees_details[] = [
  {id: '01', first_name: 'Jeff', last_name: 'Smith', mi: 'js'},
  {id: '02', first_name: 'Chris', last_name: 'Adward', mi: 'CA'},
  {id: '03', first_name: 'Anthony', last_name: 'Jackson', mi: 'AJ'},
  {id: '04', first_name: 'Brad', last_name: 'Way', mi: 'BW'},
  {id: '05', first_name: 'Micheal', last_name: 'Steph', mi: 'MS'},
  {id: '06', first_name: 'Steward', last_name: 'Johnson', mi: 'SJ'},
];

@Component({
  selector: 'app-employees-lookup',
  templateUrl: './employees-lookup.component.html',
  styleUrls: ['./employees-lookup.component.scss']
})
export class EmployeesLookupComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.employee_data_source.sort = this.sort;
  }

   // table initialization
   displayedColumns: string[] = ['id', 'first_name', 'last_name', 'mi'];
   employee_data_source = new MatTableDataSource(employees_details_data);

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employee_data_source.filter = filterValue.trim().toLowerCase();
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

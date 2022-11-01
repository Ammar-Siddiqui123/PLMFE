import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface location {
  start_location: string;
  end_location: string;
  delete_location: string;
}

// location table data
const location_data: location[] = [
  {start_location: 'NewYork', end_location: 'SanFransisco', delete_location: '1'},
  {start_location: 'France', end_location: 'Oklahoma', delete_location: '1'},
  {start_location: 'American Creek', end_location: 'Center Point', delete_location: '1'},
  {start_location: 'Italy', end_location: 'NewYork', delete_location: '1'},
  {start_location: 'SanFransisco', end_location: 'Virginia', delete_location: '1'},
];


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  employees_action: boolean = false;
  employee_fetched_zones: string[] = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];


  // table initialization
  displayedColumns: string[] = ['start_location', 'end_location', 'delete_location'];
  location_data_source = new MatTableDataSource(location_data);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.location_data_source.sort = this.sort;
  }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

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


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


export interface groups_details {
  name: string;
}

// employee_details table data
const groups_details_data: groups_details[] = [
  {name: 'Administrator'},
  {name: 'Bulk Operator'},
  {name: 'Staff'},
  {name: 'Brad'},
  {name: 'Micheal'},
  {name: 'Steward'},
];

@Component({
  selector: 'app-groups-lookup',
  templateUrl: './groups-lookup.component.html',
  styleUrls: ['./groups-lookup.component.scss']
})
export class GroupsLookupComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.group_data_source.sort = this.sort;
  }

   // table initialization
   displayedColumns: string[] = ['name'];
   group_data_source = new MatTableDataSource(groups_details_data);

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

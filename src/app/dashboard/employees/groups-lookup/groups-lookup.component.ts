import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { EmployeeObject, IEmployee } from 'src/app/Iemployee';
import { EmployeeService } from 'src/app/employee.service';


export interface groups_details {
  groupName: string;
}



@Component({
  selector: 'app-groups-lookup',
  templateUrl: './groups-lookup.component.html',
  styleUrls: ['./groups-lookup.component.scss']
})
export class GroupsLookupComponent implements OnInit {
  emp: IEmployee;
  employees_res: any;
  employees_details_data: any = [];

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  group_data_source: any =[];

   // table initialization
   displayedColumns: string[] = ['groupName'];

  constructor(private _liveAnnouncer: LiveAnnouncer,private employeeService: EmployeeService) {}

  // employee_details table data
//  groups_details_data: groups_details[] = [

// ];

  @ViewChild(MatSort) sort: MatSort;
  groups_details_data:any = [];
  ngAfterViewInit() {
    this.group_data_source.sort = this.sort;
  }


  

   ngOnInit(): void {

    this.emp = {
      "userName": "1234",
      "wsid": "TESTWSID"
        };
    this.employeeService.getEmployeeData(this.emp)
    .subscribe((response: EmployeeObject) => {
      this.employees_res = response
      this.groups_details_data = this.employees_res.data.allGroups
      console.log(this.groups_details_data);
      this.group_data_source = new MatTableDataSource(this.groups_details_data);
      console.log(this.group_data_source)
    
      });
      
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

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AddNewEmployeeComponent } from '../../dialogs/add-new-employee/add-new-employee.component';
import { NgForm } from '@angular/forms';
import { AdminEmployeeLookupResponse, IEmployee } from 'src/app/Iemployee';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../../../../app/init/auth.service';

// employee_details table data


@Component({
  selector: 'app-employees-lookup',
  templateUrl: './employees-lookup.component.html',
  styleUrls: ['./employees-lookup.component.scss']
})
export class EmployeesLookupComponent implements OnInit {
  emp: IEmployee;
  employees_res: any;
  employee_data_source: any = [];
  public env;
  @Input('childLookUp') isLookUp: boolean;
  @Output() updateIsLookUp = new EventEmitter();
  userData: any;
  selectedRowIndex = -1;
  public searchVal: any;

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  // table initialization
  displayedColumns: string[] = ['lastName', 'firstName', 'mi', 'username'];
  constructor(private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog, private employeeService: EmployeeService, private authService: AuthService) { }

  @ViewChild(MatSort) sort: MatSort;
  employees_details_data: [] = [];
  @ViewChild('autoFocusField') searchBoxField: ElementRef;
  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.env = JSON.parse(localStorage.getItem('env') || '');
    this.EmployeeLookUp();

  }
EmployeeLookUp(){
  this.emp = {
    "lastName": "%",
    "userName": this.userData.userName,
    "wsid": this.userData.wsid
  };
  this.employeeService.getAdminEmployeeLookup(this.emp)
    .subscribe((response: AdminEmployeeLookupResponse) => {
      this.employees_res = response
      this.employees_details_data = this.employees_res.data.employees 
      this.employee_data_source = new MatTableDataSource(this.employees_details_data);
    });
}
  ngAfterViewInit() {
    this.employee_data_source.sort = this.sort;
    setTimeout(()=>{
      this.searchBoxField.nativeElement.focus();  
    }, 500);

  }


  public clear() {
    this.searchVal = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employee_data_source.filter = filterValue.trim().toLowerCase();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.employee_data_source.sort = this.sort;
  }
  getEmpDetails(empData: any) {
    this.isLookUp = true;
    this.updateIsLookUp.emit({ userData: empData, isLookUp: this.isLookUp });
  }
}

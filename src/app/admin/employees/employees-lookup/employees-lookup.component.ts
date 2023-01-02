import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AddNewEmployeeComponent } from '../../dialogs/add-new-employee/add-new-employee.component';
import { NgForm } from '@angular/forms';
import { AdminEmployeeLookupResponse, IEmployee } from 'src/app/Iemployee';
import { EmployeeService } from 'src/app/employee.service';

// employee_details table data


@Component({
  selector: 'app-employees-lookup',
  templateUrl: './employees-lookup.component.html',
  styleUrls: ['./employees-lookup.component.scss']
})
export class EmployeesLookupComponent implements OnInit {
  emp: IEmployee;
  employees_res: any;
  employee_data_source:any = [];
  public env;
  @Input('childLookUp') isLookUp: boolean;
  @Output() updateIsLookUp  = new EventEmitter();

  selectedRowIndex = -1;

  highlight(row){
      this.selectedRowIndex = row.id;
  }

  // table initialization
  displayedColumns: string[] = ['firstName', 'lastName', 'mi', 'username'];
  constructor(private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog,private employeeService: EmployeeService) {}

  @ViewChild(MatSort) sort: MatSort;
  employees_details_data: [] = [];

  ngOnInit(): void {
    this.env =  JSON.parse(localStorage.getItem('env') || '');
    this.emp = {
      "lastName": "%",
      "userName": "1234",
      "wsid": "TESTWSID"
    };
    this.employeeService.getAdminEmployeeLookup(this.emp)
      .subscribe((response: AdminEmployeeLookupResponse) => {
        this.employees_res = response
        this.employees_details_data = this.employees_res.data.employees
        // console.log(this.employees_details_data)
        this.employee_data_source = new MatTableDataSource(this.employees_details_data);
      });

  }

  ngAfterViewInit() {
    this.employee_data_source.sort = this.sort;
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


  openDialog() {
    let dialogRef = this.dialog.open(AddNewEmployeeComponent, {
      height: 'auto',
      width: '480px',
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result !== 'no') {
              const enabled = "Y"
                console.log(result);
            } else if (result === 'no') {
               console.log('User clicked no.');
            }
        }
    })
}
getEmpDetails(empData: any){
  this.isLookUp = true;
  this.updateIsLookUp.emit({userData: empData, isLookUp: this.isLookUp});
}
}

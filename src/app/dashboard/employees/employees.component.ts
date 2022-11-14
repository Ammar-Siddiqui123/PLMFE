import { AfterViewInit, Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmployeeService } from 'src/app/employee.service';
import { AdminEmployeeLookupResponse, EmployeeObject, IEmployee } from 'src/app/Iemployee';
import { MatDialog } from '@angular/material/dialog';
import { AddNewEmployeeComponent } from '../dialogs/add-new-employee/add-new-employee.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { AddZoneComponent } from '../dialogs/add-zone/add-zone.component';
import { AddLocationComponent } from '../dialogs/add-location/add-location.component';
import { AddGroupAllowedComponent } from '../dialogs/add-group-allowed/add-group-allowed.component';

export interface location {
  start_location: string;
  end_location: string;
  delete_location: string;
}

// location table data



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  emp: IEmployee;
  public isLookUp: boolean = false;
  public isGroupLookUp: boolean = false;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  empData: any = {};
  max_orders: any;
  pickUplevels: any;
  location_data: any[] = [];
  employee_data_source: any = [];
  grpData: any = {};
  // max_orders:any;
  userName: any;
  employees_action: boolean = false;
  // employee_fetched_zones: string[] = [];
  // group_fetched_assigned_function:string[] = [];
  // group_fetched_unassigned_function:string[] = [];

  // employees_action: boolean = false;
  employee_fetched_zones: any;
  location_data_source: any;
  employee_group_allowed: any;


  // table initialization
  displayedColumns: string[] = ['start_location', 'end_location', 'delete_location'];
  zoneColumns: string[] = ['zones', 'actions'];


  constructor(private _liveAnnouncer: LiveAnnouncer, private employeeService: EmployeeService, private dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.location_data_source.sort = this.sort;
    this.employee_fetched_zones.sort = this.sort;
  }



  updateIsLookUp(event: any) {
    this.empData = {};
    this.empData = event.userData;
    this.isLookUp = event;
    this.max_orders = 10;
    console.log(event.userData?.username);

    const emp_data = {
      "userName": event.userData?.username,
      "wsid": "TESTWSID"
    };
    console.log(emp_data)
    this.employeeService.getAdminEmployeeDetails(emp_data)
      .subscribe((response: any) => {
        // console.log(response);
        this.employee_group_allowed = response.data?.userRights
        this.pickUplevels = response.data?.pickLevels;
        this.location_data_source = new MatTableDataSource(response.data?.bulkRange);
        this.location_data = response.data?.bulkRange
        this.employee_fetched_zones = new MatTableDataSource(response.data?.allZones);
      });
  }

  updateGrpLookUp(event: any) {
    this.grpData = {};
    this.grpData = event.groupData;
    this.isGroupLookUp = event;
    this.max_orders = 10;
    console.log("event", event);

    // const usr = localStorage.getItem("user")
    // if(usr)
    // {
    //    const jsonResult = JSON.parse(usr); 
    //   console.log(usr)
    //   this.userName= jsonResult.data.userName;
    //   console.log( this.userName)

    // }


    // const grp_data = {
    //   "userName":this.userName,
    //   "wsid": "TESTWSID",
    //   "groupName":event.groupData?.groupName,

    //   };
    //   console.log("grp_data",grp_data)
    // this.employeeService.getFunctionByGroup(grp_data)
    // .subscribe((response:any) => {
    //   console.log("function data",response);
    //   this.group_fetched_assigned_function = response.data?.groupFunc
    //   this.group_fetched_unassigned_function = response.data?.allFunc


    // });
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

  actionDialog(event: any, emp_data: any, matEvent: MatSelectChange) {
    if (event === 'edit') {
      let dialogRef = this.dialog.open(AddNewEmployeeComponent, {
        height: 'auto',
        width: '480px',
        data: {
          mode: 'edit',
          emp_data: emp_data
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.isLookUp = false;
        const matSelect: MatSelect = matEvent.source;
        matSelect.writeValue(null);
      })
    }
    if (event === 'delete') {
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        data: {
          mode: 'edit',
          emp_data: emp_data
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.isLookUp = false;
        const matSelect: MatSelect = matEvent.source;
        matSelect.writeValue(null);
      })
    }
    if (event === 'back') {
      this.isLookUp = false;
      this.employee_fetched_zones = [];
      const matSelect: MatSelect = matEvent.source;
      matSelect.writeValue(null);

    }


  }

  addZoneDialog() {
    let dialogRef;
    dialogRef = this.dialog.open(AddZoneComponent, {
      height: 'auto',
      width: '480px',
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Added Succesfully!');

    })
  }

  deleteZone(zone: any) {
    this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-zone',
        zone: zone
      }
    })

  }

  addLocationDialog() {
    let dialogRef;
    dialogRef = this.dialog.open(AddLocationComponent, {
      height: 'auto',
      width: '480px',
    })
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  deleteLocation(location: any) {
    this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-location',
        location: location
      }
    })

  }

  groupAllowedDialog() {
    this.dialog.open(AddGroupAllowedComponent, {
      height: 'auto',
      width: '480px',
    })
  }
  deleteGroupAllowed(allowedGroup: any) {
    this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-allowedgroup',
        allowedGroup: allowedGroup
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.location_data_source.filter = filterValue.trim().toLowerCase();
  }


}

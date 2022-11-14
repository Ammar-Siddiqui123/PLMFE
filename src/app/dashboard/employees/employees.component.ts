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
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  empData: any = {};
  max_orders: any;
  pickUplevels: any;
  location_data: any[] = [];
  employee_data_source:any = [];

  // employees_action: boolean = false;
  employee_fetched_zones: string[] = [];
  location_data_source: any;
  employee_group_allowed: any;


  // table initialization
  displayedColumns: string[] = ['start_location', 'end_location', 'delete_location'];


  constructor(private _liveAnnouncer: LiveAnnouncer, private employeeService: EmployeeService, private dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.location_data_source.sort = this.sort;
  }



  updateIsLookUp(event: any) {
    this.empData = {};
    this.empData = event.userData;
    this.isLookUp = event;
    this.max_orders = 10;

    // this.pickUplevels = [];
    const emp_data = {
      "userName": event.userData?.username,
      "wsid": "TESTWSID"
    };
    this.employeeService.getAdminEmployeeDetails(emp_data)
      .subscribe((response: any) => {
        // console.log(response);
        this.employee_group_allowed = response.data?.userRights
        this.pickUplevels = response.data?.pickLevels;
        this.location_data_source = new MatTableDataSource(response.data?.bulkRange);
        this.location_data = response.data?.bulkRange
        this.employee_fetched_zones = response.data?.allZones
      });
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
    if(event === 'back'){
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
  
  deleteZone(zone:any){
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

  deleteLocation(location:any){
    this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-location',
        location: location
      }
    })
    
  }


}

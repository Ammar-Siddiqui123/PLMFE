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
import { AddNewGroupComponent } from '../dialogs/add-new-group/add-new-group.component';
import { ToastrService } from 'ngx-toastr';
import labels from '../../labels/labels.json';
import { GroupsAllowedComponent } from './groups-allowed/groups-allowed.component';
import { GroupAllowedComponent } from '../dialogs/group-allowed/group-allowed.component';
import { CloneGroupComponent } from '../dialogs/clone-group/clone-group.component';

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
  public env;
  public searchGrpAllowed = '';
  public searchfuncAllowed = '';

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  empData: any = {};
  max_orders: any;
  pickUplevels: any;
  assignedFunctions:any;
  unassignedFunctions:any;
  group_fetched_unassigned_function:any
  location_data: any[] = [];
  employee_data_source: any = [];
  grpData: any = {};
  // max_orders:any;
  userName: any;
  employees_action: boolean = false;
  // employee_fetched_zones: string[] = [];
  // employees_action: boolean = false;
  employee_fetched_zones: any;
  location_data_source: any;
  employee_group_allowed: any;
  emp_all_zones:any;
  groupAllowedList:any;
  grp_data:any;



  // table initialization
  displayedColumns: string[] = ['start_location', 'end_location', 'delete_location'];
  zoneColumns: string[] = ['zones', 'actions'];


  constructor(private _liveAnnouncer: LiveAnnouncer, private employeeService: EmployeeService, private dialog: MatDialog,private toastr: ToastrService) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    // this.location_data_source.sort = this.sort;
    // this.employee_fetched_zones.sort = this.sort;
  }



  updateIsLookUp(event: any) {
    this.empData = {};
    this.empData = event.userData;
    this.isLookUp = event;
    console.log(event.userData?.username);
    this.grp_data = event.userData?.username

    this.max_orders = event.userData.maximumOrders;
    const emp_data = {
      "userName": event.userData?.username,
      "wsid": "TESTWSID"
    };
    // console.log(emp_data)
    this.employeeService.getAdminEmployeeDetails(emp_data)
      .subscribe((response: any) => {
        // console.log(response);
        this.isLookUp = event;
        this.employee_group_allowed = response.data?.userRights
        this.pickUplevels = response.data?.pickLevels;
        this.location_data_source = new MatTableDataSource(response.data?.bulkRange);
        this.location_data = response.data?.bulkRange
        this.employee_fetched_zones = new MatTableDataSource(response.data?.handledZones);
        this.emp_all_zones = response.data?.allZones;
      });

      const emp_grp = {
        "userName": event.userData?.username,
        "wsid": "TESTWSID"
      };
      this.employeeService.getUserGroupNames(emp_grp).subscribe((res:any) => {
        this.groupAllowedList = res.data;
      }) 
   
  }
  addPermission(event:any){
    if(typeof( event.function) == 'string'){
      this.unassignedFunctions = this.unassignedFunctions.filter(name => name !== event.function);
      this.assignedFunctions.unshift(event.function);
    }
    else{
      event.function.map((func => {
        this.unassignedFunctions = this.unassignedFunctions.filter(name => name !== func);
        this.assignedFunctions.unshift(func);
      }));

    }
  }
  removePermission(event:any){
    // console.log(this.unassignedFunctions);
    if(typeof(event.function) == 'string'){
      this.assignedFunctions = this.assignedFunctions.filter(name => name !== event.function);
      this.unassignedFunctions.unshift(event.function);
    }
    else{
      event.function.map((func => {
        this.assignedFunctions = this.assignedFunctions.filter(name => name !== func);
        this.unassignedFunctions.unshift(func);
      }));

    }
  }
  saveAssignedFunc(){

    let assignFunc = {
      "userName": "1234",
      "wsid": "TESTWID",
      "GroupName": "123",
      "controls": this.assignedFunctions
    }
    this.employeeService.insertGroupFunctions(assignFunc)
      .subscribe((res: any) => {
        this.assignedFunctions =[];
        this.unassignedFunctions =[];
        this.isGroupLookUp = false;
        if(res.isExecuted){
          this.toastr.success(labels.alert.update, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }

      });
  }
  updateGrpLookUp(event: any) {
    this.grpData = {};
    this.grpData = event.groupData;
    this.isGroupLookUp = event;
    this.max_orders = 10;
    // console.log("event", event);

    const grp_data = {
      "userName":this.userName,
      "wsid": "TESTWSID",
      "groupName":this.grpData.groupName

      };
      // console.log("grp_data",grp_data)
    this.employeeService.getFunctionByGroup(grp_data)
    .subscribe((response:any) => {
      // console.log("function data",response);
      this.assignedFunctions = response.data?.allFunc
      this.unassignedFunctions = response.data?.groupFunc


    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

   this.env =  JSON.parse(localStorage.getItem('env') || '');
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
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
          mode: 'delete-emp',
          emp_data: emp_data
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.isLookUp = false;
        const matSelect: MatSelect = matEvent.source;
        matSelect.writeValue(null);
      })
    }
    // if (event === 'back') {
    //   this.isLookUp = false;
    //   this.employee_fetched_zones = [];
    //   this.location_data_source = [];
    //   this.max_orders = '';
    //   const matSelect: MatSelect = matEvent.source;
    //   matSelect.writeValue(null);

    // }


  }
  backEmpAction(){
    this.isLookUp = false;
      this.employee_fetched_zones = [];
      this.location_data_source = [];
      this.max_orders = '';
  }
  actionGroupDialog(event: any, grp_data: any, matEvent: MatSelectChange) {
    // console.log(event.value)
    if (event === 'edit') {
      let dialogRef = this.dialog.open(AddNewGroupComponent, {
        height: 'auto',
        width: '480px',
        data: {
          mode: 'edit',
          grp_data: grp_data
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.isGroupLookUp = false;
        const matSelect: MatSelect = matEvent.source;
        matSelect.writeValue(null);
      })
    }
    if (event === 'delete') {
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        data: {
          mode: 'delete-group',
          grp_data: grp_data
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.isGroupLookUp = false;
        const matSelect: MatSelect = matEvent.source;
        matSelect.writeValue(null);
      })
    }
    if (event === 'clone') {
      console.log(grp_data);
      let dialogRef = this.dialog.open(CloneGroupComponent, {
        height: 'auto',
        width: '480px',
        data: {
          mode: 'clone',
          grp_data: grp_data
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        this.isGroupLookUp = false;
        const matSelect: MatSelect = matEvent.source;
        matSelect.writeValue(null);
      })
      
    }


  }

  backGroupAction(){
    this.isGroupLookUp = false;
    this.assignedFunctions = [];
    this.unassignedFunctions = [];
    this.max_orders = '';
  }

  addZoneDialog() {
    let dialogRef;
    dialogRef = this.dialog.open(AddZoneComponent, {
      height: 'auto',
      width: '480px',
      data: {
        allZones: this.emp_all_zones,
        userName: this.grp_data
      }
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
        zone: zone,
        userName:this.grp_data
      }
    })

  }

  addLocationDialog() {
    let dialogRef;
    dialogRef = this.dialog.open(AddLocationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        userName:this.grp_data
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  deleteLocation(location:any){
    let dialogRef;
    dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-location',
        location: location,
        userName:this.grp_data
      }
    })
  }

  groupAllowedDialog() {
    this.dialog.open(AddGroupAllowedComponent, {
      height: 'auto',
      width: '480px',
    })
  }
  grpAllowedDialog() {
    this.dialog.open(GroupAllowedComponent, {
      height: 'auto',
      width: '480px',
      data:{
        grp_data:this.grp_data
      }
    })
  }
  deleteGroupAllowed(allowedGroup: any) {
    this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-group',
        allowedGroup: allowedGroup
      }
    })

  }
  deleteGrpAllowed(allowedGroup: any) {
    allowedGroup.userName = this.grp_data;
    this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-grpallowed',
        allowedGroup: allowedGroup
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.location_data_source.filter = filterValue.trim().toLowerCase();
  }
  zoneFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employee_fetched_zones.filter = filterValue.trim().toLowerCase();
  }
  // grpAllowedFilter(event: Event) {
    
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   // console.log(filterValue);
  //   // this.groupAllowedList.filter = filterValue.trim().toLowerCase();

  //   this.groupAllowedList = this.groupAllowedList.filter(t=>t.groupName === filterValue);
  //   // console.log(filteredvalues);
  // }


}
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmployeeObject, IEmployee } from 'src/app/Iemployee';
import { EmployeeService } from 'src/app/employee.service';
import { AddNewGroupComponent } from '../../dialogs/add-new-group/add-new-group.component';
import { AuthService } from '../../../../app/init/auth.service';


export interface groups_details {
  groupName: string;
}



@Component({
  selector: 'app-groups-lookup',
  templateUrl: './groups-lookup.component.html',
  styleUrls: ['./groups-lookup.component.scss']
})
export class GroupsLookupComponent implements OnInit {
  emp: any;
  employees_res: any;
  employees_details_data: any = [];
  @Input('childGroupLookUp') isGroupLookUp: boolean;
  @Input('updateGrpTable') updateGrpTable: any;
  @Output() updateGrpLookUp = new EventEmitter();
  @ViewChild('groupDataRefresh', { static: true,read:MatTable }) groupDataRefresh;

  selectedRowIndex = -1;

  highlight(row) {
    this.selectedRowIndex = row.id;
  }


  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  group_data_source: any = [];
  userData: any;

  // table initialization
  displayedColumns: string[] = ['groupName'];

  constructor(private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog, private employeeService: EmployeeService, private authService: AuthService) { }

  @ViewChild(MatSort) sort: MatSort;
  groups_details_data: any = [];
  ngAfterViewInit() {
    this.group_data_source.sort = this.sort;
  }




  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.loadEmpData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.group_data_source.filter = filterValue.trim().toLowerCase();
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

    this.group_data_source.sort = this.sort;

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  // openGroupDialog() {
  //   let dialogRef = this.dialog.open(AddNewGroupComponent, {
  //     height: 'auto',
  //     width: '560px',
  //     autoFocus: '__non_existing_element__',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.loadEmpData();
  //   })

  // }
  getGrpDetails(grpData: any) {
    console.log(grpData)
    this.isGroupLookUp = true;
    this.updateGrpLookUp.emit({ groupData: grpData, isGroupLookUp: this.isGroupLookUp });
    // console.log(this.isGroupLookUp)

  }

  private loadEmpData(){
    this.emp = {
      "userName": this.userData.userName,
      "wsid": this.userData.wsid
    };
    this.employeeService.getEmployeeData(this.emp)
      .subscribe((response: EmployeeObject) => {
        this.employees_res = response
        this.groups_details_data = this.employees_res.data.allGroups
        this.group_data_source = new MatTableDataSource(this.groups_details_data);
      });

  }

  ngOnChanges(changes: SimpleChanges): void {
   this.group_data_source.filteredData.push({groupName:this.updateGrpTable});
   console.log(this.group_data_source.filteredData);
   
   this.groupDataRefresh.renderRows();
  }



}

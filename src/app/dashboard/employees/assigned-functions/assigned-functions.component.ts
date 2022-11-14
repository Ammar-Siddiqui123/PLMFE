import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-assigned-functions',
  templateUrl: './assigned-functions.component.html',
  styleUrls: ['./assigned-functions.component.scss']
})
export class AssignedFunctionsComponent implements OnInit {
  @Input('isAssignedLookUp') isAssignedLookUp: boolean;
  @Output() updateAssignedLookUp  = new EventEmitter();

  selectedRowIndex = -1;

  highlight(row){
      this.selectedRowIndex = row.id;
  }
  
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  employee_fetched_zones: string[] = [];
  group_fetched_assigned_function:string[] = [];
  group_fetched_unassigned_function:string[] = [];
  userName:any;
  constructor( private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    // this.assigned()

  }
  assigned(event:any){
 
   
    const usr = localStorage.getItem("user")
    if(usr)
    {
       const jsonResult = JSON.parse(usr); 
      console.log(usr)
      this.userName= jsonResult.data.userName;
      console.log( this.userName)
      
    }
   

    const grp_data = {
      "userName":this.userName,
      "wsid": "TESTWSID",
      "groupName":"Administrator",
      
      };
      console.log("grp_data",grp_data)
    this.employeeService.getFunctionByGroup(grp_data)
    .subscribe((response:any) => {
      console.log("function data",response);
      this.group_fetched_assigned_function = response.data?.groupFunc
      this.group_fetched_unassigned_function = response.data?.allFunc


    });
  }





  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



}

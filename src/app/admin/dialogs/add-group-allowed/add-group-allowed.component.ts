import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import labels from '../../../labels/labels.json';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-add-group-allowed',
  templateUrl: './add-group-allowed.component.html',
  styleUrls: ['./add-group-allowed.component.scss']
})
export class AddGroupAllowedComponent implements OnInit {

  form_heading: string = 'Add Group Allowed';
  form_btn_label: string = 'Add';
  GroupName:any;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private employeeService: EmployeeService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onSend(form: NgForm){
    form.value.username = "1234";
    form.value.wsid = "TESTWID";

    console.log(form.value);
    
    this.employeeService.insertGroup(form.value).subscribe((res:any) => {
      if(res.isExecuted){
        this.dialog.closeAll();
        this.toastr.success(labels.alert.success, 'Success!',{
          positionClass: 'toast-bottom-right',
          timeOut:2000
       });
      }
 }); 
  }
}

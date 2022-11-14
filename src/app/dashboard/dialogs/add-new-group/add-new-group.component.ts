import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import labels from '../../../labels/labels.json';
import { EmployeeService } from 'src/app/employee.service';
import { AccessGroupObject, AdminEmployeeLookupResponse, IEmployee } from 'src/app/Iemployee';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-add-new-group',
  templateUrl: './add-new-group.component.html',
  styleUrls: ['./add-new-group.component.scss']
})

export class AddNewGroupComponent implements OnInit {
 
  @ViewChild('addNewGroup') AddNewEmployeeComponent: TemplateRef<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog: MatDialog, private toastr: ToastrService, private employeeService: EmployeeService) { }
  emp: IEmployee;
  gname;

  ngOnInit(): void {
  }

  onSend(form: NgForm){
    if(form.status === 'INVALID')
    {
      // display error in your form
    }else{
        console.log(form.value)
        
        this.gname = form.value.groupName
        this.emp = {
          "userName": "1234",
          "wsid": "TESTWID",
          "GroupName":this.gname
      
        };
      
        this.employeeService.insertGroup(this.emp)
        .subscribe((response: AccessGroupObject) => {
          console.log(response);

        
        
        });

        this.dialog.closeAll(); // Close opened diaglo
      // do whatever you want to do with your data

      this.toastr.success(labels.alert.success, 'Success!');
    }

  }

}

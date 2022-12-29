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
  form_heading: string = 'Add New Group';
  form_btn_label: string = 'Add';
  grpData: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService, private employeeService: EmployeeService) { }
 
  emp: IEmployee;
  groupName:string;

  ngOnInit(): void {
    this.grpData = this.data.grp_data;
    this.data?.mode === 'edit' ? this.form_heading = 'Edit Group' : 'Add New Group';
    this.data?.mode === 'edit' ? this.form_btn_label = 'Save': 'Add';
    this.groupName = this.grpData.groupName ?? '';


  }


  onSend(form: NgForm){
    if(form.status === 'INVALID')
    {
      // display error in your form
    }else{
        
         this.employeeService.insertGroup(form.value)
        .subscribe((response: AccessGroupObject) => {
          if(response.isExecuted){
            this.dialog.closeAll(); // Close opened diaglo
            this.toastr.success(labels.alert.success, 'Success!',{
              positionClass: 'toast-bottom-right',
              timeOut:2000
           });
          }
          else{

          }
      });
      
      
    }

  }

}

  

import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import labels from '../../../labels/labels.json';
import { EmployeeService } from 'src/app/employee.service';
import { AdminEmployeeLookupResponse } from 'src/app/Iemployee';
import { Router } from '@angular/router';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.scss']
})
export class AddNewEmployeeComponent implements OnInit {


  @ViewChild('addNewEmployee') AddNewEmployeeComponent: TemplateRef<any>;
  form_heading: string = 'Add New Employee';
  form_btn_label: string = 'Add';
  empData: any = [];
  mi:string;
  firstName:string;
  lastName:string;
  userName:string;
  emailAddress:string;
  accessLevel:string;
  active: boolean;

  toggle_password = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialog: MatDialog, 
    private toastr: ToastrService, 
    private employeeService: EmployeeService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.empData = this.data?.emp_data;
    this.data?.mode === 'edit' ? this.form_heading = 'Edit Employee' : 'Add New Employee';
    this.data?.mode === 'edit' ? this.form_btn_label = 'Save': 'Add';
    this.mi = this.empData?.mi ?? '';
    this.firstName = this.empData?.firstName ?? '';
    this.lastName = this.empData?.lastName ?? '';
    this.userName = this.empData?.username ?? '';
    this.emailAddress = this.empData?.emailAddress ?? '';
    this.accessLevel = this.empData?.accessLevel.toLowerCase() ?? '';
    this.active = this.empData?.active ?? true;
    
  }

  onSend(form: NgForm){
    if(form.status === 'INVALID')
    {
      // display error in your form
    }else{
      if(this.data?.mode === 'edit'){
        form.value.wsid = "TESTWID";
        form.value.groupName =  "",
       this.employeeService.updateAdminEmployee(form.value).subscribe((res:any) => {
            if(res.isExecuted){
              this.dialog.closeAll();
              this.toastr.success(labels.alert.update, 'Success!',{
                positionClass: 'toast-bottom-right',
                timeOut:2000
             });
            }
            else{

            }
       }); 
      }
      else{
        this.employeeService.saveAdminEmployee(form.value)
        .subscribe((response: AdminEmployeeLookupResponse) => {
          if(response.isExecuted){
            this.dialog.closeAll();
            this.toastr.success(labels.alert.success, 'Success!',{
              positionClass: 'toast-bottom-right',
              timeOut:2000
           });
           this.reloadCurrentRoute();
          }
          else{
            this.toastr.error(response.responseMessage, 'Error!',{
              positionClass: 'toast-bottom-right',
              timeOut:2000
           });
          }
      });
      }
      
    }

  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}

import { Component, OnInit, Inject, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  mi: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  accessLevel: string;
  active: boolean;
  isEmail: boolean;
  isDisabledPassword: boolean;
  isDisabledUsername: boolean;
  toggle_password = true;
  empForm: FormGroup;
  @ViewChild('focusFeild') focusFeild: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.empData = this.data?.emp_data;
    this.data?.mode === 'edit' ? this.form_heading = 'Edit Employee' : 'Add New Employee';
    this.data?.mode === 'edit' ? this.form_btn_label = 'Save' : 'Add';
    this.data?.mode === 'edit' ? this.isEmail = true : false;
    this.data?.mode === 'edit' ? this.isDisabledPassword = true : false;
    this.data?.mode === 'edit' ? this.isDisabledUsername = true : false;
    this.mi = this.empData?.mi ?? '';
    this.firstName = this.empData?.firstName ?? '';
    this.lastName = this.empData?.lastName ?? '';
    this.userName = this.empData?.username ?? '';
    this.emailAddress = this.empData?.emailAddress ?? '';
    this.accessLevel = this.empData?.accessLevel.toLowerCase() ?? '';
    this.active = this.empData?.active ?? true;
    this.initialzeEmpForm();
  }

  toggleDisabled(){
    this.isDisabledPassword = false;
    if(!this.isDisabledPassword){
      this.empForm.controls['password'].enable();
      this.focusFeild.nativeElement.focus();
    }
  }
  isEmptyPass(){
  // console.log(this.empForm.controls['password']?.value);
  
     if(this.empForm.controls['password']?.value === ''){
      this.isDisabledPassword = true;
      this.empForm.controls['password'].disable();
    }
  }

  initialzeEmpForm() {
    this.empForm = this.fb.group({
      mi: [ this.mi || '', []],
      firstName: [  this.firstName || '', []],
      lastName: [  this.lastName || '', [Validators.required]],
      userName: [{value: this.userName, disabled: this.isDisabledPassword} || '', [Validators.required]],
      password: [{value: '', disabled: this.isDisabledPassword}, [Validators.required]],
      emailAddress: [  this.emailAddress || '', []],
      accessLevel: [  this.accessLevel || '', [Validators.required]],
      active: [  this.active || '', []],
    });
  }

  onSubmit(form: FormGroup) {
   if(form.valid) {
      if (this.data?.mode === 'edit') {
        form.value.wsid = "TESTWID";
        form.value.userName = this.userName;
        form.value.groupName = "",
          this.employeeService.updateAdminEmployee(form.value).subscribe((res: any) => {
            if (res.isExecuted) {
              this.dialog.closeAll();
              this.toastr.success(labels.alert.update, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
            }
            else {
              this.toastr.error(res.responseMessage, 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
            }
          });
      }
      else {
        this.employeeService.saveAdminEmployee(form.value)
          .subscribe((response: AdminEmployeeLookupResponse) => {
            if (response.isExecuted) {
              this.dialog.closeAll();
              this.toastr.success(labels.alert.success, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
              this.reloadCurrentRoute();
            }
            else {
              this.toastr.error(response.responseMessage, 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
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

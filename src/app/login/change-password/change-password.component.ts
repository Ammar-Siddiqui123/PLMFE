import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../app/login.service';
import labels from '../../labels/labels.json'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  old_toggle = true;
  new_toggle = true;
  toggle_password = true;
  resetPassForm: FormGroup;
  constructor(
    private fb: FormBuilder,  
    public loginService: LoginService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>
    ) { }

  ngOnInit(): void {
    this.resetPassForm = this.fb.group({
      userName: ['', Validators.required],
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    },{validator: this.passwordMatchValidator});
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['new_password'].value === frm.controls['confirm_password'].value ? null : {'mismatch': true};
  }
  onSend(form: FormGroup){
    console.log(form.value);
    let payload  = {
      "username": form.value.userName,
      "password":form.value.old_password,
      "newpassword":form.value.new_password   
    }
    this.loginService.changePassword(payload).subscribe((res) => {
      console.log(res);
      const { isExecuted } = res;
      if(isExecuted){
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.dialogRef.close();
      }
    })
    
  }

}

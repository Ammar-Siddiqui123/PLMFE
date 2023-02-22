import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProcessPutAwayService } from 'src/app/induction-manager/processPutAway.service';
import { AuthService } from 'src/app/init/auth.service';
import labels from '../../labels/labels.json';

@Component({
  selector: 'app-user-fields',
  templateUrl: './user-fields.component.html',
  styleUrls: ['./user-fields.component.scss']
})
export class UserFieldsComponent implements OnInit {

  public userData   : any;
  userForm          : FormGroup;

  constructor(public dialogRef                  : MatDialogRef<UserFieldsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog                    : MatDialog,
              public formBuilder                : FormBuilder,
              private authService               : AuthService,
              private toast                     : ToastrService,
              private service                   : ProcessPutAwayService) { 

    this.userForm = this.formBuilder.group({
      userField1    : new FormControl('', Validators.compose([])),
      userField2    : new FormControl('', Validators.compose([])),
      userField3    : new FormControl('', Validators.compose([])),
      userField4    : new FormControl('', Validators.compose([])),
      userField5    : new FormControl('', Validators.compose([])),
      userField6    : new FormControl('', Validators.compose([])),
      userField7    : new FormControl('', Validators.compose([])),
      userField8    : new FormControl('', Validators.compose([])),
      userField9    : new FormControl('', Validators.compose([])),
      userField10   : new FormControl('', Validators.compose([])),
    });

  }

  ngOnInit(): void {
    this.setValues();
  }

  setValues() {

    this.userForm.patchValue({
      userField1     : this.data.userField1,
      userField2     : this.data.userField2,
      userField3     : this.data.userField3,
      userField4     : this.data.userField4,
      userField5     : this.data.userField5,
      userField6     : this.data.userField6,
      userField7     : this.data.userField7,
      userField8     : this.data.userField8,
      userField9     : this.data.userField9,
      userField10    : this.data.userField10
    });

  }

  submit() {
    try {

      const values = this.userForm.value;

      var payload = { 
        "transaction": this.data.id,
        "userFields": [
          values.userField1,
          values.userField2,
          values.userField3,
          values.userField4,
          values.userField5,
          values.userField6,
          values.userField7,
          values.userField8,
          values.userField9,
          values.userField10
        ],
        "username": this.userData.userName,
        "wsid": this.userData.wsid 
      }
      
      this.service.create(payload, '/Common/UserFieldMTSave').subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            this.dialogRef.close();
            this.toast.success(labels.alert.update, 'Success!',{
              positionClass: 'toast-bottom-right',
              timeOut:2000
            });            
          } else {
            this.toast.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => { }
      );
    } catch (error) {
      console.log(error);
    }
  }

}

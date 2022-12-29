import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../../app/employee.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-clone-group',
  templateUrl: './clone-group.component.html',
  styleUrls: ['./clone-group.component.scss']
})
export class CloneGroupComponent implements OnInit {
  cloneForm: FormGroup;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private toastr: ToastrService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.cloneForm = this.fb.group({
      group_name: ['', [Validators.required]]
    })
  }

  hasError(fieldName: string, errorName: string) {
    return this.cloneForm.get(fieldName)?.touched && this.cloneForm.get(fieldName)?.hasError(errorName);
  }

  onSend(form: any) {
    let payload = {
      "clonegroupname": this.data.grp_data.groupName,
      "newgroupname": form.value.group_name
    }
    this.employeeService.cloneGroup(payload).subscribe((res:any) => {
      if(res.isExecuted){
        this.dialog.closeAll();
        this.toastr.success(labels.alert.update, 'Success!',{
          positionClass: 'toast-bottom-right',
          timeOut:2000
       });
      }
      else{
        this.toastr.error(res.responseMessage, 'Error!',{
          positionClass: 'toast-bottom-right',
          timeOut:2000
       });

      }
 }); 
  }

}

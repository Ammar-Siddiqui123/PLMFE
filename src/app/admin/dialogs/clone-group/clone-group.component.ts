import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomValidatorService } from '../../../../app/init/custom-validator.service'; 
import labels from '../../../labels/labels.json';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-clone-group',
  templateUrl: './clone-group.component.html',
  styleUrls: []
})
export class CloneGroupComponent implements OnInit {
  @ViewChild('grp_name') grp_name: ElementRef;
  cloneForm: FormGroup;
  isValidForm: boolean = true;
  constructor(
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialog: MatDialog, 
    private toastr: ToastrService, 
    private employeeService: ApiFuntions,
    private cusValidator: CustomValidatorService
    
    ) { }

  ngOnInit(): void {
    this.cloneForm = this.fb.group({
      group_name: ['', [Validators.required,this.noWhitespaceValidator, this.cusValidator.specialCharValidator]]
    })
  }
  ngAfterViewInit() {
    this.grp_name.nativeElement.focus();
  }
  hasError(fieldName: string, errorName: string) {
    return this.cloneForm.get(fieldName)?.touched && this.cloneForm.get(fieldName)?.hasError(errorName);
  }

  public noWhitespaceValidator(control: FormControl) {
    return control.value.trim() === '' ? { 'whitespace': true } : false;
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

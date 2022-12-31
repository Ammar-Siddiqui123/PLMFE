import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  form_heading: string = 'Add New Zone';
  form_btn_label: string = 'Add';
  startLocation:any;
  endLocation:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private employeeService: EmployeeService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  onSend(form: NgForm){
    form.value.username = this.data.userName;
    this.employeeService.insertEmployeeLocation(form.value).subscribe((res:any) => {
      if(res.isExecuted){
        this.dialog.closeAll();
        this.toastr.success(labels.alert.update, 'Success!',{
          positionClass: 'toast-bottom-right',
          timeOut:2000
       });
      }else{
        this.toastr.error(res.responseMessage, 'Error!',{
          positionClass: 'toast-bottom-right',
          timeOut:2000
       });
      }
 });
  }

}

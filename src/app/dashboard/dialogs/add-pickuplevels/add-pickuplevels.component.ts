import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import labels from '../../../labels/labels.json';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-add-pickuplevels',
  templateUrl: './add-pickuplevels.component.html',
  styleUrls: ['./add-pickuplevels.component.scss']
})
export class AddPickuplevelsComponent implements OnInit {

  form_heading: string = 'Add Pick Label';
  form_btn_label: string = 'Add';
  levelId:any;
  startShelf:any;
  endShelf:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private employeeService: EmployeeService, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  onSend(form: NgForm){
    form.value.username = "1234";
    form.value.wsid = "TESTWID";
    this.employeeService.insertPickLevels(form.value).subscribe((res:any) => {
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

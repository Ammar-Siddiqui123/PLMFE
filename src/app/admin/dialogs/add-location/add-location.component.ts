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

  form_heading: string = '';
  form_btn_label: string = '';
  startLocation:any;
  endLocation:any;

  startLocationList: any;
  endLocationList: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private employeeService: EmployeeService, private toastr: ToastrService) {}

  ngOnInit(): void {
    if(this.data.locationData){
      this.endLocation =  this.data.locationData.endLocation;
      this.startLocation =  this.data.locationData.startLocation;

      this.form_heading = 'Update New Location';
      this.form_btn_label = 'Update';

    } else {
      this.form_heading = 'Add New Location';
      this.form_btn_label = 'Add';
    }
    
  }

  getstartLocationList(){
    let payload = {
      "query":  this.startLocation,
      "unique": true,
      "username": this.data.userName,
      "wsid": "TESTWSID"
    }
    this.employeeService.getLocationList('/Common/LocationBegin',payload).subscribe((res:any) => {
      if(res.isExecuted){
        this.startLocationList = res.data;
      }
    })
  }
  getendLocationList(){
    if(this.startLocation){
    let payload = {
      "query":  this.endLocation,
      "beginLocation": this.startLocation,
      "unique": true,
      "username": this.data.userName,
      "wsid": "TESTWSID"
    }
    this.employeeService.getLocationList('/Common/LocationEnd',payload).subscribe((res:any) => {
      if(res.isExecuted){
        this.endLocationList = res.data;
      }
    })
  }
  }

  onSend(form: NgForm){
    let payload = {
      "startLocation": this.startLocation,
      "endLocation": this.endLocation,   
      "oldStartLocation":  this.data.locationData?.startLocation ?? '',    
      "oldEndLocation": this.data.locationData?.endLocation ?? '',
      "username": this.data.userName,
      "wsid": "TESTWSID"
    }
    if(this.data.locationData){
      this.employeeService.updateEmployeeLocation(payload).subscribe((res:any) => {
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
    }else{
      this.employeeService.insertEmployeeLocation(payload).subscribe((res:any) => {
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

}

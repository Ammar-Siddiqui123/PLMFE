import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {
  form_heading: string = 'Add New Zone';
  form_btn_label: string = 'Add';
  zone:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private employeeService: EmployeeService) {}

  ngOnInit(): void {
  }

  onSend(form: NgForm){
    console.log(form.value);
    
  }

}

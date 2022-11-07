import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import labels from '../../../labels/labels.json';

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

  toggle_password = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
  }

  onSend(form: NgForm){
    if(form.status === 'INVALID')
    {
      // display error in your form
    }else{
        console.log(form.value)
        this.dialog.closeAll(); // Close opened diaglo
      // do whatever you want to do with your data

      this.toastr.success(labels.alert.success, 'Success!');
    }

  }

}

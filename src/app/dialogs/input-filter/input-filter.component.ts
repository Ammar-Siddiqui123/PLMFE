import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
//import { CustomValidatorService } from '../../../../app/init/custom-validator.service';
//import { EmployeeService } from '../../../../app/employee.service';
//import labels from '../../../labels/labels.json';


@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss']
})
export class InputFilterComponent implements OnInit {
  InputFiltersForm: FormGroup;
  text1:any
  text2:any
  SendData: any
  condition:any
  columnName:any
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    // console.log(this.data);
    console.log(this.data.Column);
    this.condition = this.data.Condition;
    this.columnName = this.data.FilterColumnName;
  }
  onSend(form?: any) {
    if(this.data.Condition == "is between" && this.data.TypeOfElement == 'date')
    {
         this.SendData = "'" + this.text1 + "'" + " and " +  "'" + this.text2 + "'";
    }
    else if(this.data.Condition == "is between" && this.data.TypeOfElement == 'number')
    {
      this.SendData = this.text1 + " and " + this.text2;
    }
    else
    {
          this.SendData = this.text1;
    }
    const dictionary = {
      'SelectedItem':  this.SendData,
      'SelectedColumn': this.data.FilterColumnName,
      'Condition':this.data.Condition,
      'Type' : this.data.TypeOfElement
    };
    this.dialogRef.close(dictionary);
  }
}
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-function-allocation',
  templateUrl: './function-allocation.component.html',
  styleUrls: ['./function-allocation.component.scss']
})
export class FunctionAllocationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog, 
    private toastr: ToastrService, 
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<FunctionAllocationComponent>
    ) { }
 
  ngOnInit(): void {
  }

  onConfirmAdd(){
    this.dialogRef.close(this.data);
  }
}

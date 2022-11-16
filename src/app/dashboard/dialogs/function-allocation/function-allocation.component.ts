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
  dialog_msg: string = '';
  btn_label = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog, 
    private toastr: ToastrService, 
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<FunctionAllocationComponent>
    ) { }
 
  ngOnInit(): void {
    console.log(this.data?.target);
    
    if(this.data?.target === 'assigned') {this.dialog_msg = 'Are you sure you want to add ?'; this.btn_label = 'Add'} ;
    if(this.data?.target === 'unassigned') {this.dialog_msg = 'Are you sure you want to remove ?'; this.btn_label = 'Remove'} ;
    
  }
  onConfirmAdd(){
    this.dialogRef.close(this.data);
  }
}

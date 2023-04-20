import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-sr-delete-order',
  templateUrl: './sr-delete-order.component.html',
  styleUrls: ['./sr-delete-order.component.scss']
})
export class SrDeleteOrderComponent implements OnInit {

  confrimDelete: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SrDeleteOrderComponent>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onConfirmdelete(){
    this.dialog.closeAll();
    this.dialogRef.close(this.data);
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/common/services/global.service';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-cm-print-options',
  templateUrl: './cm-print-options.component.html',
  styleUrls: ['./cm-print-options.component.scss']
})
export class CmPrintOptionsComponent implements OnInit {

  preview:any;
  orderNumber:any;
  packListSort:any;
  public userData: any;
  printType:any = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CmPrintOptionsComponent>,
    public router: Router,
    private global:GlobalService,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.preview = this.data?.preview;
    this.orderNumber = this.data?.orderNumber;
    this.packListSort = this.data?.packListSort;
  }

  submit(){
    if(this.printType == "new"){
      this.printNewLines();
    }
    else{
      this.printAllLines();
    }
  }

  printNewLines(){
    if(this.preview){
      this.global.Print(`FileName:PrintPrevCMPackList|OrderNum:${this.orderNumber}|Where:where|OrderBy:${this.packListSort}|WSID:${this.userData.wsid}`);
     }
    else{
      this.global.Print(`FileName:PrintPrevCMPackList|OrderNum:${this.orderNumber}|Where:where|OrderBy:${this.packListSort}|WSID:${this.userData.wsid}`);
    }
  }

  printAllLines(){
    if(this.preview){
      this.global.Print(`FileName:PrintPrevCMPackList|OrderNum:${this.orderNumber}|Where:all|OrderBy:${this.packListSort}|WSID:${this.userData.wsid}`);
    }
    else{
      this.global.Print(`FileName:PrintPrevCMPackList|OrderNum:${this.orderNumber}|Where:all|OrderBy:${this.packListSort}|WSID:${this.userData.wsid}`);
    }
  }

}

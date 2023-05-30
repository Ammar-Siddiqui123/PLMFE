import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationAssignmentService } from '../../location-assignment/location-assignment.service';
import { AuthService } from 'src/app/init/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-la-location-assignment-quantities',
  templateUrl: './la-location-assignment-quantities.component.html',
  styleUrls: ['./la-location-assignment-quantities.component.scss']
})
export class LaLocationAssignmentQuantitiesComponent implements OnInit {

  public userData:any;
  public totalCount:any;
  public count:any;
  public pick:any;
  public putaway:any;
  public listLabel:any;
  public listLabelFPZ:any;
  

  constructor(private dialog: MatDialog,
             @Inject(MAT_DIALOG_DATA) public data: any,
             private locationService: LocationAssignmentService,
             private authservice : AuthService,
             public dialogRef: MatDialogRef<any>,
             private router: Router,
             private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.userData = this.authservice.userData()
    this.getTotalValues()
  }

  getTotalValues(){
    this.totalCount = this.data.totalCount;
    this.count = this.data.totalCount[0].count;
    this.pick = this.data.totalCount[1].count;
    this.putaway = this.data.totalCount[2].count;
  }

  viewOrderSelection(event:any,index?){
    
    this.locationService.getAll('/Admin/GetLocAssCountTable').subscribe((res:any)=>{
      if(res.isExecuted){
        res.data.tabIndex = index
        this.dialogRef.close(res.data);  
      }
      else{
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        })
      }
      
    })
  }

  printShortage(){
    let payload = {
      "userName" : this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.locationService.get(payload,'/Admin/PreviewLocAssignmentPickShort').subscribe((res:any)=>{
      this.listLabel = res.data;
    })
  }

  printShortageZone(){
    let payload = {
      "userName" : this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.locationService.get(payload,'/Admin/PreviewLocAssignmentPickShortFPZ').subscribe((res:any)=>{
      this.listLabelFPZ = res.data;
    })
  }

  exitBack(){
    this.dialogRef.close();
    // this.dialog.closeAll();
    this.router.navigate([]).then((result) => {
      window.open(`/#/admin`, '_self');
    });
  }
}
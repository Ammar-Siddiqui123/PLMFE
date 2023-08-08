import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/init/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-la-location-assignment-quantities',
  templateUrl: './la-location-assignment-quantities.component.html',
  styleUrls: ['./la-location-assignment-quantities.component.scss']
})
export class LaLocationAssignmentQuantitiesComponent implements OnInit {

  public userData:any;
  public totalCount:any;
  public count:any = 0
  public pick:any = 0
  public putaway:any = 0
  public listLabel:any;
  public listLabelFPZ:any;
  

  constructor(private dialog: MatDialog,
             @Inject(MAT_DIALOG_DATA) public data: any,
             private Api: ApiFuntions,
             private authservice : AuthService,
             public dialogRef: MatDialogRef<any>,
             private router: Router,
             private toastr: ToastrService, 
             ) { }

  ngOnInit(): void {
    this.userData = this.authservice.userData()
    this.getTotalValues()
  }

  getTotalValues(){
    this.totalCount = this.data.totalCount;

    this.totalCount.forEach(item => {
      if (item.transactionType === "Count") {
        this.count = item.count;
      } else if (item.transactionType === "Pick") {
        this.pick = item.count;
      } else if (item.transactionType === "Put Away") {
        this.putaway = item.count;
      }
    });

    // this.count = this.data.totalCount[0].count;
    // this.pick = this.data.totalCount[1].count;
    // this.putaway = this.data.totalCount[2].count;
  }

  viewOrderSelection(event:any,index?){
    
    this.Api.GetLocAssCountTable().subscribe((res:any)=>{
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
    window.open(`/#/report-view?file=FileName:PreviewLocAssPickShort`, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0')
    // window.open(`/#/report-view?file=FileName:PreviewLocAssPickShort`, '_blank', "location=yes");
  }

  printShortageZone(){
    window.open(`/#/report-view?file=FileName:PreviewLocAssPickShortFPZ`, '_blank', 'width=' + screen.width + ',height=' + screen.height + ',toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0')
    // window.open(`/#/report-view?file=FileName:PreviewLocAssPickShortFPZ`, '_blank', "location=yes");
  }

  exitBack(){
    this.dialogRef.close();
    // this.dialog.closeAll();
    this.router.navigate([]).then((result) => {
      window.open(`/#/admin`, '_self');
    });
  }
}

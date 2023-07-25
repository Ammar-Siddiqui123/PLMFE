import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QueryParams } from 'angular-routing';
import { CrAddNewCustomReportComponent } from 'src/app/dialogs/cr-add-new-custom-report/cr-add-new-custom-report.component';
import { CrDeleteConfirmationComponent } from 'src/app/dialogs/cr-delete-confirmation/cr-delete-confirmation.component';
import { CrEditDesignTestDataComponent } from 'src/app/dialogs/cr-edit-design-test-data/cr-edit-design-test-data.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-custom-reports-and-labels',
  templateUrl: './custom-reports-and-labels.component.html',
  styleUrls: ['./custom-reports-and-labels.component.scss']
})
export class CustomReportsAndLabelsComponent implements OnInit {
  Detail:any = {};
  ListReports:any = [];
  reportTitles:any = [];
  IsSystemReport:boolean = true;
  sysTitles:any = [];
  constructor(private api:ApiFuntions,private route:Router,private dialog: MatDialog) { }

  ngOnInit(): void {
  this.Getcustomreports();

  }
  ChangeReport(IsSysBolean:boolean){
    this.IsSystemReport = IsSysBolean;
    if(this.IsSystemReport == true) this.ListReports = this.sysTitles;
    else this.ListReports = this.reportTitles;
  }
  Getcustomreports(){
    this.api.Getcustomreports().subscribe((res:any)=>{
      this.sysTitles = res?.data?.reportTitles?.sysTitles;
      this.reportTitles = res?.data?.reportTitles?.reportTitles;
      this.ListReports = this.sysTitles;
    })
  }
  OpenListAndLabel(route){
    // localStorage.setItem("ListAndLandFile",this.Detail.fileName);
    this.route.navigateByUrl(`/${route}?file=${this.Detail.fileName.replace(".","-")}`);
  }
  Getreportdetails(file){ 
    var obj : any = {
      FileName:file
    }
    this.api.Getreportdetails(obj).subscribe((res:any)=>{
      this.Detail = res.data[0];
    })
  }

  openEditDesign() {
    const dialogRef = this.dialog.open(CrEditDesignTestDataComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
  }
  CrAddNewCustomReportDialogue() {
    const dialogRef = this.dialog.open(CrAddNewCustomReportComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
  }
  openDeleteDialogue() {
    const dialogRef = this.dialog.open(CrDeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
  }

}

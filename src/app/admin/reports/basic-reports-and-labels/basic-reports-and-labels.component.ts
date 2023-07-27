import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrChooseReportTypeComponent } from 'src/app/dialogs/br-choose-report-type/br-choose-report-type.component';
import { AuthService } from 'src/app/init/auth.service';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-basic-reports-and-labels',
  templateUrl: './basic-reports-and-labels.component.html',
  styleUrls: ['./basic-reports-and-labels.component.scss']
})
export class BasicReportsAndLabelsComponent implements OnInit {
  reports:any = [];
  fields:any = [];
  public userData: any;
  BasicReportModel:any = {};
  reportData:any = {};
  ELEMENT_DATA: any[] =[
    {order_no: '1202122'},
    {order_no: '1202122'},
    {order_no: '1202122'},
    {order_no: '1202122'},
    {order_no: '1202122'},
    {order_no: '1202122'}
  ]

    displayedColumns: string[] = ['fields','expression_type','value_to_test','actions'];
    tableData = this.ELEMENT_DATA
    dataSourceList:any

      
  constructor(private dialog: MatDialog,private api:ApiFuntions,private authService:AuthService,private route:Router) { 
    this.userData = this.authService.userData(); 
  }

  ngOnInit(): void {
    this.Getcustomreports();
  }
  Getcustomreports(){
    this.api.Getcustomreports().subscribe((res:any)=>{
      this.reports = res?.data?.reports; 
     
    })
  }
  basicreportdetails(Report){
   var payload:any = {
    report:Report,
    WSID:this.userData.wsid
    }
    this.api.basicreportdetails(payload).subscribe((res:any)=>{
        this.reportData = res?.data?.reportData; 
        this.fields = res?.data?.fields; 
      
    })
  }
  ReportFieldsExps(){
    var payload:any = {
     report:this.BasicReportModel.ChooseReport,
     wsid:this.userData.wsid,
     username:this.userData.userName,
     fields:[],
     exps:[]
    };
     for(let i = 0;i<6;i++){
      payload.fields.push(this.reportData[4+i]);
     }  
     for(let i = 0;i<6;i++){
      payload.exps.push(this.reportData[10+i]);
     }  
     debugger;
     this.api.ReportFieldsExps(payload).subscribe((res:any)=>{  
       
     })
   }
reportfieldvalues(){
  var payload:any = {
    report:this.BasicReportModel.ChooseReport,
    wsid:this.userData.wsid,
    username:this.userData.userName,
    V1:[] ,
    V2:[]
   };
    for(let i = 0;i<6;i++){
     payload.V1.push(this.reportData[16+i]);
    }   for(let i = 0;i<6;i++){
      payload.V2.push("");
     } 
     this.api.reportfieldvalues(payload).subscribe((res:any)=>{  
       
     })
   } 
ReportTitles(){
  var payload:any = {
    report:this.BasicReportModel.ChooseReport,
    wsid:this.userData.wsid,
    username:this.userData.userName,
    title:[]  
   };
    for(let i = 0;i<4;i++){
     payload.title.push(this.reportData[i]);
    }    
     this.api.ReportTitles(payload).subscribe((res:any)=>{  
       
     })
   } 
  BrChooseReportTypeDialogue() {
    const dialogRef = this.dialog.open(BrChooseReportTypeComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
  
  }
  OpenListAndLabel(){ 
    this.route.navigateByUrl(`/report-view?file=${this.BasicReportModel.ChooseReport.replace(/\s/g, "")+'-lst'}`);
  }
Remove(index){ 
  this.reportData[16+index] = "";
  this.reportData[4+index] = "";
  this.reportData[10+index] = ""; 
  this.ReportFieldsExps();
  this.reportfieldvalues();
  this.ReportTitles();
}
}

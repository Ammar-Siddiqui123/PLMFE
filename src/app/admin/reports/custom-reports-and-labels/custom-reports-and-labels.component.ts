import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private api:ApiFuntions,private route:Router) { }

  ngOnInit(): void {
  this.Getcustomreports();
  }
  
  Getcustomreports(){
    this.api.Getcustomreports().subscribe((res:any)=>{
      this.ListReports = res?.data?.reportTitles?.sysTitles;
    })
  }
  OpenListAndLabel(){
    localStorage.setItem("ListAndLandFile",this.Detail.fileName);
    this.route.navigateByUrl('/wrd');
  }
  Getreportdetails(file){ 
    var obj : any = {
      FileName:file
    }
    this.api.Getreportdetails(obj).subscribe((res:any)=>{
      this.Detail = res.data[0];
    })
  }
}

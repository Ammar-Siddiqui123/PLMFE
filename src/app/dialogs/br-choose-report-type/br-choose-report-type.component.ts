import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-br-choose-report-type',
  templateUrl: './br-choose-report-type.component.html',
  styleUrls: ['./br-choose-report-type.component.scss']
})
export class BrChooseReportTypeComponent implements OnInit {
  @ViewChild('exp_file') exp_file: ElementRef;
  Type:string;
  ExportFileName:string;
  constructor(public dialogRef: MatDialogRef<any>,    @Inject(MAT_DIALOG_DATA) public data: any) { 
    if(data.Name){
      this.ExportFileName  = data.Name;  
    }else{
      this.ExportFileName  = data.ReportName;  
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.exp_file.nativeElement.focus();
  }

  ExportSubmit(){
    this.dialogRef.close({ Type:this.Type,FileName:this.ExportFileName});
  }
  }

function BrChooseReportTypeDialogue() {
  throw new Error('Function not implemented.');
}


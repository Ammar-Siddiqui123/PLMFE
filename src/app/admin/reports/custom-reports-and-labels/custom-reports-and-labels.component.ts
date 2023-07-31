import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QueryParams } from 'angular-routing';
import { CrAddNewCustomReportComponent } from 'src/app/dialogs/cr-add-new-custom-report/cr-add-new-custom-report.component';
import { CrDeleteConfirmationComponent } from 'src/app/dialogs/cr-delete-confirmation/cr-delete-confirmation.component';
import { CrEditDesignTestDataComponent } from 'src/app/dialogs/cr-edit-design-test-data/cr-edit-design-test-data.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AlertConfirmationComponent } from 'src/app/dialogs/alert-confirmation/alert-confirmation.component';

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
  constructor(private api:ApiFuntions,private route:Router,private dialog: MatDialog, private toastr :ToastrService) { }

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
  SelectedFile:any;
  Getreportdetails(file){
    // debugger
     var olddetail = this.Detail; 
    if(this.SelectedFile == file){
      this.Detail = {};
      this.SelectedFile = null;
      return 1;
    }
    this.SelectedFile = file;
     var obj : any = {
      FileName:file
    }
    this.api.Getreportdetails(obj).subscribe((res:any)=>{
      this.Detail = res.data[0];
    })
    return 1;
    // this.Detail = ! this.Detail 
  }

  openEditDesign() {
    const dialogRef = this.dialog.open(CrEditDesignTestDataComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)  
      if(result && result != false)    
      this.Detail.testData = result
    }
    );
  }
  CrAddNewCustomReportDialogue() {
    const dialogRef = this.dialog.open(CrAddNewCustomReportComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
      data : {
        ListReports:this.ListReports
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
    if(result != true){
      console.log(result,'obj')
      console.log(this.IsSystemReport)      
      // this.ListReports.push({title:result.description, filename:result.filename})    
      console.log(this.ListReports)  
      // this.Getcustomreports()
    }
    }
    );
  }
  openDeleteDialogue() {
    // debugger
    const dialogRef = this.dialog.open(CrDeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result,'delete')   
      if(result == 'permanent' ||result == 'keep')  {
      
        let payload = {
          "filename": this.Detail.fileName,
          "keepFile": true,
          "wsid": "",
          "username": "",
          "contentRootPath": ""
        }
        this.api.deleteReport(payload).subscribe(res=>{
          if (!res.data) {
            this.toastr.error("Unexpected error occurred.  If this persists please contact Scott Tech for support.", 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
        } else {
          this.Getcustomreports()

        };
        })
      } 
    }
    );
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
debugger
    if (!file) {
      // No file selected, handle the case if needed
      return;
    }
    if(file.name){
      const formData = new FormData();
      formData.append('file', file);
  
  
      // Replace 'your_upload_endpoint' with the server's API endpoint to handle file upload
      this.api.importFile(formData).subscribe(
        (response) => {
          this.toastr.success(`File successfully uploaded`, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          // Handle the response from the server after file upload, if needed
          console.log(response);
        },
        (error) => {
          this.toastr.error(error, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
          // Handle error if the file upload fails
          console.error(error);
        }
      );
    }
    else{
      this.toastr.error(`Uploaded filename ${file.name} must match report filename ${this.Detail.fileName}`, 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
    }


  }

  pushReports(){
    const dialogRef = this.dialog.open(AlertConfirmationComponent, {
      height: 'auto',
      width: '500px',
      data: {
        message: 'Do you wish to give all workstations your version of this report?',
        heading: '',
      },
      autoFocus: '__non_existing_element__',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        let payload = {
          filename:this.Detail.fileName
        }
        this.api.pushReportChanges(payload).subscribe(res=>{
          console.log(res)
          if(res.isExecuted){
            this.toastr.success( `Changes have been successfully pushed to the other workstations`, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
          else{
            this.toastr.error( `Error has occured while pushing changes to the other worksations`, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        })
      }
      else{
        return
      }
    });
  }
}

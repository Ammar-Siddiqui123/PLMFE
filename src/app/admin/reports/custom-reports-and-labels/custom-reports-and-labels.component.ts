import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
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
  olddetail
  currentApp
  constructor(private api:ApiFuntions,private route:Router,private dialog: MatDialog, private toastr :ToastrService,private router: Router,) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let spliUrl=event.url.split('/');
        // console.log(spliUrl)

        if(spliUrl[1]=='admin'){
          this.currentApp = 'Admin'
        }
        else if(spliUrl[1]=='OrderManager'){
          this.currentApp = 'OM'
        }
        else if(spliUrl[1]=='InductionManager'){
          this.currentApp = 'IM'
        }
        else if(spliUrl[1]=='ConsolidationManager'){
          this.currentApp = 'CM'
        }
     }
      });
  }

  ngOnInit(): void {
  this.Getcustomreports();

  }
  ChangeReport(IsSysBolean:boolean){
    this.Detail = {}
    this.IsSystemReport = IsSysBolean;
    if(this.IsSystemReport == true) this.ListReports = this.sysTitles;
    else this.ListReports = this.reportTitles;
    console.log(this.ListReports)
  }
  Getcustomreports(){

    let payload = {
      'app':this.currentApp
    }
    this.api.Getcustomreports(payload).subscribe((res:any)=>{
      this.sysTitles = res?.data?.reportTitles?.sysTitles;
      this.reportTitles = res?.data?.reportTitles?.reportTitles;
      this.sysTitles.forEach((object) => {
        object.isSelected = false;
      });
      this.reportTitles.forEach((object) => {
        object.isSelected = false;
      });

      console.log(this.sysTitles)
      console.log(this.reportTitles)

      // this.ListReports = this.sysTitles;
      if(this.IsSystemReport == true || this.IsSystemReport == undefined) this.ListReports = this.sysTitles;
      else this.ListReports = this.reportTitles;
      
    })
  }
  OpenListAndLabel(route){
    // localStorage.setItem("ListAndLandFile",this.Detail.fileName);
    this.route.navigateByUrl(`/${route}?file=${this.Detail.fileName.replace(".","-")}`);
  }
  SelectedFile:any;

  Getreportdetails(file){
    console.log(file)

      this.olddetail = file; 
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
    // this.ListReports[index].isSelected=!this.ListReports[index].isSelected;
    return 1;
    // this.Detail = ! this.Detail 
  }

  openEditDesign() {
    const dialogRef = this.dialog.open(CrEditDesignTestDataComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
      data:this.Detail.testData
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)  
      if(result && result != false)    
      this.Detail.testData = result
      this.saveInput()
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
      
      this.Getcustomreports()
      // this.ChangeReport(this.IsSystemReport)
      this.Getreportdetails(result.filename)
    }
    }
    );
  }
  openDeleteDialogue() {
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
          "keepFile": result === 'keep' ? true : result === 'permanent' ? false : result,
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
          this.Detail= {}
          this.toastr.success(`File Deleted Successfully`, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });

        };
        })
      } 
    }
    );
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
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


  saveInput(){
    // if(this.Detail = {})return
    if(this.Detail.outputType == undefined) return
   let payload =  {
      "oldfilename": this.olddetail,
      "newfilename": this.Detail.fileName,
      "description":this.Detail.description ,
      "datasource": this.Detail.testData,
      "output": this.Detail.outputType,
      "testDataType": this.Detail.testDataType,
      "eFilename":this.Detail.exportFileName ,
    }

    this.api.updatereportDetails(payload).subscribe(res=>{
      // console.log(res)
      if(!res.isExecuted){
        this.toastr.error("Unexpected error occurred. Changes Not Saved", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    })
  }
}

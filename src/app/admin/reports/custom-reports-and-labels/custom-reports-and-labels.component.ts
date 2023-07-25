import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrAddNewCustomReportComponent } from 'src/app/dialogs/cr-add-new-custom-report/cr-add-new-custom-report.component';
import { CrDeleteConfirmationComponent } from 'src/app/dialogs/cr-delete-confirmation/cr-delete-confirmation.component';
import { CrEditDesignTestDataComponent } from 'src/app/dialogs/cr-edit-design-test-data/cr-edit-design-test-data.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

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
  
  Getcustomreports(){
    this.api.Getcustomreports().subscribe((res:any)=>{
      this.ListReports = res?.data?.reportTitles?.sysTitles;
    })
  }
  OpenListAndLabel(route){
    localStorage.setItem("ListAndLandFile",this.Detail.fileName);
    this.route.navigateByUrl(`/${route}`);
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

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (!file) {
      // No file selected, handle the case if needed
      return;
    }
    if(file.name == this.Detail.fileName){
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
}

import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrEditDesignTestDataComponent } from '../cr-edit-design-test-data/cr-edit-design-test-data.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { catchError, of } from 'rxjs';
import { AlertConfirmationComponent } from '../alert-confirmation/alert-confirmation.component';
import { CrDesignFilenameConfirmationComponent } from '../cr-design-filename-confirmation/cr-design-filename-confirmation.component';

@Component({
  selector: 'app-cr-add-new-custom-report',
  templateUrl: './cr-add-new-custom-report.component.html',
  styleUrls: ['./cr-add-new-custom-report.component.scss']
})
export class CrAddNewCustomReportComponent implements OnInit {
  @ViewChild('desc_focus') desc_focus: ElementRef;
  NewDescription
  NewFilename
  NewDesignTestData
  NewDesignDataType
  NewOutputType
  NewExportFilename
  listOfFileName
  appendstring
  AddNewColumns
  AddNewFilePresent = false
  RestoreAll = false
  CurrentFilename
  @ViewChildren('serialTemp') serialInputs: QueryList<any>;
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
               private api:ApiFuntions,
              private toastr :ToastrService,
              public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
     this.listOfFileName = this.data.ListReports
     console.log(this.listOfFileName)
  }
  ngAfterViewInit(): void {
    this.desc_focus.nativeElement.focus();
  }
  openEditDesign() {
    const dialogRef = this.dialog.open(CrEditDesignTestDataComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)      
      this.NewDesignTestData = result?result:this.NewDesignTestData
    }
    );
  }



  saveNew(){
    let  newParams = [
      this.NewDescription,
      this.NewFilename,
      this.NewDesignTestData,
      this.NewDesignDataType,
      this.NewOutputType,
      this.NewExportFilename,
  ];
  console.log(newParams)

  let fields = [
    'Description', 'Filename', 'Test and Design Data', 'Test/Design Data Type', 'Output Type'
    ]




  var valid = true;
  for (var x = 0; x < newParams.length - 1; x++) {
    newParams[x] == ''||newParams[x] == undefined
    // this.validateInputs();
      if (newParams[x] == ''||newParams[x] == undefined) {
        this.toastr.error(`${fields[x]} must not be left blank!`, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });
        valid = false;
        break;
      }
    }
      console.log(this.listOfFileName)

      const exists = this.isFileNameAlreadyExists(newParams[1]);
     
      if (exists) {
        this.toastr.error(`Filename must be unique!`, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });
        valid = false;
    };

    

    // have to convert later

    if(valid){
      
      this.api.validateNewDesign(newParams).subscribe((res=>{
        console.log(res)
        if(!res.data){
          this.toastr.error(`Validation for adding a new report failed with an unknown error.  Please contact Scott Tech for support if this persists.`, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
        else{
          this.appendstring = this.buildAppendString('File warnings:', res.data.fileObj.errs)
          this.appendstring += this.buildAppendString('SQL warnings:', res.data.sqlObj.errs)
        
          if(res.data.sqlObj.sqlError){
            this.appendstring += `There was an error with the stored procedure or sql string provided.  \
            Please ensure that the procedure contains only valid statements and only returns one result set.\
              If a stored procedure is provided it must contain either no parameters or acceptable defaults.`
          }

          let  resultSets = res.data.sqlObj.numResultSets;
          let  resultSetString = ''
          if (resultSets != 1) {
            resultSetString = `  Number of result sets found:${resultSets}.  ONE result set must be used.`
          }
          
          if(res.data.sqlObj?.columns){
            this.AddNewColumns = res.data.sqlObj.columns 
          }

          // this.AddNewColumns = this.buildAppendString('Columns in the first resultset:', res.data.sqlObj.columns) + resultSetString
         
          // if the file is present already we need to deal with it before we can continue
          if (res.data.fileObj.canAddFileToDefaultTable) {
            this.AddNewFilePresent = true
            this.RestoreAll = true
            this.CurrentFilename = newParams[1]
        } else if (res.data.fileObj.canAddFileToWSTable) {
          this.AddNewFilePresent = true
          this.RestoreAll = false
          this.CurrentFilename = newParams[1]
        }
        //  else we don't have a file already and we need to check that there are no errors that need to be dealt with
         else{
          this.AddNewFilePresent = false
          this.RestoreAll = false
          this.CurrentFilename = ''
          if(this.appendstring.length == 0){
            let  obj = {
              description: this.NewDescription,
              filename: this.NewFilename,
              dataSource: this.NewDesignTestData,
              dataType:  this.NewDesignDataType,
              outputType:  this.NewOutputType == 'Report' ? 2 : 1,
              exportFilename: this.NewExportFilename,
              // appName: $('#AppName').val()
          };

          this.api.getLLDesignerNewDesign(obj).pipe(
            catchError((error) => {
              // Handle the error here
              this.toastr.error("An error occured while retrieving data.", 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
              // Return a fallback value or trigger further error handling if needed
              return of({ isExecuted: false });
            })
          ).subscribe((res=>{
            this.toastr.success(res.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }))
          }
        }
        }
      }))
    }




  }


  restoreDesign(filename, all?){
    // debugger
    console.log(filename)
    // if (filename == '' ||filename == undefined  ) { return; };
    let  obj = {
      description: this.NewDescription,
      filename: this.NewFilename,
      dataSource: this.NewDesignTestData,
      dataType:  this.NewDesignDataType,
      outputType:  this.NewOutputType == 'Report' ? 2 : 1,
      exportFilename: this.NewExportFilename,
      all:all?all:''
      // appName: $('#AppName').val()
  };
  this.api.restoreDesign(obj).subscribe(res=>{
    console.log(res)
    if(!res.data){
      this.toastr.error("Unknown error occurred during design restoration.  Please contact Scott Tech for support if this persists.", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else{
      // remaining
      this.dialogRef.close(obj);

    }
  })                          
  }

  DeleteExistingdesign(){
    const dialogRef = this.dialog.open(AlertConfirmationComponent, {
      height: 'auto',
      width: '560px',
      data: {
        message: `Click OK to permanently delete the design file.`,
      },
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(!result){
        return
      }else{
        let payload = {
          filename:this.CurrentFilename
        }
        this.api.deleteReport(payload).subscribe(res=>{
          if (!res.data) {
            this.toastr.error("Unknown error occurred during design restoration.  Please contact Scott Tech for support if this persists.", 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
        } else {
          this.saveNew()
        };
        })
      }

  }
    )
}

  isFileNameAlreadyExists(fileName: string): boolean {
    return this.listOfFileName.some((item) => {
      const extractedValue: string = item.filename.split('.')[0];
     return(extractedValue === fileName) 
    });
  }

  buildAppendString(title, errors) {
    var appendstring = '';
    if (errors.length > 0) {
        appendstring +=  title ;
        for (var y = 0; y < errors.length; y++) {
            appendstring +=   errors[y] ;
        };
    };
    return appendstring;
};

validateInputs() {
  this.serialInputs.forEach(input => {
    input.nativeElement.focus(); // This will force Angular to validate each input
  });
}

 setNoExtension(element) {
  var value = element
  var extensionIndex = value.indexOf('.');
  if (extensionIndex != -1) {
      element = value.substring(0, extensionIndex)
  };
};

  setExtension() {
  // this.setNoExtension(this.NewFilename);
  if(this.NewFilename.includes('.lst')||this.NewFilename.includes('.lbl')){
    let extensionIndex = this.NewFilename.indexOf('.')
    this.NewFilename = this.NewFilename.slice(0,extensionIndex)
  }
  if (this.NewOutputType == 'Report' && this.NewFilename != '' ) {
    this.NewFilename = `${this.NewFilename}.lst`
  } else if (this.NewFilename != '' && this.NewOutputType == 'Label') {
      this.NewFilename = `${this.NewFilename}.lbl`
  };
};


  // ["Testing Description",
  // "TestFilename.lst",
  // "Select [OT Report Data BM].* FROM [OT Report Data BM];",
  // "SQL",
  // "Report",
  // "TestingExportFileName"]


  openCrDesignFilenameConfirmation() {
    const dialogRef = this.dialog.open(CrDesignFilenameConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)      
      this.NewDesignTestData = result?result:this.NewDesignTestData
    }
    );
  }

}

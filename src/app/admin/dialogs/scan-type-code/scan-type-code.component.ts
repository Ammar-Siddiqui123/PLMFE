import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintRangeComponent } from '../print-range/print-range.component';
import { ToastrService } from 'ngx-toastr'; 
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'; 
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-scan-type-code',
  templateUrl: './scan-type-code.component.html',
  styleUrls: ['./scan-type-code.component.scss']
})
export class ScanTypeCodeComponent implements OnInit {
  @ViewChildren('scan_code_type', { read: ElementRef }) scan_code_type: QueryList<ElementRef>;

  public scanTypeCode_list: any;
  public scanTypeCode_list_Response: any;
  public userData: any;


  constructor(private dialog: MatDialog,
    private Api: ApiFuntions, 
              private authService: AuthService,
              private toastr: ToastrService,
              private renderer: Renderer2,
              public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getScanCodeType()
  }
  getScanCodeType(){
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.Api.ScanCodeTypes().subscribe((res) => {
      if (res.isExecuted) {
        this.scanTypeCode_list_Response = [...res.data];
        this.scanTypeCode_list = res.data;
        setTimeout(() => {
          const inputElements = this.scan_code_type.toArray();
          const inputElement = inputElements[0].nativeElement as HTMLInputElement;
            this.renderer.selectRootElement(inputElement).focus();
        }, 100);
  
      }

    });
  }

  addUMRow(row : any){
    this.scanTypeCode_list.unshift("");
    const lastIndex = this.scanTypeCode_list.length - 1;
    setTimeout(() => {
      const inputElements = this.scan_code_type.toArray();
      if (inputElements.length > lastIndex) {
        const inputElement = inputElements[0].nativeElement as HTMLInputElement;
        this.renderer.selectRootElement(inputElement).focus();
      }
    });
  }

  saveScanCodeType(newScanCode : any, oldScanCode  : any) {

    let cond = true;
    this.scanTypeCode_list_Response.forEach(element => {
      if(element.toLowerCase() == newScanCode.toLowerCase() ) {
        cond = false;
       this.toastr.error('Already Exists', 'Error!', {
         positionClass: 'toast-bottom-right',
         timeOut: 2000
       });
       return;
      }   
    });

    if(newScanCode && cond){
    let paylaod = {      
      "oldScanCodeType": oldScanCode.toString()  ,
      "scanCodeType": newScanCode,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    
    this.Api.CodeTypeSave(paylaod).subscribe((res) => {
      if(res.isExecuted){
        this.getScanCodeType();
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
  
    });
  } else {
    this.toastr.error('Scan Codes cannot be empty', 'Error!', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000
    });
  }
  }

  dltScanTypeCode(newScanTypeCode : any) {

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        message: 'Click OK to delete Scan Type ' + newScanTypeCode,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        if(newScanTypeCode){
          let paylaod = {
            "scanCodeType": newScanTypeCode,
            "username": this.userData.userName,
            "wsid": this.userData.wsid,
          }
          
          this.Api.ScanCodeTypeDelete(paylaod).subscribe((res) => {
            if(res.isExecuted){
              this.getScanCodeType();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
          });
        } else {
          this.scanTypeCode_list.shift();
        }
      }
    });
    
  }

  selectScanTypeCode(selectedrecord: any){

    let notselected = true;
    this.scanTypeCode_list_Response.forEach(element => {
      if(element.toLowerCase() == selectedrecord.toLowerCase() ) {
        notselected = false;
        this.dialogRef.close(selectedrecord);
       return;
      }   
    });
    if(notselected){
      this.toastr.error('Please save the record first.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }

  }

  clearScanTypeCode(){
    this.dialogRef.close('');
  }

}
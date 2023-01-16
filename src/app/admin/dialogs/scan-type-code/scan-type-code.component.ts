import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintRangeComponent } from '../print-range/print-range.component';
import { ToastrService } from 'ngx-toastr';
import { UnitOfMeasureService } from 'src/app/common/services/unit-measure.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json';
import { InventoryMasterService } from '../../inventory-master/inventory-master.service';

@Component({
  selector: 'app-scan-type-code',
  templateUrl: './scan-type-code.component.html',
  styleUrls: ['./scan-type-code.component.scss']
})
export class ScanTypeCodeComponent implements OnInit {

  public scanTypeCode_list: any;
  public userData: any;


  constructor(private dialog: MatDialog,
    private invMasterService: InventoryMasterService, 
              private authService: AuthService,
              private toastr: ToastrService,
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
    this.invMasterService.get(paylaod, '/Common/ScanCodeTypes').subscribe((res) => {
      if (res.isExecuted) {
        this.scanTypeCode_list = res.data;
      }
    });
  }

  addUMRow(row : any){
    this.scanTypeCode_list.unshift("");
  }

  saveScanCodeType(newScanCode : any, oldScanCode  : any) {

    let cond = true;
    this.scanTypeCode_list.forEach(element => {
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
      "oldScanCodeType": newScanCode ,
      "scanCodeType": oldScanCode.toString(),
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    
    this.invMasterService.get(paylaod, '/Common/CodeTypeSave').subscribe((res) => {
      if(res.isExecuted){
        this.getScanCodeType();
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
  
    });
  }
  }

  dltScanTypeCode(newScanTypeCode : any) {
    if(newScanTypeCode){
    let paylaod = {
      "scanCodeType": newScanTypeCode,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    
    this.invMasterService.get(paylaod,'/Common/ScanCodeTypeDelete').subscribe((res) => {
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

  selectScanTypeCode(selectedrecord: any){
    this.dialogRef.close(selectedrecord);
  }

  clearScanTypeCode(){
    this.dialogRef.close('');
  }

}
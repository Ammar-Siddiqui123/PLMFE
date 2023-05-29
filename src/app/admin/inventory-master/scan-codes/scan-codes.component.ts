import { Component, OnInit, TemplateRef, ViewChild,Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { InventoryMasterService } from '../inventory-master.service';
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import labels from '../../../labels/labels.json'
import { ScanTypeCodeComponent } from '../../dialogs/scan-type-code/scan-type-code.component';
import { CustomValidatorService } from '../../../../app/init/custom-validator.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-scan-codes',
  templateUrl: './scan-codes.component.html',
  styleUrls: ['./scan-codes.component.scss']
})
export class ScanCodesComponent implements OnInit , OnChanges {

  @Input() scanCodes: FormGroup;
  public userData: any;
  scanCodesList: any;
  disableButton=false;
  scanTypeList: any = [];
  scanRangeList: any =['Yes', 'No'];
  isAddRow=false;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  sendNotification(e?) {
    this.notifyParent.emit(e);
  }
  

  constructor( private invMasterService: InventoryMasterService, private sharedService:SharedService,
    private authService: AuthService, private toastr: ToastrService,  private dialog: MatDialog,private cusValidator: CustomValidatorService) {

    this.userData = this.authService.userData();
 //   this.getScanTypeList();

  }

  // getScanTypeList(){
  //   let paylaod = {
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid,
  //   }
  //   this.invMasterService.get(paylaod, '/Common/ScanCodeTypes').subscribe((res: any) => {
  //     if (res.isExecuted) {
  //       this.scanTypeList = res.data;
  //     }
  //   })
  // }
  ngOnChanges(changes: SimpleChanges) {
      this.scanCodesList = [...this.scanCodes.controls['scanCode'].value];
  }


  numberOnly(event): boolean {

    return this.cusValidator.numberOnly(event);

  }

  handleInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = parseFloat(inputElement.value);
    let limit = inputElement.value.trim();

    if (value < 0) {
      value = 0; // Or any other desired behavior when a negative value is entered
      inputElement.value = value.toString();
    }
    if (limit.length > 9) {
      limit = limit.slice(0, 9);
      inputElement.value = limit;
    }
    this.sharedService.updateInvMasterState(event,true)
  }

  ngOnInit(): void {
  }

  openPrintRangeDialog(){

  }
  addCatRow(e: any){
    this.isAddRow=true
    this.scanCodesList.unshift({scanCode: '', scanType: '', scanRange: 'No', startPosition:0, codeLength:0,isDisabled:true})

  }

  dltCategory(item){


    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
     if(result === 'Yes'){
      if(item.scanCode){
        let paylaod = {
          "itemNumber": this.scanCodes.controls['itemNumber'].value,
          "scanCode": item.scanCode,
          "scanType": item.scanType,
          "scanRange": item.scanRange,
          "startPosition": item.startPosition,
          "codeLength": item.codeLength,
          "username": this.userData.userName,
          "wsid": this.userData.wsid,
        }
        this.invMasterService.get(paylaod, '/Admin/DeleteScanCode').subscribe((res: any) => {
          if (res.isExecuted) {
            this.isAddRow=false
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.refreshScanCodeList();
          } else{
            
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      } else{
        this.isAddRow=false
        this.scanCodesList.shift();
      }
     }
    })








   
  }

  saveCategory(item, scanCode, startPosition, codeLength, scanRange, scanType){
    let newRecord = true;
    if(scanCode=='') {
      this.toastr.error('Scan code not saved, scan code field must not be empty.', 'Alert!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }
    if(startPosition=='') {
      this.toastr.error('Scan code not saved,Start position field must be an integer.', 'Alert!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }
    if(codeLength=='') {
      this.toastr.error('Scan code not saved, Scan code field must not be empty..', 'Alert!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }
    this.scanCodes.controls['scanCode'].value.forEach(element => {
      if(element.scanCode== scanCode  ){
        newRecord = false;
        return;
      }
    });

    if(!newRecord && item.scanCode=='' ){
      this.toastr.error('Already Exists', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }

    else if(newRecord){
    let paylaod = {
      "itemNumber": this.scanCodes.controls['itemNumber'].value,
      "scanCode": scanCode,
      "scanType": scanType,
      "scanRange": scanRange,
      "startPosition": startPosition,
      "codeLength": codeLength,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/InsertScanCodes').subscribe((res: any) => {
      if (res.isExecuted) {
        this.isAddRow=false
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.refreshScanCodeList();
        this.sendNotification();
      } else{
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    })
  } else if (item.scanCode!='') {
    
    let paylaod = {
      "itemNumber": this.scanCodes.controls['itemNumber'].value,
      "oldScanCode": item.scanCode,
      "scanCode": scanCode,
      "scanType": scanType,
      "oldScanRange": item.scanRange,
      "scanRange": scanRange,
      "oldStartPosition": item.startPosition,
      "newStartPosition": startPosition,
      "oldCodeLength": item.codeLength,
      "newCodeLength": codeLength,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/UpdateScanCodes').subscribe((res: any) => {
      if (res.isExecuted) {
        this.isAddRow=false
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.refreshScanCodeList();
      }else{
        this.toastr.error('Already Exists', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    })
  }
  }
  
  changeScanType(e){
  
  }
  changeScanRange(item){
    if(item.scanRange == 'No'){
      item.startPosition = 0
      item.codeLength = 0
    }
    this.sharedService.updateInvMasterState(item,true)
  }

  refreshScanCodeList(){
    let paylaod = {
      "itemNumber": this.scanCodes.controls['itemNumber'].value,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/RefreshScanCodes').subscribe((res: any) => {
      if (res.isExecuted) {

        this.scanCodes.controls['scanCode'].setValue([...res.data]);
           res.data=res.data.map(item=>{
          return { ...item, isDisabled: true };
        })
        this.scanCodesList = res.data;
      }
    })
  }


  openScanTypePopup(item){
    let dialogRef = this.dialog.open(ScanTypeCodeComponent, {
      height: 'auto',
      width: '750px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      item.scanType = result
      this.sharedService.updateInvMasterState(result,true)
    }

    })
  }
  handleInputChangeInput(event: any) {
    this.sharedService.updateInvMasterState(event,true)
  }
}

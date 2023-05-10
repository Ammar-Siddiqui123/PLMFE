import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { OrderManagerService } from 'src/app/order-manager/order-manager.service';
import labels from '../../labels/labels.json';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-om-add-record',
  templateUrl: './om-add-record.component.html',
  styleUrls: ['./om-add-record.component.scss']
})
export class OmAddRecordComponent implements OnInit {

  userData: any;
  userFieldData: any = {};
  oTTempUpdatePayload: any = {
    "id": 0,
    "orderNumber": "",
    "transType": "",
    "warehouse": "",
    "itemNumber": "",
    "description": "",
    "unitofMeasure": "",
    "transQty": 1,
    "lineNumber": 0,
    "priority": 0,
    "requiredDate": "",
    "hostTransID": "",
    "emergency": false,
    "label": false,
    "lotNumber": "",
    "expirationDate": "",
    "serialNumber": "",
    "revision": "",
    "batchPickID": "",
    "toteID": "",
    "cell": "",
    "notes": "",
    "userField1": "",
    "userField2": "",
    "userField3": "",
    "userField4": "",
    "userField5": "",
    "userField6": "",
    "userField7": "",
    "userField8": "",
    "userField9": "",
    "userField10": "",
    "inProcess": false,
    "processBy": "",
    "importBy": "",
    "importDate": "",
    "importFileName": "Create Pending Transaction",
    "wsid": "TESTWSID"
  };
  transactionTypes: any = [
    { value: 'Pick', title: 'Pick' },
    { value: 'Count', title: 'Count' },
    { value: 'Put Away', title: 'Put Away' },
  ];
  wharehouses: any = [];
  isEdit: boolean = false;
  itemNumberSearchList: any;
  @ViewChild("searchauto", { static: false }) autocompleteOpened: MatAutocomplete;
  wharehouseRequired: any = '';

  heading:string = "";

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private orderManagerService: OrderManagerService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<OmAddRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.oTTempUpdatePayload.processBy = this.userData.userName;
    this.oTTempUpdatePayload.importBy = this.userData.userName;
    this.oTTempUpdatePayload.wsid = this.userData.wsid;
    this.getUserFieldData();

    this.heading = this.data.heading;
  }

  clearAutoFills(){

  }

  autofillModal(){

  }

  mapDefaultValues() {
    this.oTTempUpdatePayload.userField1 = this.userFieldData.userField1;
    this.oTTempUpdatePayload.userField2 = this.userFieldData.userField2;
    this.oTTempUpdatePayload.userField3 = this.userFieldData.userField3;
    this.oTTempUpdatePayload.userField4 = this.userFieldData.userField4;
    this.oTTempUpdatePayload.userField5 = this.userFieldData.userField5;
    this.oTTempUpdatePayload.userField6 = this.userFieldData.userField6;
    this.oTTempUpdatePayload.userField7 = this.userFieldData.userField7;
    this.oTTempUpdatePayload.userField8 = this.userFieldData.userField8;
    this.oTTempUpdatePayload.userField9 = this.userFieldData.userField9;
    this.oTTempUpdatePayload.userField10 = this.userFieldData.userField10;
  }

  getUserFieldData(loader: boolean = false) {
    let payload = {
      "userName": this.userData.userName,
      "wsid": this.userData.wsid,
      "appName": ""
    }
    this.orderManagerService.get(payload, '/OrderManager/UserFieldData', loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.userFieldData = res.data[0];
        this.mapDefaultValues();
        this.getWarehouses();
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  save(loader: boolean = false) {
    if (this.oTTempUpdatePayload.orderNumber.trim() == '' || this.oTTempUpdatePayload.itemNumber.trim() == '' || this.oTTempUpdatePayload.transType.trim() == '') {
      this.toastr.error("Order Number, Item Number and Transaction Type must be completed in order to continue.", 'Warning!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else if(this.wharehouseRequired && this.oTTempUpdatePayload.warehouse == ''){
      this.toastr.error("The selected item is warehouse sensitive.  Please set a warehouse to continue.", 'Warning!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else if (this.oTTempUpdatePayload.transQty <= 0) {
      this.toastr.error("The transaction quantity for this transaction must be greater than 0.", 'Warning!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else {
      if (!this.isEdit) {
        this.orderManagerService.get(this.oTTempUpdatePayload, '/OrderManager/OTTempInsert', loader).subscribe((res: any) => {
          if (res.isExecuted && res.data) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.dialogRef.close(res.data);
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      }
      else {
        this.orderManagerService.get(this.oTTempUpdatePayload, '/OrderManager/OTTempUpdate', loader).subscribe((res: any) => {
          if (res.isExecuted && res.data) {
            this.toastr.success(labels.alert.update, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.dialogRef.close(res.data);
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })

      }
    }
  }

  searchItem(loader: boolean = false) {
    if (this.oTTempUpdatePayload.itemNumber.trim() != '') {
      let payload = {
        "appName": "",
        "itemNumber": this.oTTempUpdatePayload.itemNumber,
        "beginItem": "---",
        "isEqual": false,
        "userName": this.userData.userName,
        "wsid": this.userData.wsid
      }
      this.orderManagerService.get(payload, '/Common/SearchItem', loader).subscribe((res: any) => {
        if (res.isExecuted && res.data) {
          this.itemNumberSearchList = res.data;
        } else {
          // this.toastr.error(res.responseMessage, 'Error!', {
          //   positionClass: 'toast-bottom-right',
          //   timeOut: 2000
          // });
        }
      });
    }
    else{
      this.itemNumberSearchList = [];
    }
  }

  onSearchSelect(e: any) {
    this.oTTempUpdatePayload.itemNumber = e.option.value;
  }

  selectItemNumber(option: any) {
    this.oTTempUpdatePayload.description = option.description;
    this.oTTempUpdatePayload.unitofMeasure = option.unitOfMeasure;
    this.wharehouseRequired = option.warehouseSensitive;
  }

  getWarehouses(){
    let payload = {
      "userName": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.orderManagerService.get(payload, '/Common/GetWarehouses', false).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.wharehouses = res.data;
      } else {
        // this.toastr.error(res.responseMessage, 'Error!', {
        //   positionClass: 'toast-bottom-right',
        //   timeOut: 2000
        // });
      }
    });
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { AdminService } from '../../admin.service';
import { AuthService } from 'src/app/init/auth.service';
import { AlertConfirmationComponent } from 'src/app/dialogs/alert-confirmation/alert-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import labels from '../../../labels/labels.json';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss'],
})
export class AddNewDeviceComponent implements OnInit {
  headerLable = 'Devices-Add Edit, Delete';
  newDeviceForm: FormGroup;
  newDeviceID=0;
  isEdit: boolean = false;
  item: any;
  interFaceType = 'Other';
  zoneList = [];
  controllerTypeList = [];
  deviceModelList = [];
  IPTI = '';
  WMI = '';
  Other = '';
  setup = '';
  JMIF = '';
  COMPort = '';
  Baud = '';
  WordLength = '';
  StopBit = '';
  Parity = '';
  WMIControllers = [
    'SISHorizontalCarousel',
    'WMIC3000',
    'Sapient',
    'SapientShuttleNR',
    'SapientShuttle',
    'KardexTIC',
    'SISLightMaster',
    'SISLightMasterTB',
    'SISCartSB',
    'SISMultiSB',
    'JMIFShuttle',
  ];
  public userData: any;
  constructor(
    public dialogRef: MatDialogRef<AddNewDeviceComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private adminService: AdminService,
    public authService: AuthService,
    private toastr: ToastrService,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data?.isEdit;
    this.item = data?.item;
  }

  ngOnInit(): void {
    this.initializeDataSet();

    this.userData = this.authService.userData();
    this.getDeviceInformation();
  }
  changeType(event) {
    if (this.WMIControllers.indexOf(event.value) >= 0) {
      this.interFaceType = 'WMI';
    } else {
      this.interFaceType = 'Other';
    }
  }
  dialogClose() {
    this.dialogRef.close('close');
  }
  onSubmit(form: FormGroup, type?) {
    if (form.value.zone === null || form.value.zone === '') {
      this.openAlertDialog('Zone cannot be left blank.');
      return;
    }
    if (form.value.deviceType === null || form.value.deviceType === '') {
      this.openAlertDialog('Device Type cannot be left blank.');
      return;
    }
    if (form.value.deviceNumber === null || form.value.deviceNumber === '') {
      this.openAlertDialog('Device Number cannot be left blank.');
      return;
    } else {
      let item = form.value;
      // const preferences = Object.values(form.value);
      var preferences = [
        item.zone,
        item.deviceType,
        item.deviceNumber,
        item.deviceModel,
        item.controllerType,
        item.controllerTerminalPort,
        item.arrowDirection,
        item.lightDirection,
        JSON.stringify(item.useLaserPointer),
        item.useLightTreeNumber,
        item.firstAddress,
        item.displayPositions,
        item.displayCharacters,
        item.pairKey,
      ];
      var shown = this.showDPTypeFields();
      if (this.data && this.data.item && this.data.item.deviceID != 0 || this.newDeviceID !=0 ) {
        switch (shown) {
          case 'WMI JMIF':
            preferences = preferences.concat(this.JMIF);
            break;

          case 'WMI':
          case 'WMI SETUP':
            preferences = preferences.concat(
              this.newDeviceForm.controls['hostIP'].value,
              this.newDeviceForm.controls['hostPort'].value,
              this.newDeviceForm.controls['workstationName'].value
            );
            break;
          case 'OTHER':
            // other
            preferences = preferences.concat(
              this.newDeviceForm.controls['COMPort'].value,
              this.newDeviceForm.controls['Baud'].value,
              this.newDeviceForm.controls['Parity'].value,
              this.newDeviceForm.controls['WordLength'].value,
              this.newDeviceForm.controls['StopBit'].value,
            );
            break;
          default:
            break;
        }
      }
      let paylaod = {
        preference: preferences,
        shown: shown,
        deviceId:
          this.data && this.data.item && this.data.item.deviceID
            ? this.data.item.deviceID
            : this.newDeviceID>0?this.newDeviceID:0,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
      this.adminService
        .get(paylaod, '/Admin/DevicePreference')
        .subscribe((res: any) => {
          if (res.isExecuted) {
            this.toastr.success(res.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });

            if (res.data != 0) {
              this.newDeviceID=res.data;
              
              // this.item.deviceID=res.data;
              this.getDeviceInformation(res.data);
            }
            if (type === 'close') {
              this.dialogRef.close('Yes');
            }
            this.sharedService.updateDevicePref({ response: true });
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        });
    }
  }

  initializeDataSet() {
    this.newDeviceForm = this.fb.group({
      zone: new FormControl({
        value: (this.item && this.item.zone) || '',
        disabled: false,
      }),
      deviceType: new FormControl({
        value: (this.item && this.item.deviceType) || '',
        disabled: false,
      }),
      deviceNumber: new FormControl({
        value: (this.item && this.item.deviceNumber) || '',
        disabled: false,
      }),
      deviceModel: new FormControl({
        value: (this.item && this.item.deviceModel) || '',
        disabled: false,
      }),
      controllerType: new FormControl({
        value: (this.item && this.item.controllerType) || '',
        disabled: false,
      }),
      controllerTerminalPort: new FormControl({
        value: (this.item && this.item.controllerTermPort) || '',
        disabled: false,
      }),
      arrowDirection: new FormControl({
        value: (this.item && this.item.arrowDirection) || '',
        disabled: false,
      }),
      lightDirection: new FormControl({
        value: (this.item && this.item.lightDirection) || '',
        disabled: false,
      }),
      useLightTreeNumber: new FormControl({
        value: (this.item && this.item.lightTreeNumber) || '0',
        disabled: false,
      }),
      firstAddress: new FormControl({
        value: (this.item && this.item.beginAddress) || '0',
        disabled: false,
      }),
      displayPositions: new FormControl({
        value: (this.item && this.item.displayPositions) || '0',
        disabled: false,
      }),
      displayCharacters: new FormControl({
        value: (this.item && this.item.displayCharacters) || '0',
        disabled: false,
      }),
      pairKey: new FormControl({
        value: (this.item && this.item.pairKey) || '',
        disabled: false,
      }),
      useLaserPointer: new FormControl({
        value:
          this.item && this.item.laserPointer
            ? JSON.parse(this.item.laserPointer.toLowerCase())
            : false || false,
        disabled: false,
      }),
      hostIP: new FormControl({ value: '', disabled: false }),
      hostPort: new FormControl({ value: '', disabled: false }),
      workstationName: new FormControl({ value: '', disabled: false }),
      COMPort: new FormControl({ value: '', disabled: false }),
      Baud: new FormControl({ value: '', disabled: false }),
      WordLength: new FormControl({ value: '', disabled: false }),
      StopBit: new FormControl({ value: '', disabled: false }),
      Parity: new FormControl({ value: '', disabled: false }),
    });

    if (
      this.WMIControllers.indexOf(this.item && this.item.controllerType) >= 0
    ) {
      this.interFaceType = 'WMI';
    } else {
      this.interFaceType = 'Other';
    }
  }

  deleteSelected() {
    if (!this.isEdit) {
      this.dialog.closeAll();
      return;
    }
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        action: 'delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Yes') {
        let payload = {
          deviceID: this.data && this.data.item ? this.data.item.deviceID : this.newDeviceID>0?this.newDeviceID:0,
          username: this.userData.userName,
          wsid: this.userData.wsid,
        };
        this.adminService
          .get(payload, '/Admin/DevicePreferencesDelete')
          .subscribe((res: any) => {
            if (res.isExecuted) {
              this.toastr.success(res.responseMessage, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
              this.dialogRef.close('Yes');
            } else {
              this.toastr.error(res.responseMessage, 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
            }
          });
      }
    });
  }

  getDeviceInformation(deviceID?) {
    
    let payload = {
      deviceID: deviceID
        ? deviceID
        : this.data && this.data.item
        ? this.data.item.deviceID
        : 0,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.adminService
      .get(payload, '/Admin/DeviceInformation')
      .subscribe((res: any) => {
        this.zoneList = res && res.data ? res.data.zoneList : [];
        this.controllerTypeList =
          res && res.data ? res.data.controllerTypeList : [];
        this.deviceModelList = res && res.data ? res.data.deviceModelList : [];
        this.newDeviceForm.controls['hostIP'].setValue(res.data.hostIPAddress);
        this.newDeviceForm.controls['hostPort'].setValue(res.data.hostPort);
        this.newDeviceForm.controls['workstationName'].setValue(
          res.data.workstationName
        );
        this.newDeviceForm.controls['COMPort'].setValue(res.data.hostPCComPort);
        this.newDeviceForm.controls['Baud'].setValue(res.data.baudRate);
        this.newDeviceForm.controls['StopBit'].setValue(res.data.stopBit);
        this.newDeviceForm.controls['Parity'].setValue(res.data.parity);
        // this.COMPort = res.data.hostPCComPort;
        // this.Baud = res.data.baudRate;
        // this.StopBit = res.data.stopBit;
        // this.Parity = res.data.parity;
      });
  }

  openAlertDialog(message) {
    const dialogRef = this.dialog.open(AlertConfirmationComponent, {
      height: 'auto',
      width: '786px',
      data: {
        message: message,
        heading: '',
        disableCancel: true,
      },
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getCompName() {
    this.newDeviceForm.controls['workstationName'].setValue(this.userData.wsid);
    // this.newDeviceForm.get('workstationName')?.setValue(this.userData.wsid);
    // let payload = {
    //   WSID: this.userData.wsid,
    // };
    // this.adminService.get(payload, '/Induction/CompName', true).subscribe(
    //   (res: any) => {
    //     if (res.data && res.isExecuted) {
    //       this.newDeviceForm.get('workstationName')?.setValue(res.data);
    //     }
    //   },
    //   (error) => {}
    // );
  }

  showDPTypeFields() {
    var ctype = this.newDeviceForm.controls['controllerType'].value;
    var IPTI = this.IPTI;
    var WMI = this.WMI;
    var Other = this.Other;
    var setup = this.setup;
    var JMIF = this.JMIF;

    var shown = '';
    if (
      this.newDeviceForm.controls['deviceType'].value == 'Light Tree' &&
      this.newDeviceForm.controls['deviceModel'].value == 'IPTI'
    ) {
      // IPTI.show();
      // WMI.hide();
      // Other.hide();
      shown = 'IPTI';
    } else if (this.WMIControllers.indexOf(ctype) >= 0) {
      shown = 'WMI';
      this.interFaceType = 'WMI';
      this.isEdit = true;
      // WMI.show();
      if (ctype == 'JMIFShuttle') {
        shown += ' JMIF';
        // JMIF.show();
        // setup.hide();
      } else if (ctype.toLowerCase().indexOf('sapientshuttle') >= 0) {
        shown += ' SETUP';
        // setup.show();
        // JMIF.hide();
      } else {
        // setup.hide();
        // JMIF.hide();
      }
      // IPTI.hide();
      // Other.hide();
    } else {
      this.interFaceType = 'Other';
      this.isEdit = true;
      // Other.show();
      // IPTI.hide();
      // WMI.hide();
      shown = 'OTHER';
    }
    return shown;
  }

  updateAllDevices(type) {
    let payload = {   
      zone: this.newDeviceForm.controls['zone'].value,
      hostport: this.newDeviceForm.controls['COMPort'].value,
      baud: this.newDeviceForm.controls['Baud'].value,
      parity: this.newDeviceForm.controls['Parity'].value,
      word: this.newDeviceForm.controls['WordLength'].value,
      stopbit: this.newDeviceForm.controls['StopBit'].value,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };

    let message = '';
    if (type === 'UpdateAllInterface') {
      message =
        'Click OK to update all devices with Com Port: ' +
        this.newDeviceForm.controls['COMPort'].value;
    } else {
      message =
        'Click OK to update all devices with Com Port: ' +
        this.newDeviceForm.controls['COMPort'].value +
        ' and Zone: ' +
        this.newDeviceForm.controls['zone'].value;
    }
    const dialogRef = this.dialog.open(AlertConfirmationComponent, {
      height: 'auto',
      width: '786px',
      data: {
        message: message,
        heading: '',
        disableCancel: true,
      },
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService
          .get(payload, '/Admin/ZoneDevicePreferencesUpdateAll')
          .subscribe((res: any) => {
            if (res.isExecuted) {
              
              this.toastr.success(res.responseMessage, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
              this.sharedService.updateDevicePref({ response: true });
            } else {
              this.toastr.error(res.responseMessage, 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
            }
          });
      }
    });
  }
}

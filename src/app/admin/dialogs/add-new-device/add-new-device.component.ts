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

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss'],
})
export class AddNewDeviceComponent implements OnInit {
  headerLable = 'Devices-Add Edit, Delete';
  newDeviceForm: FormGroup;
  isEdit: boolean = false;
  item: any;
  zoneList=[];
  controllerTypeList=[];
  deviceModelList=[];

  public userData: any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private adminService: AdminService,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data?.isEdit;
    this.item = data?.item;
    console.log(this.item);

 
  }

  ngOnInit(): void {
    this.initializeDataSet();
    this.userData = this.authService.userData();
    this.getDeviceInformation();
  }
  dialogClose() {
    this.dialogRef.close('close');
  }
  onSubmit(form:FormGroup) {
    if(form.value.zone===null){
      this.openAlertDialog('Zone cannot be left blank.')
    }
    if(form.value.deviceType===null){
      this.openAlertDialog('Device Type cannot be left blank.')
    }
    if(form.value.deviceNumber===null){
      this.openAlertDialog('Device Number cannot be left blank.')
    }else{

      const preferences = Object.values(form.value);
      console.log(preferences)
    }
  }

  initializeDataSet() {
    this.newDeviceForm = this.fb.group({
      zone: new FormControl({ value: this.item && this.item.zone || '', disabled: false }),
      deviceType: new FormControl({ value: this.item && this.item.deviceType || '', disabled: false }),
      deviceNumber: new FormControl({ value: this.item && this.item.deviceNumber || '', disabled: false }),
      deviceModel: new FormControl({ value: this.item && this.item.deviceModel || '', disabled: false }),
      controllerType: new FormControl({ value: this.item && this.item.controllerType || '', disabled: false }),
      controllerTerminalPort: new FormControl({
        value: this.item && this.item.controllerTermPort || '',
        disabled: false,
      }),
      arrowDirection: new FormControl({ value: this.item && this.item.arrowDirection || '', disabled: false }),
      lightDirection: new FormControl({ value: this.item && this.item.lightDirection || '', disabled: false }),
      useLightTreeNumber: new FormControl({ value: this.item && this.item.lightTreeNumber || 0, disabled: false }),
      firstAddress: new FormControl({ value: this.item && this.item.beginAddress || 0, disabled: false }),
      displayPositions: new FormControl({ value: this.item && this.item.displayPositions || 0, disabled: false }),
      displayCharacters: new FormControl({ value: this.item && this.item.displayCharacters || 0, disabled: false }),
      pairKey: new FormControl({ value: this.item && this.item.pairKey || '', disabled: false }),
      useLaserPointer: new FormControl({ value: this.item && this.item.laserPointer || '', disabled: false }),
    });
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
      }
    });
  }

  getDeviceInformation() {
    let payload = {
      deviceID: this.data && this.data.item ? this.data.item.deviceID : 0,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.adminService
      .get(payload, '/Admin/DeviceInformation')
      .subscribe((res: any) => {
        this.zoneList=res && res.data?res.data.zoneList:[];
        this.controllerTypeList=res && res.data?res.data.controllerTypeList:[];
        this.deviceModelList=res && res.data?res.data.deviceModelList:[]
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
    dialogRef.afterClosed().subscribe((result) => {

    });
  }

  
}

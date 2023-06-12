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
  }

  ngOnInit(): void {
    this.initializeDataSet();
    this.userData = this.authService.userData();
    this.getDeviceInformation();
  }
  dialogClose() {
    this.dialogRef.close('close');
  }
  onSubmit(form) {}

  initializeDataSet() {
    this.newDeviceForm = this.fb.group({
      zone: new FormControl({ value: '' || '', disabled: false }),
      deviceType: new FormControl({ value: '' || '', disabled: false }),
      deviceNumber: new FormControl({ value: '' || '', disabled: false }),
      deviceModel: new FormControl({ value: '' || '', disabled: false }),
      controllerType: new FormControl({ value: '' || '', disabled: false }),
      controllerTerminalPort: new FormControl({
        value: '' || '',
        disabled: false,
      }),
      arrowDirection: new FormControl({ value: '' || '', disabled: false }),
      lightDirection: new FormControl({ value: '' || '', disabled: false }),
      useLightTreeNumber: new FormControl({ value: '' || '', disabled: false }),
      firstAddress: new FormControl({ value: '' || '', disabled: false }),
      displayPositions: new FormControl({ value: '' || '', disabled: false }),
      displayCharacters: new FormControl({ value: '' || '', disabled: false }),
      pairKey: new FormControl({ value: '' || '', disabled: false }),
      useLaserPointer: new FormControl({ value: '' || '', disabled: false }),
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
      .subscribe((res: any) => {});
  }
}

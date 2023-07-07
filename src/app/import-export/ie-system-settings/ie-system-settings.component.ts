import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IeFtpSettingsComponent } from 'src/app/dialogs/ie-ftp-settings/ie-ftp-settings.component';
import { IeInventMapExportComponent } from 'src/app/dialogs/ie-invent-map-export/ie-invent-map-export.component';
import { IeTransFieldMappingComponent } from 'src/app/dialogs/ie-trans-field-mapping/ie-trans-field-mapping.component';
import { OpenTransPickMappingComponent } from 'src/app/dialogs/open-trans-pick-mapping/open-trans-pick-mapping.component';
import { TransferFilePathComponent } from 'src/app/dialogs/transfer-file-path/transfer-file-path.component';

@Component({
  selector: 'app-ie-system-settings',
  templateUrl: './ie-system-settings.component.html',
  styleUrls: ['./ie-system-settings.component.scss']
})
export class IeSystemSettingsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }


  IeTransFieldMappingDialog() {
    const dialogRef = this.dialog.open(IeTransFieldMappingComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__',
    });

  }
  XMLFieldMappingDialog() {
    const dialogRef = this.dialog.open(OpenTransPickMappingComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__',
    });

  }

  TransFilePathDialog() {
    const dialogRef = this.dialog.open(TransferFilePathComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__',
    });

  }

  IeFTPSettingsDialog(){
    const dialogRef = this.dialog.open(IeFtpSettingsComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__',
    });

  }

  IeInventMapExportDialog(){
    const dialogRef = this.dialog.open(IeInventMapExportComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__',
    });

  }
}

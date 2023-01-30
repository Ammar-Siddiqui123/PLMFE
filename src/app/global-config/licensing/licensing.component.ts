import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/services/shared.service';
import { GlobalconfigService } from '../globalconfig.service';

export interface PeriodicElement {
  position: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
  { position: 'asdasd' },
];
@Component({
  selector: 'app-licensing',
  templateUrl: './licensing.component.html',
  styleUrls: ['./licensing.component.scss'],
})
export class LicensingComponent implements OnInit {
  displayedColumns: string[] = [
    'appname',
    'displayname',
    'license',
    'numlicense',
    'status',
    'appurl',
    'save',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  licAppData;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  radioLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  constructor(
    private globalConfService: GlobalconfigService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    let appData = this.sharedService.getApp();
    if (!appData) {
      this.getAppLicense();
    }else{
      this.licAppData=appData
      this.convertToObj();
    }
  }
  async getAppLicense() {
    // get can access
    this.globalConfService.get(null, '/GlobalConfig/AppLicense').subscribe(
      (res: any) => {
        if (res && res.data) {
          this.licAppData = res.data;
       this.convertToObj();
          this.sharedService.setApp(this.licAppData);
        }
      },
      (error) => {}
    );
  }

  convertToObj(){
    const arrayOfObjects: any = [];
    for (const key of Object.keys(this.licAppData)) {
      // arrayOfObjects.push({ key, value: this.licAppData[key] });
      arrayOfObjects.push({
        appname: this.licAppData[key].info.name,
        displayname: this.licAppData[key].info.displayName,
        license: this.licAppData[key].info.licenseString,
        numlicense: this.licAppData[key].numLicenses,
        status: this.licAppData[key].isLicenseValid ?'Valid':'Invalid',
        appurl: this.licAppData[key].info.url,
      });
    }
    this.dataSource = new MatTableDataSource(arrayOfObjects);
  }
}

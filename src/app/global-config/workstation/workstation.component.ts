import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/services/shared.service';
import { GlobalconfigService } from '../globalconfig.service';

export interface PeriodicElement {
  position: string;
}

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss'],
})
export class WorkstationComponent implements OnInit {
  displayedColumns: string[] = ['appName', 'canAccess', 'defaultApp'];
  appName_datasource: any = [];
  selection = new SelectionModel<PeriodicElement>(true, []);
  workstationData: any = [];
  selectedItem: any;
  canAccessAppList: any = [];
  defaultAccessAppList: any = [];
  licAppNames: any = [];
  licAppObj: any;
  wsid: any;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.appName_datasource.data.length;
    return numSelected === numRows;
  }
  async radioChange(item) {
   this.wsid=item.wsid;
    // this.filter['property'] = event.value;
    this.selectedItem = item;

    await this.getCanAccessList(this.selectedItem.wsid);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.appName_datasource.data);
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
    private sharedService: SharedService,
    private globalConfService: GlobalconfigService
  ) {}

  ngOnInit(): void {
    let sharedData = this.sharedService.getData();
    let appData = this.sharedService.getApp();

    if (
      sharedData &&
      sharedData.workstations &&
      sharedData.workstations.length
    ) {
      this.workstationData = sharedData.workstations;
    } else {
      this.getMenuData();
    }
    if (appData) {
      this.licAppNames = Object.keys(appData);
      this.convertToObj();
      this.appName_datasource = new MatTableDataSource(this.licAppObj);
    } else {
      this.getAppLicense();
    }
  }

  // convertLicAppToObj(app,canAccess,defApp) {
  //   const modifiedLicApp= app.map((item) => {
  //      return { appName: item, canAccess: false, defaultApp: false };
  //    });
  //    return modifiedLicApp
  //  }
  getMenuData() {
    let payload = {
      LicenseString:
        'qdljjBp3O3llQvKEW01qlvO4dTIFf6VMuJvYMgXgEc8U8q+dVlMKt0mKG6qtD9DO',
      AppUrl: 'CM1',
      DisplayName: 'Consolidation Manager',
      AppName: 'Consolidation Manager',
    };
    this.globalConfService.get(payload, '/GlobalConfig/Menu').subscribe(
      (res: any) => {
        res && res.data;
        if (res && res.data) {
          this.sharedService.setData(res.data);
          res.data.workstations.map((obj) => ({ ...obj, checked: false }));
          this.workstationData = res.data.workstations;
        }
      },
      (error) => {}
    );
  }
  async getAppLicense() {
    this.globalConfService.get(null, '/GlobalConfig/AppLicense').subscribe(
      (res: any) => {
        if (res && res.data) {
          this.licAppNames = res.data;
          this.sharedService.setApp(this.licAppNames);
          this.licAppNames = Object.keys(res.data);
          this.convertToObj();
          this.appName_datasource = new MatTableDataSource(this.licAppObj);
        }
      },
      (error) => {}
    );
  }

  convertToObj() {
    this.licAppObj = this.licAppNames.reduce((acc, item) => {
      return [...acc, { appName: item, canAccess: false, defaultApp: false }];
    }, []);
  }
  async getCanAccessList(wsid) {
    // get can access

    let payload = {
      WSID: wsid,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/WorkStationAppSelect')
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.canAccessAppList = res.data;
            this.getDefaultAppList(wsid, this.canAccessAppList);
          }
        },
        (error) => {}
      );
  }
  async getDefaultAppList(wsid, canAccessArr) {
    // get can access
    let payload = {
      WSID: wsid,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/WorkStationDefaultAppSelect')
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.defaultAccessAppList = res.data;
          }
          if (this.licAppObj.length) {
            this.licAppObj.map((itm) => {
              itm.canAccess = false;
            });
          }
          if (canAccessArr.length) {
            this.licAppObj.map((obj, i) => {
              canAccessArr.find((item, j) => {
                if (item === obj.appName) {
                  this.licAppObj[i].canAccess = true;
                } else if (item != obj.appName) {
                }
              });
            });
          }
        },
        (error) => {}
      );
  }

  onChangeCheckbox(event, item) {
    let payload = {
      WSID: this.wsid,
      AppName: item.appName,
    };
    if (event.checked) {
      this.addCanAccess(payload);
    } else {
      this.removeCanAccess(payload);
    }
  }

  removeCanAccess(payload) {
    this.globalConfService
      .get(payload, '/GlobalConfig/WorkStationAppDelete')
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error) => {}
      );
  }

  addCanAccess(payload) {
    this.globalConfService
      .get(payload, '/GlobalConfig/WorkStationAppAdd')
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error) => {}
      );
  }
}

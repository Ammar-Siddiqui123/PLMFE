import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { GlobalconfigService } from '../globalconfig.service';
import labels from '../../labels/labels.json';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

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
  defaultAccessApp;
  licAppNames: any = [];
  licAppObj: any;
  wsid: any;
  appName: any = '';
  selectedVariable: any;
  sideBarOpen: boolean = true;
  dummy_workstation: any = [
    {
      pcName: '',
      wsid: 'sadsd;                  ',
    },
    {
      pcName: '_ga=GA1.2.1701036510.1514308756;',
      wsid: '_ga=GA1.2.1701036510.1514308756;                  ',
    },
    {
      pcName: '_ga=GA1.2.421571900.1530666914',
      wsid: '_ga=GA1.2.421571900.1530666914',
    },
    {
      pcName: '9200-HHWL',
      wsid: '9200-HHWL',
    },
    {
      pcName: 'AJ_Laptop_20171130',
      wsid: '00CBD5D95F9EA3CCB6',
    },
    {
      pcName: 'AJD20171026',
      wsid: '00CF4E5BD1829A053D',
    },
    {
      pcName: 'Ajd7intablet',
      wsid: 'Ajd7intablet',
    },
    {
      pcName: 'Ajdcell',
      wsid: 'Ajdcell',
    },
    {
      pcName: 'Ajdipad',
      wsid: '0094D191515AED0A8D',
    },
    {
      pcName: 'Ajdipad6',
      wsid: '00BB290A9310C0C616',
    },
    {
      pcName: 'AJ-IPhone',
      wsid: '00FBC5F2CB7CF464F8',
    },
    {
      pcName: 'AJPC11142017t',
      wsid: '00894AACE8D7F095CC',
    },
    {
      pcName: 'AndrewLaptop(WIN-INV71VGR833)',
      wsid: '00A89EF6D57A331DC3',
    },
    {
      pcName: 'AndrewsSurface',
      wsid: '00D06121F44C2DB1E9',
    },
    {
      pcName: 'ASUS-Tablet',
      wsid: 'ASUS-Tablet',
    },
    {
      pcName: 'Bing_WareHouse',
      wsid: '00A10CB6BDA0C183C2',
    },
    {
      pcName: 'BINGSTL009',
      wsid: '00ECCC6DDCD7220AEE',
    },
    {
      pcName: 'ChrisVPC10272017',
      wsid: '00FF71D380B4F6BBB1',
    },
    {
      pcName: 'CK71-HHWL                                         ',
      wsid: 'CK71-HHWL                                         ',
    },
    {
      pcName: 'Consolidation01',
      wsid: 'Consolidation01',
    },
    {
      pcName: 'Consolidation02',
      wsid: 'Consolidation02',
    },
    {
      pcName: 'Consolidation03',
      wsid: 'Consolidation03',
    },
    {
      pcName: 'Consolidation04',
      wsid: 'Consolidation04',
    },
    {
      pcName: 'DBarrPC',
      wsid: '00804093F51ABCF30C',
    },
    {
      pcName: 'denny',
      wsid: '00CBE2540BBD7D3110',
    },
    {
      pcName: 'Denny_10192017',
      wsid: '00C6C77420C0707CEA',
    },
    {
      pcName: 'DennyTest',
      wsid: '0093077BEA205F412F',
    },
    {
      pcName: 'DeviceTesting',
      wsid: 'DeviceTesting',
    },
    {
      pcName: 'DJB-HHWL',
      wsid: 'DJB-HHWLWSID',
    },
    {
      pcName: 'DJLT',
      wsid: '00851B42B568D502F1',
    },
    {
      pcName: 'DLX4WL',
      wsid: 'DLX4WL',
    },
    {
      pcName: 'HMS-RF1',
      wsid: 'HMS-RF1',
    },
    {
      pcName: 'HMS-RF2',
      wsid: 'HMS-RF2',
    },
    {
      pcName: 'HMS-RF3',
      wsid: 'HMS-RF3',
    },
    {
      pcName: 'HMS-RF4',
      wsid: 'HMS-RF4',
    },
    {
      pcName: 'HMS-RF5',
      wsid: 'HMS-RF5',
    },
    {
      pcName: 'HMS-RF6',
      wsid: 'HMS-RF6',
    },
    {
      pcName: 'Ipad',
      wsid: '00A72423DA43B410DC',
    },
    {
      pcName: 'iPadAjd',
      wsid: '00C86694F32A1A84A1',
    },
    {
      pcName: 'JMP-HHMOT',
      wsid: 'JMP-HHMOT',
    },
    {
      pcName: 'JMP-HHWL',
      wsid: 'JMP-HHWLWSID',
    },
    {
      pcName: 'JMP-PC',
      wsid: 'JMP-PC',
    },
    {
      pcName: 'JMP-PC1',
      wsid: '00DA8BD55A576165EC',
    },
    {
      pcName: 'JMP-PCWin7',
      wsid: '00D6447F07E3E76BD4',
    },
    {
      pcName: 'JON-PC',
      wsid: 'JON-PC',
    },
    {
      pcName: 'JonPC20171027',
      wsid: '00E8589B2FD0BB41DD',
    },
    {
      pcName: 'katyLaptop',
      wsid: '00AE93EB1921B44F6D',
    },
    {
      pcName: 'KimClark',
      wsid: '00AF0B417AE8BBBE28',
    },
    {
      pcName: 'KUMON',
      wsid: 'KUMON',
    },
    {
      pcName: 'Kworkstation',
      wsid: '00E56F3F380C8E902C',
    },
    {
      pcName: 'Kworkstation1',
      wsid: '00C8C12C8FCB9F4C11',
    },
    {
      pcName: 'LeonMatthews',
      wsid: '008C09FFB186B3CA4A',
    },
    {
      pcName: 'LMaddy20170611',
      wsid: '00A68DB0606EABCD84',
    },
    {
      pcName: 'MattWildLaptop',
      wsid: '00B591309F860E851C',
    },
    {
      pcName: 'MC70-HHWL',
      wsid: 'MC70-HHWL',
    },
    {
      pcName: 'MC9000',
      wsid: 'MC9000',
    },
    {
      pcName: 'MikeYezzi',
      wsid: '008CF6BD69E3CD7A5D',
    },
    {
      pcName: 'MMcvey_10232017',
      wsid: '00EF5E350C7BE6F02C',
    },
    {
      pcName: 'Mozilla/5.0 (Linux; Android 4.4.4; Falcon-X4 Build',
      wsid: 'Mozilla/5.0 (Linux; Android 4.4.4; Falcon-X4 Build',
    },
    {
      pcName: 'Mozilla/5.0 (Linux; Android 5.1.1; WT6000 Build/04',
      wsid: 'Mozilla/5.0 (Linux; Android 5.1.1; WT6000 Build/04',
    },
    {
      pcName: 'Mozilla/5.0 (Linux; Android 6.0.1; PA730 Build/0.1',
      wsid: 'Mozilla/5.0 (Linux; Android 6.0.1; PA730 Build/0.1',
    },
    {
      pcName: 'Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NR',
      wsid: 'TonyPhone',
    },
    {
      pcName: 'Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; Motor',
      wsid: 'Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; Motor',
    },
    {
      pcName: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWeb',
      wsid: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWeb',
    },
    {
      pcName: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0;',
      wsid: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0;',
    },
    {
      pcName: 'Mozilla/5.0 (Windows NT 6.1; rv:56.0) Gecko/201001',
      wsid: 'Mozilla/5.0 (Windows NT 6.1; rv:56.0) Gecko/201001',
    },
    {
      pcName: 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0)',
      wsid: 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0)',
    },
    {
      pcName: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebK',
      wsid: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebK',
    },
    {
      pcName: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/53',
      wsid: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/53',
    },
    {
      pcName: 'MYezzi_Laptop',
      wsid: '00DA624E2D99B39980',
    },
    {
      pcName: 'NewDemoBox',
      wsid: '00DCAA7F257A35C893',
    },
    {
      pcName: 'nickHoefer',
      wsid: '00E3860CE15147955D',
    },
    {
      pcName: 'PA730',
      wsid: 'PA730',
    },
    {
      pcName: 'PickPro',
      wsid: '008BEEDE231C7DD67A',
    },
    {
      pcName: 'pickproajdtablet',
      wsid: 'pickproajdtablet',
    },
    {
      pcName: 'Pickro',
      wsid: 'Pickro',
    },
    {
      pcName: 'PP521205',
      wsid: '00C9FE78A361B697D9',
    },
    {
      pcName: 'ppcert',
      wsid: '008B1BFDAE0CEC4443',
    },
    {
      pcName: 'PP-Tablet4',
      wsid: 'PP-Tablet4',
    },
    {
      pcName: 'PPtest1_PC',
      wsid: '00973CACA308994DA5',
    },
    {
      pcName: 'PRINTSERVER',
      wsid: 'PRINTSERVER',
    },
    {
      pcName: 'SamDesktop',
      wsid: '00F994F0A8D53EA7EC',
    },
    {
      pcName: 'SEANBING',
      wsid: '00C133E1561091F2A6',
    },
    {
      pcName: 'SGPC',
      wsid: '00AE4BB27545651922',
    },
    {
      pcName: 'SGTestDeviceID',
      wsid: 'DeviceID1576014282393',
    },
    {
      pcName: 'SpausterPC',
      wsid: '00AFD953F9AC699076',
    },
    {
      pcName: 'SPZ',
      wsid: '00BE559BF48AF34E86',
    },
    {
      pcName: 'SPZMain',
      wsid: '00BA3AD5E701AF3411',
    },
    {
      pcName: 'SPZpc',
      wsid: '00C2A50DE5417F9CE0',
    },
    {
      pcName: 'SQL2016',
      wsid: '00D50CED9DF39509B0',
    },
    {
      pcName: 'sqldev2016',
      wsid: '0083CB8D672CCF29FD',
    },
    {
      pcName: 'STDemo',
      wsid: '00E988F9A422DE369E',
    },
    {
      pcName: 'STSYRW016-AJ',
      wsid: '009876048900F5C2BE',
    },
    {
      pcName: 'SYRSTL031(dbarr)',
      wsid: '0086F1D84EF244041A',
    },
    {
      pcName: 'TestinWithJoe',
      wsid: '00C66CABBB972F6FC4',
    },
    {
      pcName: 'TESTWSID',
      wsid: 'TESTWSID',
    },
    {
      pcName: 'THBING',
      wsid: '00AF5519F0D2724750',
    },
    {
      pcName: "Tim'sPC",
      wsid: '00E7FB600880AFCD9F',
    },
    {
      pcName: 'Tony',
      wsid: 'Tony',
    },
    {
      pcName: 'TonyPC20171027',
      wsid: '00D623BF86BFAD80E1',
    },
    {
      pcName: 'TrueValue',
      wsid: 'TrueValue',
    },
    {
      pcName: 'WarehouseServer',
      wsid: '00D9DD9383E5A9CE6A',
    },
    {
      pcName: 'WarehouseServer_warehouse',
      wsid: '00BBAF655D28CC3D55',
    },
    {
      pcName: 'WarehouseServer_warehouse1',
      wsid: '00840A3FEEEEC83FED',
    },
    {
      pcName: 'WarehouseServer1',
      wsid: '00ECD2E483E1406ED9',
    },
    {
      pcName: 'WD100',
      wsid: 'WD100',
    },
    {
      pcName: 'wildDev',
      wsid: '00DC88A9AAB15AD1F2',
    },
    {
      pcName: 'WIN-INV71VGR833',
      wsid: '00C5C77BB2043E15A2',
    },
    {
      pcName: 'WIN-INV71VGR833(AndrewLaptop)',
      wsid: '00860C9473602002B1',
    },
    {
      pcName: 'WT6000BP',
      wsid: 'WT6000BP',
    },
    {
      pcName: 'WT6000TV',
      wsid: 'WT6000TV',
    },
  ];
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.appName_datasource.data.length;
    return numSelected === numRows;
  }
  async radioChange(item) {
    this.wsid = item.wsid;
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
    private globalConfService: GlobalconfigService,
    private toastr: ToastrService,
    private dialog: MatDialog
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
      this.workstationData.filter(item=>{
        if(item.pcName===""){
          this.workstationData.push( this.workstationData.splice( this.workstationData.indexOf(item), 1)[0]);
        }
    })
    } else {
      this.getMenuData();
    }
    if (appData) {
      this.getAppLicense();
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
         
          this.workstationData.filter(item=>{
              if(item.pcName===""){
                this.workstationData.push( this.workstationData.splice( this.workstationData.indexOf(item), 1)[0]);
              }
          })
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
          this.updateLicObj(res)
            
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
  updateLicObj(res){
    this.licAppObj.map((item,i)=>{
      this.licAppObj[i]['displayName']=res.data[item.appName].info.displayName
       })
     
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

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
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
          this.defaultAccessApp = res && res.data ? res.data : '';

          if (this.licAppObj.length) {
            // reset to default
            this.licAppObj.map((itm) => {
              itm.canAccess = false;
              itm.defaultApp = false;
            });
          }
          if (canAccessArr.length) {
            // find and map check boxes of selected apps
            this.licAppObj.map((obj, i) => {
              if (this.defaultAccessApp === obj.appName) {
                this.licAppObj[i].defaultApp = true;
              }
              canAccessArr.find((item, j) => {
                if (item === obj.appName) {
                  this.licAppObj[i].canAccess = true;
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
  onChangeRadio(event, item) {
    let payload = {
      WSID: this.wsid,
      AppName: item.appName,
    };
    this.defaultAppAdd(payload);
  }

  defaultAppAdd(payload) {
    this.globalConfService
      .get(payload, '/GlobalConfig/WorkStationDefaultAppAdd')
      .subscribe(
        (res: any) => {


          if(res.isExecuted){
            this.getCanAccessList(this.wsid);
          }
        },
        (error) => {}
      );
  }

  removeCanAccess(payload) {
    this.globalConfService
      .get(payload, '/GlobalConfig/WorkStationAppDelete')
      .subscribe(
        (res: any) => {
          // console.log(res);
        },
        (error) => {}
      );
  }

  addCanAccess(payload) {
    this.globalConfService
      .get(payload, '/GlobalConfig/WorkStationAppAdd')
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.getCanAccessList(this.wsid);
          }
        },
        (error) => {}
      );
  }

  actionDialog(opened: boolean) {
    if (!opened && this.selectedVariable) {
      if (this.selectedVariable === 'delete_workstation') {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
          height: 'auto',
          width: '480px',
          autoFocus: '__non_existing_element__',
          data: {
            mode: 'delete_workstation',
            wsid: this.wsid,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result.isExecuted) {
            this.getMenuData();
          }
        });
      }

      if (this.selectedVariable === 'clear_disabled') {
        this.clearDefaultApp();
      }
    }
  }
  deleteWorkStation() {
    if (!this.wsid) return;
    let payload = {
      WSID: this.wsid,
    };
    this.globalConfService
      .get(payload, '/GlobalConfig/WorkStationDelete')
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
          this.getMenuData();
          this.wsid = null;
        },
        (error) => {
          this.toastr.error(labels.alert.went_worng, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      );
  }
  clearDefaultApp() {
    this.licAppObj.map((itm) => {
      if (itm.defaultApp == true) {
        this.appName = itm.appName;
      }
      itm.defaultApp = false;
    });

    let payload = {
      WSID: this.wsid,
      AppName: '',
    };
    this.defaultAppAdd(payload);
  }
}

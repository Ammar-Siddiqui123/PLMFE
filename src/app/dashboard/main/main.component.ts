import { Component, OnInit } from '@angular/core';
import { GlobalconfigService } from 'src/app/global-config/globalconfig.service';
import { AuthService } from 'src/app/init/auth.service';
import { SharedService } from '../../../app/services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  tab_hover_color: string = '#cf9bff3d';
  licenseApp: any = [];
  applicationData: any = [];
  userData: any;
  constructor(
    private sharedService: SharedService,
    private globalService: GlobalconfigService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getAppLicense();
  }
  async getAppLicense() {
    // get can access

    this.globalService.get(null, '/GlobalConfig/AppLicense').subscribe(
      (res: any) => {
        if (res && res.data) {
          this.convertToObj(res.data);
        }
      },
      (error) => {}
    );
  }
  async convertToObj(data) {
    for await (const key of Object.keys(data)) {
      // arrayOfObjects.push({
      //   appname: data[key].info.name,
      //   license: data[key].info.licenseString,

      // });

      if (data[key].isLicenseValid) {
        // console.log(data[key].info.name);
        let payload = {
          AppName: data[key].info.name,
          wsid: this.userData.wsid,
        };
        this.globalService.get(payload, '/Common/WSAppPermission').subscribe(
          (res: any) => {
            if (res && res.data) {
              this.applicationData.push({
                appName: res.data.appName,
                wsid: res.data.wsid,
                info: this.appNameDictionary(res.data.appName),
              });
            }
              // this.sharedService.setMenuData
            this.sortAppsData();
          },
          (error) => {}
        );
      }
    }
  }

  appNameDictionary(appName) {
    let routes = [
      {
        appName: 'ICSAdmin',
        route: '/admin',
        iconName: 'manage_accounts',
        name: 'Admin',
        updateMenu: 'admin',
      },
      {
        appName: 'Consolidation Manager',
        route: '/dashboard',
        iconName: 'insert_chart',
        name: 'Consolidation Manager',
        updateMenu: '',
      },
      {
        appName: 'Induction',
        route: '/InductionManager',
        iconName: 'checklist',
        name: 'Induction Manager',
        updateMenu: '',
      },
      {
        appName: 'FlowRackReplenish',
        route: '/dashboard',
        iconName: 'schema',
        name: 'FlowRack Replenishment',
        updateMenu: '',
      },
      {
        appName: 'ImportExport',
        route: '/dashboard',
        iconName: 'electric_bolt',
        name: 'Import Export',
        updateMenu: '',
      },
      {
        appName: 'Markout',
        route: '/dashboard',
        iconName: 'manage_accounts',
        name: 'Markout',
        updateMenu: '',
      },
      {
        appName: 'OrderManager',
        route: '/dashboard',
        iconName: 'pending_actions',
        name: 'Order Manager',
        updateMenu: '',
      },
      {
        appName: 'WorkManager',
        route: '/dashboard',
        iconName: 'fact_check',
        name: 'Work Manager',
        updateMenu: '',
      },
    ];

    let obj: any = routes.find((o) => o.appName === appName);
    return obj;
  }

  sortAppsData() {
    this.applicationData.sort(function (a, b) {
      var nameA = a.info.name.toLowerCase(),
        nameB = b.info.name.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
  }
  updateMenu(menu = '') {
    if (menu == 'admin') {
      this.sharedService.updateAdminMenu();
    }
    // console.log(this.sharedService.updateSidebar());
    this.sharedService.updateSidebar();
  }
}

import { Component, OnInit } from '@angular/core';
import { GlobalconfigService } from 'src/app/global-config/globalconfig.service';
import { AuthService } from 'src/app/init/auth.service';
import { SharedService } from '../../../app/services/shared.service';
import { mergeMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  tab_hover_color: string = '#cf9bff3d';
  licenseApp: any = [];
  index = 0;
  menuData: any = [];
  appNames: any = [];
  applicationData: any = [];
  userData: any;
  constructor(
    private sharedService: SharedService,
    private globalService: GlobalconfigService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  ngAfterViewInit() {
    this.getAppLicense();
  }

  getAppLicense() {
    let payload = {
      WSID: this.userData.wsid,
    };
    this.globalService
      .get(payload, '/GlobalConfig/AppNameByWorkstation')
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.convertToObj(res.data);
            localStorage.setItem('availableApps',JSON.stringify(this.applicationData))
            this.sharedService.setMenuData(this.applicationData)
          }
        },
        (error) => {}
      );
  }

  convertToObj(data) {
    data.wsAllAppPermission.forEach((item,i) => {
      for (const key of Object.keys(data.appLicenses)) {
        // arrayOfObjects.push({ key, value: this.licAppData[key] });
        if (item.includes(key)  && data.appLicenses[key].isLicenseValid) {
          this.applicationData.push({
            appname: data.appLicenses[key].info.name,
            displayname: data.appLicenses[key].info.displayName,
            license: data.appLicenses[key].info.licenseString,
            numlicense: data.appLicenses[key].numLicenses,
            info: this.appNameDictionary(item),
            // status: data[key].isLicenseValid ? 'Valid' : 'Invalid',
            appurl: data.appLicenses[key].info.url,
            isButtonDisable: true,
          });
        }
      }
    });
    this.sortAppsData();
    
  }
  // OLD-----
  // async getAppLicense() {
  //   // get can access

  //   this.globalService.get(null, '/GlobalConfig/AppLicense').subscribe(
  //     (res: any) => {
  //       if (res && res.data) {
  //         this.appNames=Object.keys(res.data)
  //         this.convertToObj(res.data);
  //         // this.sharedService.setMenuData(this.appNames)

  //       }
  //     },
  //     (error) => {}
  //   );
  // }
  // async convertToObj(data) {

  //   for await (const key of Object.keys(data)) {

  //     if (data[key].isLicenseValid) {
  //       let payload = {
  //         AppName: data[key].info.name,
  //         wsid: this.userData.wsid,
  //       };
  //       this.globalService.get(payload, '/Common/WSAppPermission').subscribe(
  //         (res: any) => {
  //           if (res && res.data) {
  //            this.index++;
  //             this.applicationData.push({
  //               appName: res.data.appName,
  //               wsid: res.data.wsid,
  //               displayName:data[key].info.displayName,
  //               info: this.appNameDictionary(res.data.appName),
  //             });

  //           }
  //           this.sortAppsData();
  //         },
  //         (error) => {}
  //       );
  //     }

  //   }

  //           this.sharedService.setMenuData(this.applicationData)

  // }

  appNameDictionary(appName) {
    let routes = [
      {
        appName: 'ICSAdmin',
        route: '/admin',
        iconName: 'manage_accounts',
        name: 'Admin',
        updateMenu: 'admin',
        permission: 'Admin Menu',
      },
      {
        appName: 'Consolidation Manager',
        route: '#',
        iconName: 'insert_chart',
        name: 'Consolidation Manager',
        updateMenu: '',
        permission: 'Consolidation Manager',
      },
      {
        appName: 'Induction',
        route: '/InductionManager',
        iconName: 'checklist',
        name: 'Induction Manager',
        updateMenu: '',
        permission: 'Induction Manager',
      },
      {
        appName: 'FlowRackReplenish',
        route: '#',
        iconName: 'schema',
        name: 'FlowRack Replenishment',
        updateMenu: '',
        permission: 'FlowRack Replenish',
      },
      {
        appName: 'ImportExport',
        route: '#',
        iconName: 'electric_bolt',
        name: 'Import Export',
        updateMenu: '',
        permission: 'Import Export',
      },
      {
        appName: 'Markout',
        route: '#',
        iconName: 'manage_accounts',
        name: 'Markout',
        updateMenu: '',
        permission: 'Markout',
      },
      {
        appName: 'OrderManager',
        route: '#',
        iconName: 'pending_actions',
        name: 'Order Manager',
        updateMenu: '',
        permission: 'Order Manager',
      },
      {
        appName: 'WorkManager',
        route: '#',
        iconName: 'fact_check',
        name: 'Work Manager',
        updateMenu: '',
        permission: 'Work Manager',
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
   
    if(menu!='')
    {
      this.sharedService.updateLoggedInUser(this.authService.userData().username,this.authService.userData().wsid,menu);
    }
    
    if (menu == 'admin') {
      this.sharedService.updateAdminMenu();
    }
    // console.log(this.sharedService.updateSidebar());
    this.sharedService.updateSidebar();
  }
}

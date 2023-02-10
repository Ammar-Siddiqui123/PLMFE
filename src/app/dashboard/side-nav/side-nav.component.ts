import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../app/services/shared.service';
import { AuthService } from '../../../app/init/auth.service';
import { GlobalconfigService } from 'src/app/global-config/globalconfig.service';
import { of, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  menuData: any=[];
  @Input() sideBarOpen: Boolean;
  isConfigUser:any = false;
  public userData: any;

  dynamicMenu: any=[]
  menus: any = [
    { icon: 'home', title: 'Home', route: '/dashboard' ,permission: 'Home'},
    { icon: 'electric_bolt', title: 'Import Export', route: '#' ,permission: 'Import Export'},
    { icon: 'manage_accounts', title: 'Admin', route: '/admin', permission: 'Admin Menu'},
    { icon: 'checklist', title: 'Induction Manager', route: '/InductionManager' ,permission: 'Induction Manager'},
    { icon: 'fact_check', title: 'Work Manager', route: '#' ,permission: 'Work Manager'},
    { icon: 'insert_chart', title: 'Consolidation Manager', route: '#' ,permission: 'Consolidation Manager'},
    { icon: 'pending_actions', title: 'Order Manager', route: '#' ,permission: 'Order Manager'},
    { icon: 'schema', title: 'FlowRack Replenishment', route: '#',permission: 'FlowRack Replenish' }
  ];
  globalMenus: any = [
    { icon: 'door_front', title: 'Home', route: '/globalconfig/home' ,permission: ''},
    { icon: 'hub', title: 'Database Connections', route: '/globalconfig/database-connections' ,permission: ''},
    { icon: 'print', title: 'Printers', route: '#' ,permission: ''},
    { icon: 'online_prediction', title: 'Workstation', route: '/globalconfig/workstation' ,permission: ''},
    { icon: 'nest_wifi_gale', title: 'CCSIF', route: '#' ,permission: 'CCSIF'},
    { icon: 'subtitles', title: 'Licensing', route: '/globalconfig/licensing' ,permission: ''},

  ];
  adminMenus: any = [
    { icon: 'arrow_back', title: 'Admin', route: '/dashboard', class: 'back-class' ,permission: 'Dashboard'},
    { icon: 'dashboard', title: 'Inventory', route: '/admin/inventoryMaster',permission: 'Inventory' },
    { icon: 'directions_alt', title: 'Inventory Map', route: '/admin/inventoryMap' ,permission: 'Inventory Map'},
    { icon: 'analytics', title: 'Reports', route: '#' ,permission: 'Reports'},
    { icon: 'dvr', title: 'Transactions', route: '/admin/transaction' ,permission: 'Transaction Journal'},
    { icon: 'list_alt', title: 'Batch Manager', route: '/admin/batchManager' ,permission: 'Batch Manager'},
    { icon: 'low_priority', title: 'Cycle Count', route: '/admin/cycleCounts' ,permission: 'Cycle Count Manager'},
    { icon: 'airline_stops', title: 'De-Allocate Orders', route: '#' ,permission: 'De-Allocate Orders'},
    { icon: 'assignment_ind', title: 'Employees', route: '/admin/employees' ,permission: 'Employees'},
    { icon: 'event_note', title: 'Event Log', route: '#' ,permission: 'Event Log Manager'},
    { icon: 'my_location', title: 'Location Assignment', route: '/admin/locationAssignment' ,permission: 'Location Assignment'},
    { icon: 'ads_click', title: 'Manual Transactions', route: '#' ,permission: 'Manual Transactions'},
    { icon: 'trolley', title: 'Move Items', route: '#' ,permission: 'Move Items'},
    { icon: 'tune', title: 'Preferences', route: '#' ,permission: 'Preferences'},
    { icon: 'published_with_changes', title: 'System Replenishment', route: '#' ,permission: 'Replenishment'},


  ];
  inductionMenus: any = [
    { icon: 'arrow_back', title: 'Induction Manager', route: '/dashboard', class: 'back-class' , permission: 'Induction Manager'},
    { icon: 'grid_view', title: 'Dashboard', route: '#' ,permission:'Induction Manager'},
   
    { icon: 'swipe_up_alt', title: 'Process Picks', route: '/InductionManager/ProcessPicks' ,permission:'Induction Manager'},
    { icon: 'swipe_down_alt', title: 'Process Put Aways', route: '/InductionManager/ProcessPutAways' ,permission:'Induction Manager'},
    { icon: 'manage_accounts', title: 'Admin', route: '#' ,permission:'Induction Manager'},
    { icon: 'edit_attributes', title: 'Mark Empty Reels', route: '#' ,permission:'Induction Manager'},
    { icon: 'linear_scale', title: 'Pallet Receiving', route: '#' ,permission:'Induction Manager'},
    { icon: 'line_style', title: 'Super Batch', route: '/InductionManager/SuperBatch' ,permission:'Induction Manager'},


  ];
  isParentMenu: boolean = true;
  isChildMenu: boolean = false;
  childMenus: any;
  constructor(private http: HttpClient,private router: Router,private authService: AuthService,private sharedService:SharedService, private globalService: GlobalconfigService) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
   this.isConfigUser =  localStorage.getItem('isConfigUser') ?? false;
  // console.log(this.isConfigUser);
    this.loadMenus({route: this.router.url});
    this.sharedService.updateAdminMenuObserver.subscribe(adminMenu => {
      if (adminMenu){
        this.childMenus = this.adminMenus;
        this.isParentMenu = false;
        this.isChildMenu = true;
      }
    });

    // this.sharedService.menuData$.subscribe(data => {
    //   this.menuData = data;
    //   let mednuAlter=[{title:'',icon:'',route:'',permission:''}]
    // this.dynamicMenu= this.menuData.map((item,index)=>{
      
    //   mednuAlter[index].title=item.displayname
    //   mednuAlter[index].icon=item.info.iconName
    //   mednuAlter[index].route=item.info.route
    //   mednuAlter[index].permission=item.info.permission
    //   return mednuAlter
    //   })
    //  console.log( this.dynamicMenu);
     
    // });
  }
  ngAfterViewInit(){
     // let menuFromStorage=JSON.parse(localStorage.getItem('availableApps')|| '');
  //   console.log(menuFromStorage);
  //   menuFromStorage.filter((item,i)=>{
  //     this.dynamicMenu[0]={icon: 'home', title: 'Home', route: '/dashboard' ,permission: 'Home'}
  //     this.dynamicMenu.push({icon:item.info.iconName,title:item.displayname,route:item.info.route,permission:item.info.permission})
  //   })

     this.sharedService.menuData$.subscribe(data => {
      
      if(this.menuData.length===0){
        this.menuData = data;

        this.menuData.filter((item,i)=>{
        this.dynamicMenu[0]={icon: 'home', title: 'Home', route: '/dashboard' ,permission: 'Home'}
        this.dynamicMenu.push({icon:item.info.iconName,title:item.displayname,route:item.info.route,permission:item.info.permission});
    //updating child menus with display names
        if(item.appname==='ICSAdmin'){
        let obj={ icon: 'arrow_back', title: `${item.displayname}`, route: '/dashboard', class: 'back-class' ,permission: 'Dashboard'}
        this.adminMenus.splice(0,1,obj);
      }else if(item.appname==='Induction'){
        let obj={ icon: 'arrow_back', title: `${item.displayname}`, route: '/dashboard', class: 'back-class' ,permission: 'Dashboard'}
        this.inductionMenus.splice(0,1,obj);
      }
      })
   
      }

    });
  }

  // let menuFromStorage=JSON.parse(localStorage.getItem('availableApps')|| '');
  //   console.log(menuFromStorage);
  //   menuFromStorage.filter((item,i)=>{
  //     this.dynamicMenu[0]={icon: 'home', title: 'Home', route: '/dashboard' ,permission: 'Home'}
  //     this.dynamicMenu.push({icon:item.info.iconName,title:item.displayname,route:item.info.route,permission:item.info.permission})
  //   })

// convertToObj(){
//   const arrayOfObjects: any = [];
//   for (const key of Object.keys(this.licAppData)) {
//     // arrayOfObjects.push({ key, value: this.licAppData[key] });
//     arrayOfObjects.push({
//       appname: this.licAppData[key].info.name,
//       displayname: this.licAppData[key].info.displayName,
//       license: this.licAppData[key].info.licenseString,
//       numlicense: this.licAppData[key].numLicenses,
//       status: this.licAppData[key].isLicenseValid ? 'Valid' : 'Invalid',
//       appurl: this.licAppData[key].info.url,
//       isButtonDisable: true,
//     });
//   }
//   this.dataSource = new MatTableDataSource(arrayOfObjects);
// }



  async getAppLicense() {

    this.globalService.get(null, '/GlobalConfig/AppLicense').subscribe(
      (res: any) => {
        if (res && res.data) {
          console.log(res.data);
          
        }
      },
      (error) => {}
    );
  }
  loadMenus(menu: any) {
    if(menu.route!='')
    {
        if (menu.route.includes('/admin')) {
          this.childMenus = this.adminMenus;
          this.isParentMenu = false;
          this.isChildMenu = true;
        }
        if (menu.route.includes('/InductionManager')) {
          this.childMenus = this.inductionMenus;
          this.isParentMenu = false;
          this.isChildMenu = true;
        }
        if (menu.route === '/dashboard') {
          this.isParentMenu = true;
          this.isChildMenu = false;
        }
        if (menu.route.includes('/globalconfig')) {
          this.childMenus = this.globalMenus;
          this.isParentMenu = false;
          this.isChildMenu = true;
        }    

        this.sharedService.updateLoggedInUser(this.userData.username,this.userData.wsid,menu.route);
  
      
    }



   
  }

  isAuthorized(controlName:any) {
     return !this.authService.isAuthorized(controlName);
  }

}

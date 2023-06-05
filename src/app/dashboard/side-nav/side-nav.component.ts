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
    { icon: 'insert_chart', title: 'Consolidation Manager', route: '/ConsolidationManager' ,permission: 'Consolidation Manager'},
    { icon: 'pending_actions', title: 'Order Manager', route: '/OrderManager' ,permission: 'Order Manager'},
    { icon: 'schema', title: 'FlowRack Replenishment', route: '/flowrack',permission: 'FlowRack Replenish' }
  ];
  globalMenus: any = [
    { icon: 'door_front', title: 'Home', route: '/globalconfig/home' ,permission: true},
    { icon: 'hub', title: 'Database Connections', route: '/globalconfig/database-connections' ,permission: true},
    { icon: 'print', title: 'Printers', route: '/globalconfig/printers' ,permission: ''},
    { icon: 'online_prediction', title: 'Workstation', route: '/globalconfig/workstation' ,permission: true},
    { icon: 'nest_wifi_gale', title: 'CCSIF', route: '/globalconfig/ccsif' ,permission: true},
    { icon: 'subtitles', title: 'Licensing', route: '/globalconfig/licensing' ,permission: true},
    { icon: 'subtitles', title: 'STE', route: '/globalconfig/ste' ,permission: true},

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
    { icon: 'ads_click', title: 'Manual Transactions', route: '/admin/manualTransactions' ,permission: 'Manual Transactions'},
    { icon: 'trolley', title: 'Move Items', route: '/admin/moveItems' ,permission: 'Move Items'},
    { icon: 'tune', title: 'Preferences', route: '#' ,permission: 'Preferences'},
    { icon: 'published_with_changes', title: 'System Replenishment', route: '/admin/systemReplenishment' ,permission: 'Replenishment'},
  ];
  inductionMenus: any = [
    { icon: 'arrow_back', title: 'Induction Manager', route: '/dashboard', class: 'back-class' , permission: 'Induction Manager'},
    // { icon: 'grid_view', title: 'Dashboard', route: '/dashboard' ,permission:'Induction Manager'},
    { icon: 'directions_alt', title: 'Process Picks', route: '/InductionManager/ProcessPicks' ,permission:'Tote Transactions'},
    { icon: 'dashboard', title: 'Process Put Aways', route: '/InductionManager/ProcessPutAways' ,permission:'Tote Transactions'},
    { icon: 'manage_accounts', title: 'Admin', route: '/InductionManager/Admin' ,permission:'Tote Admin Menu'},
    { icon: 'edit_attributes', title: 'Mark Empty Reels', route: '/InductionManager/MarkEmptyReels' ,permission:'Induction Manager'},
    { icon: 'linear_scale', title: 'Pallet Receiving', route: '/InductionManager/PalletReceiving' ,permission:'Induction Manager'},
    { icon: 'line_style', title: 'Super Batch', route: '/InductionManager/SuperBatch' ,permission:'Induction Manager'},
  ];

  consolidationMenus: any = [
    { icon: 'arrow_back', title: 'Consolidation Manager', route: '/ConsolidationManager', class: 'back-class' , permission: 'Consolidation Manager'},
    { icon: 'insert_chart', title: 'Consolidation', route: '/ConsolidationManager/Consolidation', class: 'back-class' , permission: 'Consolidation Manager'},
    // Vector
    { icon: 'add_location_alt', title: 'Staging Locations', route: '/ConsolidationManager/StagingLocations' ,permission:'Consolidation Manager'},
    // { icon: 'grid_view', title: 'Dashboard', route: '/dashboard' ,permission:'Induction Manager'},
    { icon: 'tune', title: ' Preferences ', route: '/ConsolidationManager/Preferences' ,permission:'Consolidation Mgr Admin'},
    // Vector (Stroke)
    { icon: 'analytics', title: 'Reporting ', route: '#' ,permission:'Consolidation Mgr Admin'},
     { icon: 'view_module', title: 'Order Status', route: '/ConsolidationManager/OrderStatus',paramsObj:{IsOrderStatus:true} ,permission:'Order Status'}
    //  flex_wrap
  ];

  inductionAdminMenus: any = [
    { icon: 'arrow_back', title: 'Induction Manager', route: '/InductionManager', class: 'back-class' , permission: 'Induction Manager'},
    // { icon: 'grid_view', title: 'Dashboard', route: '/dashboard' ,permission:'Induction Manager'},
    { icon: ' directions_alt', title: 'Inventory Map', route: '/InductionManager/Admin/InventoryMap' ,permission:'Induction Manager'},
    { icon: ' dashboard ', title: 'Inventory ', route: '/InductionManager/Admin/InventoryMaster' ,permission:'Induction Manager'},
    { icon: '  line_style  ', title: 'Tote Transaction Manager ', route: '/InductionManager/Admin/ToteTransactionManager' ,permission:'Induction Manager'},
    { icon: 'linear_scale   ', title: 'Manual Transactions ', route: '/InductionManager/Admin/ManualTransactions' ,permission:'Induction Manager'},
    { icon: 'elevator   ', title: 'Tote Manager ', route: '/InductionManager/Admin/ImToteManager' ,permission:'Induction Manager'},
    { icon: 'edit_attributes ', title: 'Transaction Journal ', route: '/InductionManager/Admin/TransactionJournal' ,permission:'Induction Manager'},
    { icon: '     manage_accounts     ', title: 'Reports ', route: '#' ,permission:'Induction Manager'},
    { icon: '      manage_accounts       ', title: 'Preferences ', route: '/InductionManager/Admin/AdminPrefrences' ,permission:'Induction Manager'},
  ];

  orderManagerMenus: any = [
    { icon: 'arrow_back', title: 'Order Manager', route: '/dashboard', class: 'back-class' , permission: 'Order Manager'},

    { icon: ' pending_actions', title: 'Order Manager', route: '/OrderManager/OrderManager' ,permission:'Admin Release Orders'},
    { icon: 'view_module', title: 'Order Status ', route: '/OrderManager/OrderStatus' ,permission:true},
    { icon: 'event_note', title: 'Event Log ', route: '#' ,permission:'Admin Release Orders'},
    { icon: 'dataset', title: 'Inventory Master Info', route: '/OrderManager/InventoryMaster' ,permission:'Admin Inventory Master'},  
    { icon: 'warehouse', title: 'Stock Location & Quantity ', route: '/OrderManager/InventoryMap' ,permission:'Admin Stock Locations'},
    { icon: 'analytics', title: 'Reports ', route: '#' ,permission:'Admin Reports'},
    { icon: 'tune', title: 'Preferences ', route: '/OrderManager/Preferences' ,permission:'Admin Preferences'},
  ];
  

  isParentMenu: boolean = true;
  isChildMenu: boolean = false;
  childMenus: any;
  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private sharedService:SharedService, 
              private globalService: GlobalconfigService) { 
                this.sharedService.SidebarMenupdate.subscribe((data: any) => {
                  var Menuobj = this.menus.find(x=>x.route == data);
                  if(Menuobj==null&&this.authService.UserPermissonByFuncName('Admin Menu'))Menuobj = this.adminMenus.find(x=>x.route == data);
                  else if(Menuobj==null) Menuobj = this.globalMenus.find(x=>x.route == data);
                  else if(Menuobj==null) Menuobj = this.inductionMenus.find(x=>x.route == data);
                  else if(Menuobj==null) Menuobj = this.inductionAdminMenus.find(x=>x.route == data);
                  else if(Menuobj==null) Menuobj = this.orderManagerMenus.find(x=>x.route == data);
                  this.loadMenus(Menuobj);
                });

              }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.isConfigUser =  localStorage.getItem('isConfigUser') ?? false;
    // console.log(this.isConfigUser);
    
    this.sharedService.startMenu.subscribe(res => {
      if (res){
        this.isParentMenu = true;
        this.isChildMenu = false;
      }
    });
  
    this.loadMenus({route: this.router.url});

    this.sharedService.updateAdminMenuObserver.subscribe(adminMenu => {
      if (adminMenu){
        this.childMenus = this.adminMenus;
        this.isParentMenu = false;
        this.isChildMenu = true;
      }
    });

    this.sharedService.updateInductionAdminObserver.subscribe(InvadminMenu => {
  
      if (InvadminMenu.menu === 'transaction-admin'){
        
        if (InvadminMenu.route.includes('/InductionManager/Admin/')) {
          this.inductionAdminMenus[0].route = '/InductionManager/Admin';
        } else {
          this.inductionAdminMenus[0].route = '/InductionManager';
        }

        this.childMenus = this.inductionAdminMenus;
        this.isParentMenu = false;  
        this.isChildMenu = true;
      }else if(InvadminMenu.menu === 'induction'){
        
        if (InvadminMenu.route.includes('/InductionManager/')) {
          this.inductionMenus[0].route = '/InductionManager';
        } else {
          this.inductionMenus[0].route = '/dashboard';
        }

        this.childMenus = this.inductionMenus;
        this.isParentMenu = false;
        this.isChildMenu = true;
      }
      else if(InvadminMenu.route.includes('/ConsolidationManager')){
        
      


          let splittedRoute=InvadminMenu.route.split('/');
          if(splittedRoute[2]===undefined){
            this.consolidationMenus[0].route='/dashboard'
          }else{
            this.consolidationMenus[0].route='/ConsolidationManager'
          }
      

        this.childMenus = this.consolidationMenus;
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
      else if(item.appname==='OrderManager'){
        let obj={ icon: 'arrow_back', title: `${item.displayname}`, route: '/dashboard', class: 'back-class' ,permission: 'Dashboard'}
        this.orderManagerMenus.splice(0,1,obj);
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
          // console.log(res.data);
          
        }
      },
      (error) => {}
    );
  }

  loadMenus(menu: any) { 
    // console.log(this.router.url);    
    this.sharedService.updateLoggedInUser(this.userData.userName,this.userData.wsid,menu.route);
    if (!menu) {
      menu = {route : '/dashboard'};      
    }

    if(menu.route!='')
    {
      if (menu.route.includes('/admin')) {
        if (menu.route.includes('/admin/')) {
          this.adminMenus[0].route = '/admin';
        } else {
          this.adminMenus[0].route = '/dashboard';
        }
        this.childMenus = this.adminMenus;
        this.isParentMenu = false;
        this.isChildMenu = true;
        return;
      }
      if (menu.route.includes('/InductionManager') && menu.route != '/InductionManager/Admin' && !menu.route.includes('/InductionManager/Admin')) {
        if (menu.route.includes('/InductionManager/')) {
          this.inductionMenus[0].route = '/InductionManager';
        } else {
          this.inductionMenus[0].route = '/dashboard';
        }
        this.childMenus = this.inductionMenus;
        this.isParentMenu = false;
        this.isChildMenu = true;
        return;
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

      //this.userData.username
         
    }
    if (menu.route.includes('/ConsolidationManager')) {
      let splittedRoute=menu.route.split('/');
      if(splittedRoute[2]===undefined){
        this.consolidationMenus[0].route='/dashboard'
      }else{
        this.consolidationMenus[0].route='/ConsolidationManager'
        
      }
      this.childMenus = this.consolidationMenus;
      this.isParentMenu = false;
      this.isChildMenu = true;
      return
    } 
    if (menu.route.includes('/InductionManager')) {
      this.childMenus = this.inductionMenus;
      this.isParentMenu = false;
      this.isChildMenu = true;
    }
    if (menu.route.includes('/OrderManager')) {
        let splittedRoute=menu.route.split('/');
      if(splittedRoute[2]===undefined){
        this.orderManagerMenus[0].route='/dashboard'
        
      }else{
        this.orderManagerMenus[0].route='/OrderManager'
        
      }
      this.childMenus = this.orderManagerMenus;
      this.isParentMenu = false;
      this.isChildMenu = true;
      return
    }

    if (menu.route.includes('/InductionManager/Admin')) {
      if (menu.route.includes('/InductionManager/Admin/')) {
        this.inductionAdminMenus[0].route = '/InductionManager/Admin';
      } else {
        this.inductionAdminMenus[0].route = '/InductionManager';
      }
      this.childMenus = this.inductionAdminMenus;
      this.isParentMenu = false;
      this.isChildMenu = true;
      return;
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
  }

  isAuthorized(controlName:any) {
     return !this.authService.UserPermissonByFuncName(controlName);
  }

}

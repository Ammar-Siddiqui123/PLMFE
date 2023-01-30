import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../app/services/shared.service';
import { AuthService } from '../../../app/init/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() sideBarOpen: Boolean;

  menus: any = [
    { icon: 'home', title: 'Home', route: '/dashboard' ,permission: 'Home'},
    { icon: 'electric_bolt', title: 'Import Export', route: '#' ,permission: 'Import Export'},
    { icon: 'manage_accounts', title: 'Admin', route: '/admin', permission: 'Admin Menu'},
    { icon: 'checklist', title: 'Induction Manager', route: '/InductionManager' ,permission: 'Induction Manager'},
    { icon: 'fact_check', title: 'Work Manager', route: '#' ,permission: 'Work Manager'},
    { icon: 'insert_chart', title: 'Consolidation Manager', route: '#' ,permission: 'Consolidation Manager'},
    { icon: 'pending_actions', title: 'Order Manager', route: '#' ,permission: 'Order Manager'},
    { icon: 'schema', title: 'FlowRack Replenish', route: '#',permission: 'FlowRack Replenish' }
  ];
  globalMenus: any = [
    { icon: 'door_front', title: 'Home', route: '/globalconfig/dashboard' ,permission: 'Home'},
    { icon: 'hub', title: 'Database Connections', route: '/globalconfig/database-connections' ,permission: 'Database Connections'},
    { icon: 'print', title: 'Printers', route: '/globalconfig/printers' ,permission: 'Printers'},
    { icon: 'online_prediction', title: 'Workstation', route: '/globalconfig/workstation' ,permission: 'Workstations'},
    { icon: 'nest_wifi_gale', title: 'CCSIF', route: '#' ,permission: 'CCSIF'},
    { icon: 'subtitles', title: 'Licensing', route: '/globalconfig/licensing' ,permission: 'Licensing'},

  ];
  adminMenus: any = [
    { icon: 'arrow_back', title: 'Admin', route: '/dashboard', class: 'back-class' ,permission: 'Dashboard'},
    { icon: 'assignment_ind', title: 'Employees', route: '/admin/employees' ,permission: 'Employees'},
    { icon: 'tune', title: 'Preferences', route: '#' ,permission: 'Preferences'},
    { icon: 'published_with_changes', title: 'System Replenishment', route: '#' ,permission: 'Replenishment'},
    { icon: 'directions_alt', title: 'Inventory Map', route: '/admin/inventoryMap' ,permission: 'Inventory Map'},
    { icon: 'list_alt', title: 'Batch Manager', route: '/admin/batchManager' ,permission: 'Batch Manager'},
    { icon: 'analytics', title: 'Reports', route: '#' ,permission: 'Reports'},
    { icon: 'my_location', title: 'Location Assignment', route: '/admin/locationAssignment' ,permission: 'Location Assignment'},
    { icon: 'low_priority', title: 'Cycle Count', route: '/admin/cycleCounts' ,permission: 'Cycle Count Manager'},
    { icon: 'trolley', title: 'Move Items', route: '#' ,permission: 'Move Items'},
    { icon: 'dvr', title: 'Transactions', route: '/admin/transaction' ,permission: 'Transaction Journal'},
    { icon: 'ads_click', title: 'Manual Transactions', route: '#' ,permission: 'Manual Transactions'},
    { icon: 'event_note', title: 'Event Log', route: '#' ,permission: 'Event Log Manager'},
    { icon: 'airline_stops', title: 'De-Allocate Orders', route: '#' ,permission: 'De-Allocate Orders'},
    { icon: 'dashboard', title: 'Inventory', route: '/admin/inventoryMaster',permission: 'Inventory' },

  ];
  inductionMenus: any = [
    { icon: 'arrow_back', title: 'Induction Manager', route: '/dashboard', class: 'back-class' , permission: 'Induction Manager'},
    { icon: 'grid_view', title: 'Dashboard', route: '#' ,permission:'Induction Manager'},
    { icon: 'swipe_down_alt', title: 'Process Put Aways', route: '#' ,permission:'Induction Manager'},
    { icon: 'swipe_up_alt', title: 'Process Picks', route: '#' ,permission:'Induction Manager'},
    { icon: 'line_style', title: 'Super Batch', route: '/InductionManager/SuperBatch' ,permission:'Induction Manager'},
    { icon: 'linear_scale', title: 'Pallet Receiving', route: '#' ,permission:'Induction Manager'},
    { icon: 'edit_attributes', title: 'Mark Empty Reels', route: '#' ,permission:'Induction Manager'},
    { icon: 'manage_accounts', title: 'Admin', route: '#' ,permission:'Induction Manager'},

  ];
  isParentMenu: boolean = true;
  isChildMenu: boolean = false;
  childMenus: any;
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.loadMenus({route: this.router.url});
  }

  loadMenus(menu: any) {
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
    if (menu.route.includes('globalconfig')) {
      this.childMenus = this.globalMenus;
      this.isParentMenu = false;
      this.isChildMenu = true;
    }
    // || !menu.route.includes('/globalconfig')
    if (menu.route === '/dashboard') {
      this.isParentMenu = true;
      this.isChildMenu = false;
    }    
  }

  isAuthorized(controlName:any) {
    //  return !this.authService.isAuthorized(controlName);
  }

}

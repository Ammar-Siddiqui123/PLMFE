import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() sideBarOpen: Boolean;

  menus: any = [
    { icon: 'home', title: 'Home', route: '/dashboard' },
    { icon: 'electric_bolt', title: 'Import Export', route: '#' },
    { icon: 'manage_accounts', title: 'Admin', route: '/admin' },
    { icon: 'checklist', title: 'Induction Manager', route: '#' },
    { icon: 'fact_check', title: 'Work Manager', route: '#' },
    { icon: 'insert_chart', title: 'Consolidation Manager', route: '#' },
    { icon: 'pending_actions', title: 'Order Manager', route: '#' },
    { icon: 'schema', title: 'FlowRack Replenish', route: '#' }
  ];
  adminMenus: any = [
    { icon: 'arrow_back', title: 'Admin', route: '/dashboard', class: 'back-class' },
    { icon: 'assignment_ind', title: 'Employee', route: '/admin/employees' },
    { icon: 'tune', title: 'Preferences', route: '#' },
    { icon: 'published_with_changes', title: 'System Replenishment', route: '#' },
    { icon: 'directions_alt', title: 'Inventory Map', route: '/admin/inventoryMap' },
    { icon: 'list_alt', title: 'Batch Manager', route: '/admin/batchManager' },
    { icon: 'analytics', title: 'Reports', route: '#' },
    { icon: 'my_location', title: 'Location Assignment', route: '/admin/locationAssignment' },
    { icon: 'low_priority', title: 'Cycle Count', route: '/admin/cycleCounts' },
    { icon: 'trolley', title: 'Move Item', route: '#' },
    { icon: 'dvr', title: 'Transactions', route: '#' },
    { icon: 'ads_click', title: 'Manual Transactions', route: '#' },
    { icon: 'event_note', title: 'Event Logs', route: '#' },
    { icon: 'airline_stops', title: 'De-allocate Orders', route: '#' },
    { icon: 'dashboard', title: 'Inventory', route: '/admin/inventoryMaster' }
  ];
  isParentMenu: boolean = true;
  isChildMenu: boolean = false;
  childMenus: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadMenus({route: this.router.url});
    // console.log(this.router.url);
  }

  loadMenus(menu: any) {

    if (menu.route.includes('/admin')) {
      this.childMenus = this.adminMenus;
      this.isParentMenu = false;
      this.isChildMenu = true;
    }
    if (menu.route === '/dashboard') {
      this.isParentMenu = true;
      this.isChildMenu = false;
    }

  }

}

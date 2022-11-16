import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
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
    { icon: 'assignment_ind', title: 'Employee', route: '/employees' },
    { icon: 'tune', title: 'Preferences', route: '#' },
    { icon: 'published_with_changes', title: 'System Replenishment', route: '#' },
    { icon: 'directions_alt', title: 'Inventery Map', route: '#' },
    { icon: 'list_alt', title: 'Batch Manager', route: '#' },
    { icon: 'analytics', title: 'Reports', route: '#' },
    { icon: 'my_location', title: 'Location Assignment', route: '#' },
    { icon: 'low_priority', title: 'Cycle Count', route: '#' },
    { icon: 'blur_short', title: 'Move Item', route: '#' },
    { icon: 'dvr', title: 'Transactions', route: '#' },
    { icon: 'ads_click', title: 'manual Transactions', route: '#' },
    { icon: 'event_note', title: 'Event Logs', route: '#' },
    { icon: 'airline_stops', title: 'De-allocate Orders', route: '#' },
    { icon: 'original', title: 'Inventory', route: '#' }
  ];
  isParentMenu: boolean = true;
  isChildMenu: boolean = false;
  childMenus: any;
  constructor() { }

  ngOnInit(): void {
  }

  loadChildMenu(menu: any) {
    // console.log(menu);
    if (menu.route === '/admin') {
      this.childMenus = this.adminMenus;
      this.isParentMenu = false;
      this.isChildMenu = true;
    }


  }
  loadParentMenu(menu: any) {
    if (menu.route === '/dashboard') {
      this.isParentMenu = true;
      this.isChildMenu = false;
    }
  }

}

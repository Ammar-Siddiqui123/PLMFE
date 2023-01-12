import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    { icon: 'dvr', title: 'Transactions', route: '#' ,permission: 'Transaction Journal'},
    { icon: 'ads_click', title: 'Manual Transactions', route: '#' ,permission: 'Manual Transactions'},
    { icon: 'event_note', title: 'Event Log', route: '#' ,permission: 'Event Log Manager'},
    { icon: 'airline_stops', title: 'De-Allocate Orders', route: '#' ,permission: 'De-Allocate Orders'},
    { icon: 'dashboard', title: 'Inventory', route: '/admin/inventoryMaster',permission: 'Inventory' }
  ];
  constructor() { }
  
  IsloggedIn(){
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return !!user._token;
  }

  userData(){
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  private userPermission(){
    if(localStorage.getItem('userRights')){
      return JSON.parse(localStorage.getItem('userRights') || '{}');
    }
  }

  isAuthorized(perm:any){
    // console.log(this.userPermission());
    return this.userPermission().includes(perm)
    // console.log(this.userPermission().includes('Admin Menu'))
  }
  isAllowedUrl(){
    
  }
}

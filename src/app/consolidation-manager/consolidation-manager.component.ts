import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../init/auth.service';

@Component({
  selector: 'app-consolidation-manager',
  templateUrl: './consolidation-manager.component.html',
  styleUrls: ['./consolidation-manager.component.scss']
})
export class ConsolidationManagerComponent implements OnInit {

  tab_hover_color:string = '#cf9bff3d';

  constructor(private sharedService: SharedService,
              public authService: AuthService,) { }

  ngOnInit(): void {
  }

  updateMenu(menu = '', route = ''){
    // if (menu == 'transaction-admin') {
    //   this.sharedService.updateInductionAdminMenu(menu);
    // }    
    this.sharedService.updateInductionAdminMenu({menu , route});

  }
  isAuthorized(controlName:any) {
    return !this.authService.isAuthorized(controlName);
 }

}

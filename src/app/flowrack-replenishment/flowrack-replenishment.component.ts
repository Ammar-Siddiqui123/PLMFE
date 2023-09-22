import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../init/auth.service';

@Component({
  selector: 'app-flowrack-replenishment',
  templateUrl: './flowrack-replenishment.component.html',
  styleUrls: ['./flowrack-replenishment.component.scss']
})


export class FlowrackReplenishmentComponent implements OnInit {

  tab_hover_color:string = '#cf9bff3d';

  constructor(private sharedService: SharedService,
              public authService: AuthService,) { }

  ngOnInit(): void {
  }

  updateMenu(menu = '', route = ''){   
    this.sharedService.updateInductionAdminMenu({menu , route});

  }
  isAuthorized(controlName:any) {
    return !this.authService.isAuthorized(controlName);
 }

}
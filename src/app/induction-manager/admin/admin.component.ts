import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  tab_hover_color:string = '#cf9bff3d';

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  updateMenu(menu = '', route = '') {    
    this.sharedService.updateInductionAdminMenu({menu , route});
  }

}

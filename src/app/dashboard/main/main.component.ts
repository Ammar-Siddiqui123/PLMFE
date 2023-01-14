import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../app/services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tab_hover_color:string = '#cf9bff3d';

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  updateMenu(){
    console.log(this.sharedService.updateSidebar());
    this.sharedService.updateSidebar();
  }

}

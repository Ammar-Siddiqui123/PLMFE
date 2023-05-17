import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ste-services',
  templateUrl: './ste-services.component.html',
  styleUrls: ['./ste-services.component.scss']
})
export class SteServicesComponent implements OnInit {
  sideBarOpen: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

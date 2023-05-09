import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ccsif',
  templateUrl: './ccsif.component.html',
  styleUrls: ['./ccsif.component.scss']
})
export class CcsifComponent implements OnInit {
  sideBarOpen: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  tab_hover_color:string = '#cf9bff3d';
  constructor() { }

  ngOnInit(): void {
  }

}

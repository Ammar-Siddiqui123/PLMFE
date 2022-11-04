import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tab_hover_color:string = '#cf9bff3d';

  constructor() { }

  ngOnInit(): void {
  }

}

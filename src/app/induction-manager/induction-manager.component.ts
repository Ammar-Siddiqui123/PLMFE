import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-induction-manager',
  templateUrl: './induction-manager.component.html',
  styleUrls: ['./induction-manager.component.scss']
})
export class InductionManagerComponent implements OnInit {
  tab_hover_color:string = '#cf9bff3d';
  constructor() { }

  ngOnInit(): void {
  }

}

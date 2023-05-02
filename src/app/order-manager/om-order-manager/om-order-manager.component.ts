import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-om-order-manager',
  templateUrl: './om-order-manager.component.html',
  styleUrls: ['./om-order-manager.component.scss']
})
export class OmOrderManagerComponent implements OnInit {
  toteTable:any[]=['10','10','10','10','10','10'];
  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = [
  'transType',
  'orderNo',
  'priority',
  'requiredDate',
  'uf1',
  'uf2',
  'uf3',
  'actions']; 

}

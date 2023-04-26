import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
];

@Component({
  selector: 'app-cm-shipping',
  templateUrl: './cm-shipping.component.html',
  styleUrls: ['./cm-shipping.component.scss']
})
export class CmShippingComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'ex', 'srno', 'replishment', 'case', 'transaction', 'replenish', 'exists', 'action'];
  tableData = ELEMENT_DATA;

  constructor() { }
  

  ngOnInit(): void {
  }

}
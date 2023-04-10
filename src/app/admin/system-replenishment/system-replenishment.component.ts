import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export interface NewPeriodicElement {
transtype: string;
ordernumber: string;
priority: string;
requireddate: string;
userfield1: string;
userfield2: string;
userfield3: string;
}

const ELEMENT_NEWDATA: NewPeriodicElement[] = [
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},
  {transtype: '10A', ordernumber: '10A', priority: '10A', requireddate: '10A', userfield1: '10A', userfield2: '10A', userfield3: '10A'},
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},
  {transtype: '10A', ordernumber: '10A', priority: '10A', requireddate: '10A', userfield1: '10A', userfield2: '10A', userfield3: '10A'},
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},
  {transtype: '10A', ordernumber: '10A', priority: '10A', requireddate: '10A', userfield1: '10A', userfield2: '10A', userfield3: '10A'},
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},

];

@Component({
  selector: 'app-system-replenishment',
  templateUrl: './system-replenishment.component.html',
  styleUrls: ['./system-replenishment.component.scss']
})
export class SystemReplenishmentComponent implements OnInit {

  displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol', 'ex', 'srno','replishment','case','transaction','replenish','exists','allocated_pick', 'action', ];
  tableData = ELEMENT_DATA;

  displayedColumns2: string[] = ['transtype', 'ordernumber', 'priority', 'requireddate', 'userfield1', 'userfield2', 'userfield3' ];
  newData = ELEMENT_NEWDATA;


  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

}


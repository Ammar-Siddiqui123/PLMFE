import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  zone: string;
  trans_type: number;
  warehouse: string;
  location: string;
  lines: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {zone: 'Hydrogen',trans_type: 1.0079, warehouse: 'H', location: 'Hydrogen', lines:'H' },
  {zone: 'Helium',trans_type: 4.0026, warehouse: 'He', location: 'Hydrogen', lines:'H'},
  {zone: 'Lithium',trans_type: 6.941, warehouse: 'Li', location: 'Hydrogen', lines:'H'},
  {zone: 'Beryllium',trans_type: 9.0122, warehouse: 'Be', location: 'Hydrogen', lines:'H'},
  {zone: 'Boron',trans_type: 10.811, warehouse: 'B', location: 'Hydrogen', lines:'H'},
  {zone: 'Carbon',trans_type: 12.0107, warehouse: 'C', location: 'Hydrogen', lines:'H'},
  {zone: 'Nitrogen',trans_type: 14.0067, warehouse: 'N', location: 'Hydrogen', lines:'H'},
  {zone: 'Oxygen',trans_type: 15.9994, warehouse: 'O', location: 'Hydrogen', lines:'H'},
  {zone: 'Fluorine',trans_type: 18.9984, warehouse: 'F', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
  { zone: 'Neon',trans_type: 20.1797, warehouse: 'Ne', location: 'Hydrogen', lines:'H'},
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['zone', 'trans_type', 'warehouse', 'location', 'lines'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }



}

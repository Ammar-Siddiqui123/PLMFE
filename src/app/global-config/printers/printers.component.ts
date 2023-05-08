import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss']
})
export class PrintersComponent implements OnInit {
  sideBarOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  displayedColumns: string[] = ['printerName', 'printerAddress', 'labelPrinter', 'actions'];
  toteTable:any[]=['10','10','10','10','10','10'];

}

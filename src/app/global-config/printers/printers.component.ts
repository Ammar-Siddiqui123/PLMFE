import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GcPrintServiceTestBeginComponent } from 'src/app/dialogs/gc-print-service-test-begin/gc-print-service-test-begin.component';
import { GcPrintServiceTestComponent } from 'src/app/dialogs/gc-print-service-test/gc-print-service-test.component';

@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss']
})
export class PrintersComponent implements OnInit {
  sideBarOpen: boolean = true;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  displayedColumns: string[] = ['printerName', 'printerAddress', 'labelPrinter', 'actions'];
  toteTable:any[]=['10','10','10','10','10','10'];

  openGcBeginTest() { 
    let dialogRef = this.dialog.open(GcPrintServiceTestBeginComponent, { 
      height: 'auto',
      width: '1424px',
      autoFocus: '__non_existing_element__', 
    })
    }




  openGcPrintServiceTest() {
  let dialogRef = this.dialog.open(GcPrintServiceTestComponent, {
    height: 'auto',
    width: '680px',
    autoFocus: '__non_existing_element__',
   
  })
  dialogRef.afterClosed().subscribe(result => {
    
    
  })
 }

}

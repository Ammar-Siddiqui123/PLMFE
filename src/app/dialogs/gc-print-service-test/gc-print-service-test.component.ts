import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GcPrintServiceTestBeginComponent } from '../gc-print-service-test-begin/gc-print-service-test-begin.component';

@Component({
  selector: 'app-gc-print-service-test',
  templateUrl: './gc-print-service-test.component.html',
  styleUrls: ['./gc-print-service-test.component.scss']
})
export class GcPrintServiceTestComponent implements OnInit {
  ELEMENT_DATA = [{ select: "Xerox"},
  { select: "Brother Label"}];
  
  displayedColumns: any[] = ['select'];
  dataSource = (this.ELEMENT_DATA);
 
  ELEMENT_DATA_1 = [{ select:"Xerox Lists"},
  { select:"CutePDF"},
  { select:"Jon Desktop"}];
  displayedColumns_1: any[] = ['select'];
  dataSource_1 = (this.ELEMENT_DATA);


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openGcBeginTest() { 
    let dialogRef = this.dialog.open(GcPrintServiceTestBeginComponent, { 
      height: 'auto',
      width: '1424px',
      autoFocus: '__non_existing_element__', 
    })
    }

}

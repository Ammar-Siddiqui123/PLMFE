import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gc-print-service-test-begin',
  templateUrl: './gc-print-service-test-begin.component.html',
  styleUrls: ['./gc-print-service-test-begin.component.scss']
})
export class GcPrintServiceTestBeginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['fileName', 'errorType', 'errorMessage', 'lineNumber', 'storedProcedure'];
  toteTable:any[]=['10','10','10','10','10','10','10'];

  displayedColumns1: string[] = ['responseReceived', 'success', 'workStation', 'fileName', 'printer', 'errorMessage', 'storedProcedure'];
}

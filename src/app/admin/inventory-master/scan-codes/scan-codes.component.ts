import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scan-codes',
  templateUrl: './scan-codes.component.html',
  styleUrls: ['./scan-codes.component.scss']
})
export class ScanCodesComponent implements OnInit {

  @Input() scanCodes: FormGroup;
  public userData: any;

  constructor() { }

  ngOnInit(): void {
  }

  openPrintRangeDialog(){

  }
  addCatRow(e: any){

  }

  dltCategory(e1: any, e2: any){

  }

  saveCategory(e1: any, e2: any , e3: any , e4: any){

  }
  
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-kit-item',
  templateUrl: './kit-item.component.html',
  styleUrls: ['./kit-item.component.scss']
})
export class KitItemComponent implements OnInit {

  @Input() kitItem: FormGroup;
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

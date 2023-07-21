import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-om-add-transaction',
  templateUrl: './om-add-transaction.component.html',
  styleUrls: ['./om-add-transaction.component.scss']
})
export class OmAddTransactionComponent implements OnInit {
  @ViewChild('procc_focus') procc_focus: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.procc_focus.nativeElement.focus();
  }
}

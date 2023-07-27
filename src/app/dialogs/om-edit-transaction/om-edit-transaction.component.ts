import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-om-edit-transaction',
  templateUrl: './om-edit-transaction.component.html',
  styleUrls: ['./om-edit-transaction.component.scss']
})
export class OmEditTransactionComponent implements OnInit {
  @ViewChild('proc_focus') proc_focus: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.proc_focus.nativeElement.focus();
  }
}

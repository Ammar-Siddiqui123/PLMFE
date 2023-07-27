import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-print-range',
  templateUrl: './print-range.component.html',
  styleUrls: ['./print-range.component.scss']
})
export class PrintRangeComponent implements OnInit {
  @ViewChild('begin_loc') begin_loc: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.begin_loc.nativeElement.focus();
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cr-edit-design-test-data',
  templateUrl: './cr-edit-design-test-data.component.html',
  styleUrls: ['./cr-edit-design-test-data.component.scss']
})
export class CrEditDesignTestDataComponent implements OnInit {
  @ViewChild('desc_focus') desc_focus: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.desc_focus.nativeElement.focus();
  }
}

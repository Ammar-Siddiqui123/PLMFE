import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-transfer-file-path',
  templateUrl: './transfer-file-path.component.html',
  styleUrls: ['./transfer-file-path.component.scss']
})
export class TransferFilePathComponent implements OnInit {
  @ViewChild('field_focus') field_focus: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.field_focus.nativeElement.focus();
  }
}

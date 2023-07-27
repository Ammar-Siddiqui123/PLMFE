import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-br-choose-report-type',
  templateUrl: './br-choose-report-type.component.html',
  styleUrls: ['./br-choose-report-type.component.scss']
})
export class BrChooseReportTypeComponent implements OnInit {
  @ViewChild('exp_file') exp_file: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.exp_file.nativeElement.focus();
  }
}


function BrChooseReportTypeDialogue() {
  throw new Error('Function not implemented.');
}


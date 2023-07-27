import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-range',
  templateUrl: './print-range.component.html',
  styleUrls: ['./print-range.component.scss']
})
export class PrintRangeComponent implements OnInit {
  @ViewChild('begin_loc') begin_loc: ElementRef;
  constructor(
    private route: Router,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.begin_loc.nativeElement.focus();
  }

  printRange(){
    this.dialogRef.close();
    this.route.navigateByUrl(`/report-view?file=LocLabel-lbl`);
  }
}

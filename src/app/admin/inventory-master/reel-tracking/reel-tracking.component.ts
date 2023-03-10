import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reel-tracking',
  templateUrl: './reel-tracking.component.html',
  styleUrls: ['./reel-tracking.component.scss']
})
export class ReelTrackingComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @ViewChild('addItemAction') addItemTemp: TemplateRef<any>;
  @Input() reelTracking: FormGroup;
  public userData: any;

  ngOnInit(): void {
  }
  addItemDialog(): void {
    const dialogRef = this.dialog.open(this.addItemTemp, {
      width: '450px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }
}

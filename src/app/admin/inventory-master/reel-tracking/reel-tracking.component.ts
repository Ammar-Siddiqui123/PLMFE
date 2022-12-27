import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reel-tracking',
  templateUrl: './reel-tracking.component.html',
  styleUrls: ['./reel-tracking.component.scss']
})
export class ReelTrackingComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @ViewChild('addItemAction') addItemTemp: TemplateRef<any>;

  ngOnInit(): void {
  }
  addItemDialog(): void {
    const dialogRef = this.dialog.open(this.addItemTemp, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}

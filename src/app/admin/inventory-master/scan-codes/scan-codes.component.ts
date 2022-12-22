import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-scan-codes',
  templateUrl: './scan-codes.component.html',
  styleUrls: ['./scan-codes.component.scss']
})
export class ScanCodesComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @ViewChild('scanCodes') scanCodes: TemplateRef<any>;

  ngOnInit(): void {
  }
  scanCodesDialog(): void {
    const dialogRef = this.dialog.open(this.scanCodes, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}

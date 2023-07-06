import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrEditDesignTestDataComponent } from '../cr-edit-design-test-data/cr-edit-design-test-data.component';

@Component({
  selector: 'app-cr-add-new-custom-report',
  templateUrl: './cr-add-new-custom-report.component.html',
  styleUrls: ['./cr-add-new-custom-report.component.scss']
})
export class CrAddNewCustomReportComponent implements OnInit {

  constructor( private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openEditDesign() {
    const dialogRef = this.dialog.open(CrEditDesignTestDataComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrAddNewCustomReportComponent } from 'src/app/dialogs/cr-add-new-custom-report/cr-add-new-custom-report.component';

@Component({
  selector: 'app-custom-reports-and-labels',
  templateUrl: './custom-reports-and-labels.component.html',
  styleUrls: ['./custom-reports-and-labels.component.scss']
})
export class CustomReportsAndLabelsComponent implements OnInit {

  constructor( private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  CrAddNewCustomReportDialogue() {
    const dialogRef = this.dialog.open(CrAddNewCustomReportComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
  
  }

}

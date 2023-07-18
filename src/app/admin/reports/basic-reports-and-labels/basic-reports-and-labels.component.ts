import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrChooseReportTypeComponent } from 'src/app/dialogs/br-choose-report-type/br-choose-report-type.component';

@Component({
  selector: 'app-basic-reports-and-labels',
  templateUrl: './basic-reports-and-labels.component.html',
  styleUrls: ['./basic-reports-and-labels.component.scss']
})
export class BasicReportsAndLabelsComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {order_no: '1202122'},
    {order_no: '1202122'},
    {order_no: '1202122'},
  ]

    displayedColumns: string[] = ['fields','expression_type','value_to_test','actions'];
    tableData = this.ELEMENT_DATA
    dataSourceList:any

      
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  BrChooseReportTypeDialogue() {
    const dialogRef = this.dialog.open(BrChooseReportTypeComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
    });
  
  }

}

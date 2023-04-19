import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRangeComponent } from 'src/app/dialogs/delete-range/delete-range.component';
import { PrintReplenLabelsComponent } from 'src/app/dialogs/print-replen-labels/print-replen-labels.component';
import { SrDeleteOrderComponent } from 'src/app/dialogs/sr-delete-order/sr-delete-order.component';

export interface NewPeriodicElement {
transtype: string;
ordernumber: string;
priority: string;
requireddate: string;
userfield1: string;
userfield2: string;
userfield3: string;
}

const ELEMENT_NEWDATA: NewPeriodicElement[] = [
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},
  {transtype: '10A', ordernumber: '10A', priority: '10A', requireddate: '10A', userfield1: '10A', userfield2: '10A', userfield3: '10A'},
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},
  {transtype: '10A', ordernumber: '10A', priority: '10A', requireddate: '10A', userfield1: '10A', userfield2: '10A', userfield3: '10A'},
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},
  {transtype: '10A', ordernumber: '10A', priority: '10A', requireddate: '10A', userfield1: '10A', userfield2: '10A', userfield3: '10A'},
  {transtype: '05', ordernumber: '05', priority: '05', requireddate: '05', userfield1: '05', userfield2: '05', userfield3: '05'},

];

@Component({
  selector: 'app-system-replenishment',
  templateUrl: './system-replenishment.component.html',
  styleUrls: ['./system-replenishment.component.scss']
})
export class SystemReplenishmentComponent implements OnInit {

  displayedColumns2: string[] = ['transtype', 'ordernumber', 'priority', 'requireddate', 'userfield1', 'userfield2', 'userfield3', 'action' ];
  newData = ELEMENT_NEWDATA;


  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  deleteRange(): void {
    const dialogRef = this.dialog.open(DeleteRangeComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }
  printLabels(): void {
    const dialogRef = this.dialog.open(PrintReplenLabelsComponent, {
      width: '1132px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }

  deleteSelectedOrder(): void {
    const dialogRef = this.dialog.open(SrDeleteOrderComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }


}


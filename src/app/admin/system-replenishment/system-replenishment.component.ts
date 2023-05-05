import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DeleteRangeComponent } from 'src/app/dialogs/delete-range/delete-range.component';
import { PrintReplenLabelsComponent } from 'src/app/dialogs/print-replen-labels/print-replen-labels.component';
import { SrDeleteOrderComponent } from 'src/app/dialogs/sr-delete-order/sr-delete-order.component';

@Component({
  selector: 'app-system-replenishment',
  templateUrl: './system-replenishment.component.html',
  styleUrls: ['./system-replenishment.component.scss']
})
export class SystemReplenishmentComponent implements OnInit {

  constructor(private dialog: MatDialog,) { }

  refreshCurrentOrders:Subject<any> = new Subject();
  replenishmentsProcessed:boolean = false;
  refreshNewOrders:Subject<any> = new Subject();
  replenishmentsDeleted:boolean = false;

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

  activeTabIndex:number = 0;
  onTabChanged(event:any){
    this.activeTabIndex = event.index;
    if(this.activeTabIndex == 0 && this.replenishmentsDeleted){
      this.refreshNewOrders.next(1);
      this.replenishmentsDeleted = false;
    }
    if(this.activeTabIndex == 1 && this.replenishmentsProcessed){
      this.refreshCurrentOrders.next(1);
      this.replenishmentsProcessed = false;
    }
  }

}


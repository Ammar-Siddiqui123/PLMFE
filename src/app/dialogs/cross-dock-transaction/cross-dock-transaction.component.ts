import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReprocessTransactionDetailViewComponent } from '../reprocess-transaction-detail-view/reprocess-transaction-detail-view.component';

@Component({
  selector: 'app-cross-dock-transaction',
  templateUrl: './cross-dock-transaction.component.html',
  styleUrls: ['./cross-dock-transaction.component.scss']
})
export class CrossDockTransactionComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openReprocessTransactionViewDialogue() {
    const dialogRef = this.dialog.open(ReprocessTransactionDetailViewComponent, {
      height: 'auto',
      width: '70vw',
      autoFocus: '__non_existing_element__'
    })
  }
}

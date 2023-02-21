import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrossDockTransactionComponent } from '../cross-dock-transaction/cross-dock-transaction.component';

@Component({
  selector: 'app-selection-transaction-for-tote-extend',
  templateUrl: './selection-transaction-for-tote-extend.component.html',
  styleUrls: ['./selection-transaction-for-tote-extend.component.scss']
})
export class SelectionTransactionForToteExtendComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openCrossDockTransactionDialogue() {
    const dialogRef = this.dialog.open(CrossDockTransactionComponent, {
      height: 'auto',
      width: '70vw',
      autoFocus: '__non_existing_element__'
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectionTransactionForToteExtendComponent } from '../selection-transaction-for-tote-extend/selection-transaction-for-tote-extend.component';

@Component({
  selector: 'app-selection-transaction-for-tote',
  templateUrl: './selection-transaction-for-tote.component.html',
  styleUrls: ['./selection-transaction-for-tote.component.scss']
})
export class SelectionTransactionForToteComponent implements OnInit {

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openSelectionExtendDialogue() {
    const dialogRef = this.dialog.open(SelectionTransactionForToteExtendComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__'
    })
  }

}

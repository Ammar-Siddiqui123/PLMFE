import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SetItemLocationComponent } from '../../dialogs/set-item-location/set-item-location.component';
import { SupplierItemIdComponent } from '../../dialogs/supplier-item-id/supplier-item-id.component';
import { TemporaryManualOrderNumberAddComponent } from '../../dialogs/temporary-manual-order-number-add/temporary-manual-order-number-add.component';
import { UnitMeasureComponent } from '../../dialogs/unit-measure/unit-measure.component';

@Component({
  selector: 'app-generate-transaction',
  templateUrl: './generate-transaction.component.html',
  styleUrls: ['./generate-transaction.component.scss']
})
export class GenerateTransactionComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  openSetItemLocationDialogue(){
    const dialogRef =  this.dialog.open(SetItemLocationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__'
    })
  }
  openSupplierItemDialogue(){
    const dialogRef =  this.dialog.open(SupplierItemIdComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__'
    })
  }
  openUnitOfMeasureDialogue(){
    const dialogRef =  this.dialog.open(UnitMeasureComponent, {
      height: 'auto',
      width: '800px',
      autoFocus: '__non_existing_element__'
    })
  }
  openTemporaryManualOrderDialogue(){
    const dialogRef =  this.dialog.open(TemporaryManualOrderNumberAddComponent, {
      height: 'auto',
      width: '800px',
      autoFocus: '__non_existing_element__'
    })
  }
}

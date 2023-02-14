import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AuthService } from 'src/app/init/auth.service';
import { SetItemLocationComponent } from '../../dialogs/set-item-location/set-item-location.component';
import { SupplierItemIdComponent } from '../../dialogs/supplier-item-id/supplier-item-id.component';
import { TemporaryManualOrderNumberAddComponent } from '../../dialogs/temporary-manual-order-number-add/temporary-manual-order-number-add.component';
import { UnitMeasureComponent } from '../../dialogs/unit-measure/unit-measure.component';
import { TransactionService } from '../../transaction/transaction.service';

@Component({
  selector: 'app-generate-transaction',
  templateUrl: './generate-transaction.component.html',
  styleUrls: ['./generate-transaction.component.scss'],
})
export class GenerateTransactionComponent implements OnInit {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  searchByInput: any = new Subject<string>();
  orderNumber: any;
  searchAutocompleteList: any;
  userData;
  item;
  itemNumber;
  supplierID;
  expDate: any;
  revision;
  description;
  lotNumber;
  uom;
  notes;
  serialNumber;
  transType;
  reqDate;
  lineNumber;
  transQuantity;
  priority;
  lineSeq;
  hostTransID;
  batchPickID;
  wareHouse;
  toteID;

  totalQuantity: '';
  zone: '';
  row: '';
  shelf: '';
  carousel: '';
  quantityAllocatedPick: '';
  quantityAllocatedPutAway: '';
  invMapID: '';
  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) {
    this.userData = this.authService.userData();
  }

  ngOnInit(): void {
    this.searchByInput
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumn();
      });
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  searchData(event) {
    console.log(event);
  }
  getRow(row) {
    this.clear();
    console.log(row);
    let payLoad = {
      id: row.id,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(payLoad, '/Admin/TransactionInfo', true)
      .subscribe(
        (res: any) => {
          if (res && res.data && res.data.getTransaction) {
            this.item = res.data.getTransaction;

            this.itemNumber = this.item.itemNumber;
            this.supplierID = this.item.supplierItemID;
            this.expDate = this.item.expirationDate;
            this.revision = this.item.revision;
            this.description = this.item.description;
            this.lotNumber = this.item.lotNumber;
            this.uom = this.item.unitOfMeasure;
            this.notes = this.item.notes;
            this.serialNumber = this.item.serialNumber;
            this.transType = this.item.transactionType;
            this.reqDate = this.item.requiredDate;
            this.lineNumber = this.item.lineNumber;
            this.transQuantity = this.item.transactionQuantity;
            this.priority = this.item.priority;
            this.lineSeq = this.item.lineSequence;
            this.hostTransID = this.item.hostTransactionID;
            this.batchPickID = this.item.batchPickID;
            this.wareHouse = this.item.warehouse;
            this.toteID = this.item.toteID;

            this.totalQuantity = res.data.totalQuantity;
            this.zone = this.item.zone;
            this.row = this.item.row;
            this.shelf = this.item.shelf;
            this.carousel = this.item.carousel;
            this.invMapID = this.item.invMapID;
            this.quantityAllocatedPick =
              res.data.quantityAllocated[0].quantityAllocatedPick;
            this.quantityAllocatedPutAway =
              res.data.quantityAllocated[0].quantityAllocatedPutAway;
          } else {
            this.item = '';
          }
        },
        (error) => {}
      );
  }
  clear() {
    this.itemNumber = '';
    this.supplierID = '';
    this.expDate = '';
    this.revision = '';
    this.description = '';
    this.lotNumber = '';
    this.uom = '';
    this.notes = '';
    this.serialNumber = '';
    this.transType = '';
    this.reqDate = '';
    this.lineNumber = '';
    this.transQuantity = '';
    this.priority = '';
    this.lineSeq = '';
    this.hostTransID = '';
    this.batchPickID = '';
    this.wareHouse = '';
    this.toteID = '';
  }
  async autocompleteSearchColumn() {
    let searchPayload = {
      transaction: this.orderNumber,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/ManualTransactionTypeAhead', true)
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
        },
        (error) => {}
      );
  }
  openSetItemLocationDialogue() {
    const dialogRef = this.dialog.open(SetItemLocationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        userName: this.userData.userName,
        wsid: this.userData.wsid,
        itemNumber: this.itemNumber,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
  openSupplierItemDialogue() {
    const dialogRef = this.dialog.open(SupplierItemIdComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        userName: this.userData.userName,
        wsid: this.userData.wsid,
        supplierID: this.supplierID,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
  openUnitOfMeasureDialogue() {
    const dialogRef = this.dialog.open(UnitMeasureComponent, {
      height: 'auto',
      width: '800px',
      autoFocus: '__non_existing_element__',
    });
  }
  openTemporaryManualOrderDialogue() {
    const dialogRef = this.dialog.open(TemporaryManualOrderNumberAddComponent, {
      height: 'auto',
      width: '800px',
      autoFocus: '__non_existing_element__',
      data: {
        userName: this.userData.userName,
        wsid: this.userData.wsid,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
}

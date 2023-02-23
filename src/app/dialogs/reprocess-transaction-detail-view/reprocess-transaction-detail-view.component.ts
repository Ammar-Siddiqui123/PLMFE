import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProcessPutAwayService } from 'src/app/induction-manager/processPutAway.service';

@Component({
  selector: 'app-reprocess-transaction-detail-view',
  templateUrl: './reprocess-transaction-detail-view.component.html',
  styleUrls: ['./reprocess-transaction-detail-view.component.scss'],
})
export class ReprocessTransactionDetailViewComponent implements OnInit {
  constructor(
    private service: ProcessPutAwayService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  reprocessInfo = new FormGroup({
    orderNumber: new FormControl({ value: '', disabled: true }),
    itemNumber: new FormControl({ value: '', disabled: true }),
    transactionType: new FormControl({ value: '', disabled: true }),
    lineNumber: new FormControl({ value: '', disabled: true }),
    notes: new FormControl({ value: '', disabled: true }),
    importDate: new FormControl({ value: '', disabled: true }),
    importBy: new FormControl({ value: '', disabled: true }),
    importFileName: new FormControl({ value: '', disabled: true }),
    requiredDate: new FormControl({ value: '', disabled: true }),
    uom: new FormControl({ value: '', disabled: true }),
    lotNumber: new FormControl({ value: '', disabled: true }),
    expirationDate: new FormControl({ value: '', disabled: true }),
    serialNumber: new FormControl({ value: '', disabled: true }),
    revision: new FormControl({ value: '', disabled: true }),
    wareHouse: new FormControl({ value: '', disabled: true }),
    location: new FormControl({ value: '', disabled: true }),
    transactionQuantity: new FormControl({ value: '', disabled: true }),
    priority: new FormControl({ value: '', disabled: true }),
    label: new FormControl({ value: '', disabled: true }),
    hostTransID: new FormControl({ value: '', disabled: true }),
    emergency: new FormControl({ value: '', disabled: true }),
    shipVia: new FormControl({ value: '', disabled: true }),
    shipToName: new FormControl({ value: '', disabled: true }),
    shipToLine1: new FormControl({ value: '', disabled: true }),
    shipToLine2: new FormControl({ value: '', disabled: true }),
    shipToCountry: new FormControl({ value: '', disabled: true }),
    shipToState: new FormControl({ value: '', disabled: true }),
    shipToZip: new FormControl({ value: '', disabled: true }),
    promisedDate: new FormControl({ value: '', disabled: true }),
    userField9: new FormControl({ value: '', disabled: true }),
    userField10: new FormControl({ value: '', disabled: true }),
    reason: new FormControl({ value: '', disabled: true }),
    reasonMessage: new FormControl({ value: '', disabled: true }),
  });
  ngOnInit(): void {
    // this.reprocessInfo.controls.orderNumber.setValue('123213');
  }
}

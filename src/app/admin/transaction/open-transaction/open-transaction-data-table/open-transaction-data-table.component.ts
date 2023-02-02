import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { SetColumnSeqService } from 'src/app/admin/dialogs/set-column-seq/set-column-seq.service';
import { AuthService } from 'src/app/init/auth.service';
import { TransactionService } from '../../transaction.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InventoryMapService } from 'src/app/admin/inventory-map/inventory-map.service';
import { AddInvMapLocationComponent } from 'src/app/admin/dialogs/add-inv-map-location/add-inv-map-location.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { QuarantineConfirmationComponent } from 'src/app/admin/dialogs/quarantine-confirmation/quarantine-confirmation.component';
import { AdjustQuantityComponent } from 'src/app/admin/dialogs/adjust-quantity/adjust-quantity.component';

const TRNSC_DATA = [
  { colHeader: 'orderNumber', colDef: 'Order Number' },
  { colHeader: 'itemNumber', colDef: 'Item Number' },
  { colHeader: 'wareHouse', colDef: 'Warehouse' },
  { colHeader: 'location', colDef: 'Location' },
  { colHeader: 'transactionType', colDef: 'Transaction Type' },
  { colHeader: 'transactionQuantity', colDef: 'Transaction Quantity' },
  { colHeader: 'serialNumber', colDef: 'Serial Number' },
  { colHeader: 'lotNumber', colDef: 'Lot Number' },
  { colHeader: 'lineNumber', colDef: 'Line Number' },
  { colHeader: 'hostTransactionID', colDef: 'Host Transaction ID' },
  { colHeader: 'toteID', colDef: 'Tote ID' },
  { colHeader: 'id', colDef: 'ID' },
];

@Component({
  selector: 'app-open-transaction-data-table',
  templateUrl: './open-transaction-data-table.component.html',
  styleUrls: ['./open-transaction-data-table.component.scss'],
})
export class OpenTransactionDataTableComponent
  implements OnInit, AfterViewInit
{
  displayedColumns: string[] = [
    'orderNumber',
    'itemNumber',
    'wareHouse',
    'location',
    'transactionType',
    'transactionQuantity',
    'serialNumber',
    'lotNumber',
    'lineNumber',
    'hostTransactionID',
    'toteID',
    'id',
    'actions'
  ];
  
  payload:any;
  datasource: any = [];

  ngAfterViewInit() {}

  constructor(    private transactionService: TransactionService,) {}
  @Input()
  set receivedFromFilterEvent(event: Event) {
    if (event) {
      alert('123213')
    }
  }
  ngOnInit(): void {
    // this.datasource = new MatTableDataSource(this.employees_details_data);
    this.getContentData();
  }
  
  getContentData() {
    this.payload = {
      draw: 0,
      sRow: 0,
      eRow: 10,
      sortColumnNumber: 0,
      sortOrder: 'asc',
      username: '1234',
      identify: 'Order Number',
      reels: 'non',
      orderItem: '011196P',
      wsid: 'TESTWSID',
    };
    this.transactionService
      .get(this.payload, '/Admin/HoldTransactionsData', true)
      .subscribe(
        (res: any) => {


          this.datasource =res.data.holdTransactions
          // this.getTransactionModelIndex();

          // this.columnValues.push('actions');
          // this.detailDataInventoryMap = res.data?.transactions;
          // this.dataSource = new MatTableDataSource(res.data?.holdTransactions);
          // //  this.dataSource.paginator = this.paginator;
          // this.customPagination.total = res.data?.recordsFiltered;
          // this.dataSource.sort = this.sort;
        },
        (error) => {}
      );
  }
  sortChange(event){
   
  }

  
}

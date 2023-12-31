import {
  Component,
  OnInit,
  
  
  
  Input,
  
  
  
} from '@angular/core';
import { } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator'; 
import { AuthService } from 'src/app/init/auth.service'; 
import { } from 'rxjs';
import {  } from 'ngx-toastr'; 
import {  } from 'src/app/admin/dialogs/add-inv-map-location/add-inv-map-location.component';
import { MatDialog } from '@angular/material/dialog';
import {  } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import {  } from 'src/app/admin/dialogs/quarantine-confirmation/quarantine-confirmation.component';
import {  } from 'src/app/admin/dialogs/adjust-quantity/adjust-quantity.component';
import { HoldReasonComponent } from 'src/app/admin/dialogs/hold-reason/hold-reason.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

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
  implements OnInit
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
    'actions',
  ];
  identify='Order Number';
  reels='non';
  orderItem='';
  payload: any;
  datasource: any = [];
  userData;
  customPagination: any = {
    total: '',
    recordsPerPage:10,
    startIndex: 0,
    endIndex: 10,
  };
  public sortCol: any = 5;
  public sortOrder: any = 'asc';
  public columnValues: any = [];
  
  pageEvent: PageEvent;
  constructor(
    private Api: ApiFuntions,
    private authService: AuthService,
    private dialog: MatDialog

  ) {}
  @Input()
  set event(event: any) {
    if (event) {
    this.identify=event.selectedOption;
    this.orderItem=event.searchValue;
    this.reels=event.selectedCheck;
    this.getContentData();
    }
  }
  ngOnInit(): void {
    this.customPagination = {
      total: '',
      recordsPerPage: 10,
      startIndex: 0,
      endIndex: 10,
    };
    this.userData = this.authService.userData();
    this.getContentData();
  }

  getContentData() {
    this.payload = {
      draw: 0,
      sRow: this.customPagination.startIndex,
      eRow: this.customPagination.endIndex,
      sortColumnNumber:  this.sortCol,
      sortOrder: this.sortOrder,
      username: this.userData.userName,
      identify: this.identify,
      reels: this.reels,
      orderItem: this.orderItem,
      wsid: this.userData.wsid,
    };
    this.Api
      .HoldTransactionsData(this.payload)
      .subscribe(
        (res: any) => {
          this.datasource = res.data.holdTransactions;
        },
        (error) => {}
      );
  }

  sortChange(event) {
    if (
      !this.datasource ||
      event.direction == ''
    )
      return;

    let index;
    this.displayedColumns.forEach((x, i) => {
      if (x === event.active) {
        index = i;
      }
    });

    this.sortCol = index;
    this.sortOrder = event.direction;
    this.getContentData();
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.customPagination.startIndex = e.pageSize * e.pageIndex;

    this.customPagination.endIndex = e.pageSize * e.pageIndex + e.pageSize;
    this.customPagination.recordsPerPage = e.pageSize;
    
    this.getContentData();
  }
  holdDeallocate(row){

    const dialogRef = this.dialog.open(HoldReasonComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'hold-trans',
        reel:this.reels,
       
        orderItem: this.orderItem,
        Order:this.identify==='Order Number',
        id:row.id
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isExecuted) {
        this.getContentData();
  
      }
    });

  }

  selectRow(row: any) {
    this.datasource.forEach(element => {
      if(row != element){
        element.selected = false;
      }
    });
    const selectedRow = this.datasource.find((x: any) => x === row);
    if (selectedRow) {
      selectedRow.selected = !selectedRow.selected;
    }
  }

}

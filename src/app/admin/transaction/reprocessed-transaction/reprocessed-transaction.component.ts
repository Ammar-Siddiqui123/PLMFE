import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from 'angular-routing';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/init/auth.service';
import { SetColumnSeqService } from '../../dialogs/set-column-seq/set-column-seq.service';
import { TransactionService } from '../transaction.service';

const TRNSC_DATA = [
  { colHeader: 'tH_ID', colDef: 'TH_ID' },
  { colHeader: 'id', colDef: 'ID' },
  { colHeader: 'importDate', colDef: 'Import Date' },
  { colHeader: 'importBy', colDef: 'Import By' },
  { colHeader: 'importFileName', colDef: 'Import Filename' },
  { colHeader: 'transactionType', colDef: 'Transaction Type' },
  { colHeader: 'orderNumber', colDef: 'Order Number' },
  { colHeader: 'priority', colDef: 'Priority' },
  { colHeader: 'itemNumber', colDef: 'Item Number' },
  { colHeader: 'revision', colDef: 'Revision' },
  { colHeader: 'lotNumber', colDef: 'Lot Number' },
  { colHeader: 'expirationDate', colDef: 'Expiration Date' },
  { colHeader: 'serialNumber', colDef: 'Serial Number' },
  { colHeader: 'description', colDef: 'Description' },
  { colHeader: 'transactionQuantity', colDef: 'Transaction Quantity' },
  { colHeader: 'location', colDef: 'Location' },
  { colHeader: 'wareHouse', colDef: 'Warehouse' },
  { colHeader: 'zone', colDef: 'Zone' },
  { colHeader: 'carousel', colDef: 'Carousel' },
  { colHeader: 'row', colDef: 'Row' },
  { colHeader: 'shelf', colDef: 'Shelf' },
  { colHeader: 'bin', colDef: 'Bin' },
  { colHeader: 'completedDate', colDef: 'Completed Date' },
  { colHeader: 'completedBy', colDef: 'Completed By' },
  { colHeader: 'completedQuantity', colDef: 'Completed Quantity' },
  { colHeader: 'batchPickID', colDef: 'Batch Pick ID' },
  { colHeader: 'notes', colDef: 'Notes' },
  { colHeader: 'exportFileName', colDef: 'Export File Name' },
  { colHeader: 'exportDate', colDef: 'Export Date' },
  { colHeader: 'exportedBy', colDef: 'Exported By' },
  { colHeader: 'exportBatchID', colDef: 'Export Batch ID' },
  { colHeader: 'lineNumber', colDef: 'Line Number' },
  { colHeader: 'lineSequence', colDef: 'Line Sequence' },
  { colHeader: 'tableType', colDef: 'Table Type' },
  { colHeader: 'userField1', colDef: 'User Field1' },
  { colHeader: 'userField2', colDef: 'User Field2' },
  { colHeader: 'userField3', colDef: 'User Field3' },
  { colHeader: 'userField4', colDef: 'User Field4' },
  { colHeader: 'userField5', colDef: 'User Field5' },
  { colHeader: 'userField6', colDef: 'User Field6' },
  { colHeader: 'useField7', colDef: 'User Field7' },
  { colHeader: 'userField8', colDef: 'User Field8' },
  { colHeader: 'userField9', colDef: 'User Field9' },
  { colHeader: 'userField10', colDef: 'User Field10' },
  { colHeader: 'unitOfMeasure', colDef: 'Unit of Measure' },
  { colHeader: 'requiredDate', colDef: 'Required Date' },
  { colHeader: 'statusCode', colDef: 'Status Code' },
  { colHeader: 'masterRecord', colDef: 'Master Record' },
  { colHeader: 'masterRecordID', colDef: 'Master Record ID' },
  { colHeader: 'tH_ID', colDef: 'Inv Map ID' },
  { colHeader: 'label', colDef: 'Label' },
  { colHeader: 'inProcess', colDef: 'In Process' },
  { colHeader: 'toteID', colDef: 'Tote ID' },
  { colHeader: 'toteNumber', colDef: 'Tote Number' },
  { colHeader: 'cell', colDef: 'Cell' },
  { colHeader: 'hostTransactionID', colDef: 'Host Transaction ID' },
  { colHeader: 'emergency', colDef: 'Emergency' },
];
@Component({
  selector: 'app-reprocessed-transaction',
  templateUrl: './reprocessed-transaction.component.html',
  styleUrls: ['./reprocessed-transaction.component.scss'],
})
export class ReprocessedTransactionComponent implements OnInit {
  public columnValues: any = [];
  public userData: any;
  public displayedColumns: any;
  public dataSource: any = new MatTableDataSource();
  public detailDataTransHistory: any;
  public startDate: any = '';
  public endDate: any = new Date().toISOString();
  public orderNo: any = '';
  public payload: any;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  searchBar = new Subject<string>();
  searchAutocompleteList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageEvent: PageEvent;
  cols = [];
  customPagination: any = {
    total: '',
    recordsPerPage: 20,
    startIndex: '',
    endIndex: '',
  };
  columnSearch: any = {
    searchColumn: {
      colHeader: '',
      colDef: '',
    },
    searchValue: '',
  };
  sortColumn: any = {
    columnName: 32,
    sortOrder: 'asc',
  };
  constructor(
    private seqColumn: SetColumnSeqService,
    private transactionService: TransactionService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
}

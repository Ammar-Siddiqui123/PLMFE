// import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../app/init/auth.service';
import { ProcessPicksService } from '../../../app/induction-manager/process-picks/process-picks.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'toteid', 'orderno', 'priority', 'options', 'other'];

  displayedColumns1: string[] = ['position', 'toteid', 'orderno', 'other'];

  displayedColumns2: string[] = ['orderno'];

  displayedColumns3: string[] = ['orderno', 'itemno', 'transaction', 'location', 'completed'];
  public userData: any;
  allOrders: any[] = [];
  selectedOrders: any[] = [];
  orderDataSource: any;
  selectedTd: any;

  filterTransColumns = [
    { columnDef: 'orderNumber', header: 'orderNumber', cell: (element: any) => `${element.orderNumber}` },
    { columnDef: 'itemNumber', header: 'itemNumber', cell: (element: any) => `${element.itemNumber}` },
    { columnDef: 'transactionQuantity', header: 'transactionQuantity', cell: (element: any) => `${element.transactionQuantity}` },
    { columnDef: 'location', header: 'location', cell: (element: any) => `${element.location}` },
    { columnDef: 'completedQuantity', header: 'completedQuantity', cell: (element: any) => `${element.completedQuantity}` },
    { columnDef: 'description', header: 'description', cell: (element: any) => `${element.description}` },
    { columnDef: 'batchPickID', header: 'batchPickID', cell: (element: any) => `${element.batchPickID}` },
    { columnDef: 'bin', header: 'bin', cell: (element: any) => `${element.bin}` },
    { columnDef: 'carousel', header: 'carousel', cell: (element: any) => `${element.carousel}` },
    { columnDef: 'cell', header: 'cell', cell: (element: any) => `${element.cell}` },
    { columnDef: 'completedBy', header: 'completedBy', cell: (element: any) => `${element.completedBy}` },
    { columnDef: 'completedDate', header: 'completedDate', cell: (element: any) => `${element.completedDate}` },
    { columnDef: 'emergency', header: 'emergency', cell: (element: any) => `${element.emergency}` },
    { columnDef: 'expirationDate', header: 'expirationDate', cell: (element: any) => `${element.expirationDate}` },
    { columnDef: 'exportBatchID', header: 'exportBatchID', cell: (element: any) => `${element.exportBatchID}` },
    { columnDef: 'exportDate', header: 'exportDate', cell: (element: any) => `${element.exportDate}` },
    { columnDef: 'exportedBy', header: 'exportedBy', cell: (element: any) => `${element.exportedBy}` },
    { columnDef: 'hostTransactionID', header: 'hostTransactionID', cell: (element: any) => `${element.hostTransactionID}` },
    { columnDef: 'id', header: 'id', cell: (element: any) => `${element.id}` },
    { columnDef: 'importBy', header: 'importBy', cell: (element: any) => `${element.importBy}` },
    { columnDef: 'importDate', header: 'importDate', cell: (element: any) => `${element.importDate}` },
    { columnDef: 'importFilename', header: 'importFilename', cell: (element: any) => `${element.importFilename}` },
    { columnDef: 'invMapID', header: 'invMapID', cell: (element: any) => `${element.invMapID}` },
    { columnDef: 'lineNumber', header: 'lineNumber', cell: (element: any) => `${element.lineNumber}` },
    { columnDef: 'lineSequence', header: 'lineSequence', cell: (element: any) => `${element.lineSequence}` },
    { columnDef: 'lotNumber', header: 'lotNumber', cell: (element: any) => `${element.lotNumber}` },
    { columnDef: 'masterRecord', header: 'masterRecord', cell: (element: any) => `${element.masterRecord}` },
    { columnDef: 'masterRecordID', header: 'masterRecordID', cell: (element: any) => `${element.masterRecordID}` },
    { columnDef: 'notes', header: 'notes', cell: (element: any) => `${element.notes}` },
    { columnDef: 'priority', header: 'priority', cell: (element: any) => `${element.priority}` },
    { columnDef: 'requiredDate', header: 'requiredDate', cell: (element: any) => `${element.requiredDate}` },
    { columnDef: 'revision', header: 'revision', cell: (element: any) => `${element.revision}` },
    { columnDef: 'row', header: 'row', cell: (element: any) => `${element.row}` },
    { columnDef: 'serialNumber', header: 'serialNumber', cell: (element: any) => `${element.serialNumber}` },
    { columnDef: 'shelf', header: 'shelf', cell: (element: any) => `${element.shelf}` },
    { columnDef: 'statusCode', header: 'statusCode', cell: (element: any) => `${element.statusCode}` },
    { columnDef: 'toteID', header: 'toteID', cell: (element: any) => `${element.toteID}` },
    { columnDef: 'toteNumber', header: 'toteNumber', cell: (element: any) => `${element.toteNumber}` },
    { columnDef: 'unitOfMeasure', header: 'unitOfMeasure', cell: (element: any) => `${element.unitOfMeasure}` },
    { columnDef: 'userField1', header: 'userField1', cell: (element: any) => `${element.userField1}` },
    { columnDef: 'userField2', header: 'userField2', cell: (element: any) => `${element.userField2}` },
    { columnDef: 'userField3', header: 'userField3', cell: (element: any) => `${element.userField3}` },
    { columnDef: 'userField4', header: 'userField4', cell: (element: any) => `${element.userField4}` },
    { columnDef: 'userField5', header: 'userField5', cell: (element: any) => `${element.userField5}` },
    { columnDef: 'userField6', header: 'userField6', cell: (element: any) => `${element.userField6}` },
    { columnDef: 'userField7', header: 'userField7', cell: (element: any) => `${element.userField7}` },
    { columnDef: 'userField8', header: 'userField8', cell: (element: any) => `${element.userField8}` },
    { columnDef: 'userField9', header: 'userField9', cell: (element: any) => `${element.userField9}` },
    { columnDef: 'userField10', header: 'userField10', cell: (element: any) => `${element.userField10}` },
    { columnDef: 'warehouse', header: 'warehouse', cell: (element: any) => `${element.warehouse}` },
    { columnDef: 'zone', header: 'zone', cell: (element: any) => `${element.zone}` },
  ];

  displayedTransColumns = this.filterTransColumns.map(c => c.columnDef);

  orderTransDataSource: any;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  constructor(
    private pPickService: ProcessPicksService,
    private toastr: ToastrService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getAllOrders();

    console.log(this.data);
    
  }
  getAllOrders() {
    let paylaod = {
      "OrderView": this.data.viewType,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/OrdersInZone').subscribe((res) => {
      if (res.data) {
        res.data.map(val => {
          this.allOrders.push({ 'orderNumber': val, isSelected: false });
        });
        this.orderDataSource = new MatTableDataSource<any>(this.allOrders);

      }
    });
  }

  ngAfterViewInit() {
    this.orderDataSource.paginator = this.paginator;
    this.orderDataSource.paginator = this.paginatorPageSize;
  }

  onOrderSelect(row: any) {
    // const isMachted = this.data.selectedOrders.filter((val,key) => {return val[key] === row.orderNumber;});
    // console.log(isMachted);
    // if(isMachted){
    //   this.toastr.error('No open totes in batch', 'Batch is Filled.', {
    //     positionClass: 'toast-bottom-right',
    //     timeOut: 2000
    //   });
    // }
    
    if (this.selectedOrders.length >= this.data.pickBatchQuantity) {
      this.toastr.error('No open totes in batch', 'Batch is Filled.', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });  
    }
    else {
      this.selectedOrders.push(row.orderNumber);
      this.allOrders.filter(val => {
        if (val.orderNumber === row.orderNumber) {
          val.isSelected = true;
        }
      });

      let paylaod = {
        "Draw": 0,
        "OrderNumber": row.orderNumber,
        "sRow": 1,
        "eRow": 10,
        "SortColumnNumber": 0,
        "SortOrder": "asc",
        "Filter": "1=1",
        "Username": this.userData.username,
        "wsid": this.userData.wsid,
      }
      this.pPickService.get(paylaod, '/Induction/InZoneTransDT').subscribe((res) => {
        if (res.data) {
          this.orderTransDataSource = new MatTableDataSource<any>(res.data.pickToteManTrans);
        }
      });
    }


  }
  onSelectedOrders(){
    // console.log(this.selectedOrders);
    // console.log(this.data.allOrders);
    
    this.dialogRef.close(this.selectedOrders);
  }

}

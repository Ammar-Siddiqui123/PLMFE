import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-shipping-complete-dialog',
  templateUrl: './shipping-complete-dialog.component.html',
  styleUrls: ['./shipping-complete-dialog.component.scss']
})
export class ShippingCompleteDialogComponent implements OnInit {

  displayedColumns1: string[] = ['itemNo', 'lineNo', 'toteId', 'orderQty'];
  displayedColumns2: string[] = ['containerID', 'carrierName', 'trackingNo', 'freight'];
  dataSourceList: any;
  tableData1: any = new MatTableDataSource([]);
  tableData2: any = new MatTableDataSource([]);
  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private Api: ApiFuntions,
  ) { }

  ngOnInit(): void {
    this.viewShipping(this.data.orderNumber);
  }

  viewShipping(orderNumber: any, loader: boolean = false) {
    this.Api.viewShipping({ orderNum: orderNumber }).subscribe((res: any) => {
      // if (res.isExecuted && res.data) {
      //   this.tableData1 = new MatTableDataSource(res.data.transactionTypes);
      //   this.tableData1.paginator = this.paginator1;
      // } else { 
      //   this.tableData1 = new MatTableDataSource([]); 
      //   // this.toastr.error(res.responseMessage, 'Error!', {
      //   //   positionClass: 'toast-bottom-right',
      //   //   timeOut: 2000
      //   // });
      // }
    });
  }
}

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
    console.log(this.data.allOrders.includes(row.orderNumber));
    
    if(this.data.allOrders.includes(row.orderNumber)){
      console.log('Exist'+ row.orderNumber);
    }
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
    console.log(this.selectedOrders);
    this.dialogRef.close(this.selectedOrders);
  }

}

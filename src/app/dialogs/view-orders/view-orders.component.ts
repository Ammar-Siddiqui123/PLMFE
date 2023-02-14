// import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../app/init/auth.service';
import { ProcessPicksService } from '../../../app/induction-manager/process-picks/process-picks.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'toteid', 'orderno', 'priority', 'options', 'other'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // selection = new SelectionModel<PeriodicElement>(true, []);

  displayedColumns1: string[] = ['position', 'toteid', 'orderno', 'other'];
  dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  displayedColumns2: string[] = ['orderno'];

  displayedColumns3: string[] = ['orderno', 'itemno', 'transaction', 'location', 'completed'];
  public userData: any;
  allOrders: any[] = [];
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
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.userData = this.authService.userData();
    this.getAllOrders();
  }
  getAllOrders() {
    let paylaod = {
      "OrderView": this.data.viewType,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/OrdersInZone').subscribe((res) => {
      if (res.data) {
        this.orderDataSource = new MatTableDataSource<any>(res.data);
      }
    });
  }

  ngAfterViewInit() {
    this.orderDataSource.paginator = this.paginator;
    this.orderDataSource.paginator = this.paginatorPageSize;
  }

  onOrderSelect(row: any) {
    this.allOrders.push(row);
    let paylaod = {
      "Draw": 0,
      "OrderNumber": row,
      "sRow": 1,
      "eRow": 10,
      "SortColumnNumber": 0,
      "SortOrder": "asc",
      "Filter": "1=1",
      "Username": this.userData.username,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/InZoneTransDT').subscribe((res) => {
      console.log(res.data.pickToteManTrans);
      if (res.data) {
        this.orderTransDataSource = new MatTableDataSource<any>(res.data.pickToteManTrans);
      }
      // console.log(this.allOrders);
    });

  }
  isOrderExist(ele:any){
    console.log(ele);
    console.log(this.allOrders);
    
    return false;
  }

}

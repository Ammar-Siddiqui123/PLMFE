import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { LaLocationAssignmentQuantitiesComponent } from '../../dialogs/la-location-assignment-quantities/la-location-assignment-quantities.component';
import { AuthService } from 'src/app/init/auth.service';
import { LocationAssignmentService } from '../location-assignment.service';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { left } from '@popperjs/core';

export interface PeriodicElement {
  location: number;
  warehouse: string;
  zone: string;
  carousel: string;
  row: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {location: 10124, warehouse: '0110203C01', zone: '05', carousel: '14-Feb-2022',row:''},
// ];
@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit {

  public userData: any;
  public totalCount: any;
  public searchOrder: any;
  public searchOrder1: any;

  // displayedColumns: string[] = ['location', 'warehouse', 'zone', 'carousel','row'];
  displayedColumns: string[] = ['orderNumber'  , 'itemCount', 'priority', 'requiredDate','actions'];
  displayedColumns1: string[] = ['orderNumber', 'itemCount', 'priority', 'requiredDate','actions'];
  
  OldleftTable:any = [];
  leftTable:any = new MatTableDataSource([]);
  rightTable:any = new MatTableDataSource([]);

  // dataSource = new MatTableDataSource([]);
  constructor(private _liveAnnouncer: LiveAnnouncer ,
              private dialog: MatDialog ,
              private authservice : AuthService,
              private locationService: LocationAssignmentService,
              private toastr: ToastrService) {}

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator1: MatPaginator;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator1') paginator1: MatPaginator;

 

  @ViewChild('matSort') sort: MatSort;
  @ViewChild('matSort1') sort1: MatSort;

  @ViewChild('deleteAction') quarantineTemp: TemplateRef<any>;

  @ViewChild('addOrder') addOrderTemp: TemplateRef<any>;
  @Output() newItemEvent = new EventEmitter<Event>();

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userData = this.authservice.userData()
    this.openLAQ();
    // this.leftTable.filterPredicate = function(data, filter: string): boolean {
    //   debugger
    //   return data.name.toLowerCase().includes(filter) || data.symbol.toLowerCase().includes(filter) || data.weight.toString().includes(filter);
    // };
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.leftTable.sort = this.sort;    
  }
  announceSortChange1(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.rightTable.sort = this.sort1;    
  }

  quarantineDialog(): void {
    if(this.rightTable.data.length > 0){
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '400px',
        autoFocus: '__non_existing_element__',
        data: {  
          'title': 'Quarantine',
          'ErrorMessage': 'Are you sure you want to quarantine these orders?'
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.locationAssignment()
        }
      })
    }
    else{
      this.toastr.error('Item not in order or has already been consolidated', 'error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
  }

  locationAssignment(){

    let orders = this.rightTable.data.map((data) => data.orderNumber)
    // console.log(orders)

    let payload = {
      "transType": "count",
      "orders": orders,
      "userName" : this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.locationService.get(payload,'/Admin/LocationAssignmentOrderInsert').subscribe((res => {
     console.log(res.data.orders,'insertion')
     let testdata = res.data.orders
     this.rightTable.data = this.rightTable.data.filter((data) => !testdata.includes(data.orderNumber))
     console.log(this.rightTable.data)
    }))
  }

  addOrdereDialog(): void {
    this.rightTable = new MatTableDataSource(this.rightTable.data.concat(this.leftTable.data));
    this.leftTable = new MatTableDataSource([]);
    this.leftTable.paginator = this.paginator
    this.rightTable.paginator = this.paginator1
  }

  deleteItem() {
    this.leftTable = new MatTableDataSource(this.leftTable.data.concat(this.rightTable.data));
    this.rightTable = new MatTableDataSource([]);
    this.leftTable.paginator = this.paginator
    this.rightTable.paginator = this.paginator1
  }
  
  openLAQ() {
    let payload = {
      "userName" : this.userData.userName,
      "wsid": this.userData.wsid
    }

    this.locationService.get(payload,'/Admin/GetTransactionTypeCounts').subscribe((res =>{
    let dialogRef = this.dialog.open(LaLocationAssignmentQuantitiesComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {  
        'totalCount': res.data
      }
      ,
      disableClose: true
    
    })
    dialogRef.afterClosed().subscribe(result => {
      this.leftTable = new MatTableDataSource(result);
      this.leftTable.paginator = this.paginator
      this.newItemEvent.emit(result.tabIndex);
      
    })
  }))
    
  }

  add(e:any){
    this.rightTable = new MatTableDataSource(this.rightTable.data.concat(e));
    this.leftTable = new MatTableDataSource(this.leftTable.data.filter((data) => data.orderNumber != e.orderNumber));
    this.leftTable.paginator = this.paginator
    this.rightTable.paginator = this.paginator1
  }
  remove(e:any){
    this.leftTable = new MatTableDataSource(this.leftTable.data.concat(e));
    this.rightTable =new MatTableDataSource(this.rightTable.data.filter((data) => data.orderNumber != e.orderNumber));
    this.leftTable.paginator = this.paginator
    this.rightTable.paginator = this.paginator1
  }
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.leftTable.filter = filterValue;
    console.log(this.leftTable.filter)
  }


  applyFilter1(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.rightTable.filter = filterValue;
  }
  

}

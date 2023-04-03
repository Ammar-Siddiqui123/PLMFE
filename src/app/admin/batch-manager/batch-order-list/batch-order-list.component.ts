import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild, Input, SimpleChanges, EventEmitter, Output, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { BatchManagerService } from '../batch-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BatchManagerDetailViewComponent } from '../../dialogs/batch-manager-detail-view/batch-manager-detail-view.component';

@Component({
  selector: 'app-batch-order-list',
  templateUrl: './batch-order-list.component.html',
  styleUrls: ['./batch-order-list.component.scss']
})
export class BatchOrderListComponent implements OnInit {

  // @Input() orderListData : any;
  tableData:any;
  toteNumber:number=1;
  userData:any;
  transType:any;
  @Input() set orderListData(val: any) {
    this.tableData = new MatTableDataSource(val);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  @Input()
  set transTypeEvent(event: Event) {
    if (event) {
      this.transType=event
    }
  }

  @Input() displayedColumns : any;
  @Input() orderStatus:any;
  @Output() addOrderEmitter = new EventEmitter<any>();
  @Output() addRemoveAll = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private router: Router,private batchService : BatchManagerService,private authService: AuthService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    
  }

  ngAfterViewInit() {
  
  }

  ngOnChanges(changes: SimpleChanges) {
if(changes['orderListData']){
  this.tableData['_data']['_value']=changes['orderListData']['currentValue']
}
   

  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  addOrders(order : any) {
  
    order.toteNumber= this.toteNumber<=10?this.toteNumber++:this.toteNumber=1; // tote number increment till 10 after 10 restarts to 1
    this.addOrderEmitter.emit(order);
  }

  addRemoveAllOrder(){


    this.addRemoveAll.emit();
  }

  openView(element){
    if(this.orderStatus){
      this.router.navigate([]).then((result) => {
        window.open(`/#/admin/transaction?orderStatus=${element.orderNumber}`, '_self');
      });
    }else{
      this.switchToOS(element.orderNumber,this.transType);
    }

    
  }

  switchToOS(order,transType){
    let payload={
      order: order,
      transType:transType,
      username: this.userData.userName,
      wsid: this.userData.wsid
    }
    this.batchService.get(payload, '/Admin/DetailView').subscribe((res: any) => {
        
      const { data, isExecuted } = res
      if (isExecuted && data.length > 0) {
        this.openBatchViewDetail(data)
      } else {
      }
     
    });

  }

  openBatchViewDetail(detailData?): void {
    const dialogRef = this.dialog.open(BatchManagerDetailViewComponent, {
      width: '1100px',
      autoFocus: '__non_existing_element__',
      data:detailData
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }

}

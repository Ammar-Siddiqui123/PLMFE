import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../../app/init/auth.service';
import { BatchManagerService } from '../batch-manager.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import labels from '../../../labels/labels.json';
import { CreateBatchComponent } from '../../dialogs/create-batch/create-batch.component';

@Component({
  selector: 'app-batch-selected-orders',
  templateUrl: './batch-selected-orders.component.html',
  styleUrls: ['./batch-selected-orders.component.scss']
})
export class BatchSelectedOrdersComponent implements OnInit {
  public userData : any;
  tableData:any;
  @Input() set selectedOrderList(val: any) {
    this.tableData = new MatTableDataSource(val);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  @Input() displayedColumns : any;
  @Input() batchManagerSettings : any;
  @Input() type : any;
  @Output() addRemoveAll = new EventEmitter<any>();
  @Output() batchCreated = new EventEmitter<any>();
  @Output() batchIdUpdateEmit = new EventEmitter<any>();

  public nextOrderNumber:any;

  @Output() removeOrderEmitter = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer, 
    private authService: AuthService,
    private batchService : BatchManagerService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    this.batchManagerSettings.map(batchSetting => {
        this.nextOrderNumber = batchSetting.batchID
        // console.log(batchSetting.batchID);
        // console.log(this.tableData.data.length);
        
    });
  }


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  removeOrders(order : any) {
    this.removeOrderEmitter.emit(order);
  }

  createBatch() {
    let iBactchData:any[] = [];
    this.tableData.data.map((order:any) => {
      let result = [ order.orderNumber.toString(), order.countOfOrderNumber.toString()];
      iBactchData.push(result);
    });
    
    // console.log(iBactchData);
    // console.log(this.batchManagerSettings);
    let paylaod = {
      "batch": iBactchData,
      "nextBatchID": this.nextOrderNumber,
      "transType": this.type,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    try {
      this.batchService.create(paylaod, '/Admin/BatchInsert').subscribe((res: any) => {
        const {isExecuted } = res
        if(isExecuted){
          this.batchCreated.emit(true);
          this.batchIdUpdateEmit.emit(true);
          this.toastr.success(labels.alert.success, 'Success!',{
            positionClass: 'toast-bottom-right',
            timeOut:2000
         });
        }
        
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  addRemoveAllOrder(){
    this.addRemoveAll.emit();
  }



   /*
  Open Create batch dialog for first confirmation to create a batch .
  Result returns true to create a batch and false to defer .  
  */ 
  createBatchDialog(){
    let dialogRef;
    dialogRef = this.dialog.open(CreateBatchComponent, {
      height: 'auto',
      width: '480px',
    })
    dialogRef.afterClosed().subscribe(result => {
        if(result){this.createBatch()}
    })
  }

}

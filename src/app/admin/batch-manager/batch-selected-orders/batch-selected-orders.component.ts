import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../../app/init/auth.service'; 
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import labels from '../../../labels/labels.json';
import { CreateBatchComponent } from '../../dialogs/create-batch/create-batch.component';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { SharedService } from 'src/app/services/shared.service';
import { AlertConfirmationComponent } from 'src/app/dialogs/alert-confirmation/alert-confirmation.component';
import { CreateBatchConfirmationComponent } from '../../dialogs/create-batch-confirmation/create-batch-confirmation.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batch-selected-orders',
  templateUrl: './batch-selected-orders.component.html',
  styleUrls: ['./batch-selected-orders.component.scss'],
})
export class BatchSelectedOrdersComponent implements OnInit {
  public userData: any;
  tableData: any;
  transType: any;
  pickToTotes: boolean;
  nextToteID: any;
  @Input() set selectedOrderList(val: any) {
    this.tableData = new MatTableDataSource(val);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  @Input() displayedColumns: any;
  @Input() batchManagerSettings: any;
  @Input() type: any;
  @Input() isAutoBatch: any;
  @Output() addRemoveAll = new EventEmitter<any>();
  @Output() batchCreated = new EventEmitter<any>();
  @Output() batchIdUpdateEmit = new EventEmitter<any>();
  @Input()
  set transTypeEvent(event: Event) {
    if (event) {
      this.transType = event;
      this.addRemoveAll.emit();
    }
  }
  public nextOrderNumber: any;
  public batchID: any;
  @Output() removeOrderEmitter = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  toteValue = 0;
  constructor(
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private authService: AuthService,
    private Api: ApiFuntions,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private router:Router
    
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.sharedService.batchManagerObserver.subscribe((obj) => {
      if (obj['isCreate']) {
        this.createBatch();
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    let toteLimit = 0;

    if (changes['selectedOrderList']) {
      this.tableData['_data']['_value'].forEach((element) => {
        if (toteLimit < 10) {
          toteLimit++;
        } else {
          toteLimit = 1;
        }
        element['toteNumber'] = toteLimit;
      });

      this.sharedService.updateBatchManagerObject({
        selectedOrderLength: this.tableData['_data']['_value'].length,
      });
    }

    if (changes['isAutoBatch']) {
      this.isAutoBatch = changes['isAutoBatch']['currentValue'];
    }
    this.batchManagerSettings.map((batchSetting) => {
      this.nextOrderNumber = batchSetting.batchID;
      this.pickToTotes = JSON.parse(batchSetting.pickToTotes.toLowerCase());
      this.nextToteID = batchSetting.nextToteID;  
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
  printReport(type){
  
    if(type==='Batch'){
      window.open(`/#/report-view?file=${this.transType==='Pick'?'BMPickList':this.transType==='Put Away'?'BMPutList':'BMCountList'}-lst`, '_blank','location=yes');
      
    }else{
      window.open(`/#/report-view?file=${this.transType==='Pick'?'BMPickLabel':'BMPutLabel'}-lbl`, '_blank','location=yes');
    }
  }
  removeOrders(order: any) {
  this.removeOrderEmitter.emit(order);
  }

  createBatch() {
    let iBactchData: any[] = [];
    this.tableData.data.map((order: any) => {
      // let result = [ order.orderNumber.toString(), order.countOfOrderNumber.toString()];
      let result = [
        order.orderNumber.toString(),
        this.isAutoBatch
          ? order.toteNumber.toString()
          : order.fixedTote.toString(),
      ];
      iBactchData.push(result);
    });
 
    let paylaod = {
      batch: iBactchData,
      nextBatchID:
        this.nextOrderNumber != this.batchID
          ? this.nextOrderNumber
          : this.batchID,
      transType: this.type,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    try {
      this.Api
        .BatchInsert(paylaod)
        .subscribe((res: any) => {
          const { isExecuted } = res;
          if (isExecuted) {
            this.batchCreated.emit(true);
            this.batchIdUpdateEmit.emit(true);
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        });
    } catch (error) { 
    }
  }

  addRemoveAllOrder() {
    if (this.tableData['_data']['_value'].length == 0) return;
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'remove-batch-list',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Yes') {
        this.addRemoveAll.emit();
      }
    });
  }

  /*
  Open Create batch dialog for first confirmation to create a batch .
  Result returns true to create a batch and false to defer .  
  */
  createBatchDialog() {
    if (this.nextOrderNumber === '') {
      const dialogRef = this.dialog.open(AlertConfirmationComponent, {
        height: 'auto',
        width: '786px',
        data: {
          message: 'Batch ID must be specified.',
          heading: 'Batch Manager',
        },
        autoFocus: '__non_existing_element__',
      });
      dialogRef.afterClosed().subscribe((result) => {});
    } else if (this.tableData.data.length == 0) {
      const dialogRef = this.dialog.open(AlertConfirmationComponent, {
        height: 'auto',
        width: '786px',
        data: {
          message: 'No Orders Selected.',
          heading: 'Batch Manager',
        },
        autoFocus: '__non_existing_element__',
      });
      dialogRef.afterClosed().subscribe((result) => {});
    } else {
      let dialogRef;
      dialogRef = this.dialog.open(CreateBatchConfirmationComponent, {
        height: 'auto',
        width: '550px',
        autoFocus: '__non_existing_element__',
        data: {
          pickToTotes: this.pickToTotes,
          transType: this.transType,
          nextToteID: this.nextToteID,
          selectedOrderList: this.tableData['_data']['_value'],
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.createBatch();
        }
      });
    }
  }
}

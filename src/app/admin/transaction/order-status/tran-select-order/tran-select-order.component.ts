import { HttpContext, HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/init/auth.service';
import { BYPASS_LOG } from 'src/app/init/http-interceptor';
import { TransactionService } from '../../transaction.service';
import labels from '../../../../labels/labels.json';

@Component({
  selector: 'app-tran-select-order',
  templateUrl: './tran-select-order.component.html',
  styleUrls: ['./tran-select-order.component.scss'],
})
export class TranSelectOrderComponent implements OnInit {
  orderNumber: any;
  toteID: any;
  searchText: string;
  openOrder: any = 0;
  completeOrder: any = 0;
  reprocessOrder: any = 0;
  orderTypeOrder: any = '-';
  totalLinesOrder: any = 0;
  currentStatusOrder: any = '-';
  locationZoneData: any = [];
  selectOption;
  columnSelect;
  searchField;
  searchByOrderNumber = new Subject<string>();
  searchByToteId = new Subject<string>();
  @Output() orderNo = new EventEmitter<any>();
  @Output() toteId = new EventEmitter<any>();
  @Output() clearField = new EventEmitter<any>();
  @Output() clearData = new EventEmitter<Event>();

  searchBar = new Subject<string>();
  @Input() orderStatNextData = []; // decorate the property with @Input()

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  searchAutocompleteList: any;
  searchAutocompleteListOrderNumber: any = [];
  public userData: any;
  @Output() deleteEvent = new EventEmitter<Event>();

  @Input() set openOrderEvent(event: Event) {
    if (event) {
      this.openOrder = event;
    }
  }

  @Input() set completeOrderEvent(event: Event) {
    if (event) {
      this.completeOrder = event;
    }
  }
  @Input() set reprocessOrderEvent(event: Event) {
    if (event) {
      this.reprocessOrder = event;
    }
  }

  @Input() set orderTypeOrderEvent(event: Event) {
    if (event) {
      this.orderTypeOrder = event;
    }
  }

  @Input() set totalLinesOrderEvent(event: Event) {
    if (event) {
      this.totalLinesOrder = event;
    }
  }
  @Input() set currentStatusOrderEvent(event: Event) {
    if (event) {
      this.currentStatusOrder = event;
    }
  }
  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderStatNextData']) {
      this.searchAutocompleteListOrderNumber =
        changes['orderStatNextData']['currentValue'];
    }
  }

  ngOnInit(): void {
    this.searchBar
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        // this.columnSearch.searchValue = value;
        // if (!this.columnSearch.searchColumn.colDef) return;
console.log(value);
if(!value) {
  this.resetLines()
  this.columnSelect='';
}
        this.autocompleteSearchColumn();
        this.onOrderNoChange();
        // if (!this.searchAutocompleteList.length) {
        // this.getContentData();
        // }
      });
    // this.searchByOrderNumber
    //   .pipe(debounceTime(400), distinctUntilChanged())
    //   .subscribe((value) => {
    //     this.autocompleteSearchColumn();
    //     this.onOrderNoChange(value);
    //   });

    // this.searchByToteId
    //   .pipe(debounceTime(400), distinctUntilChanged())
    //   .subscribe((value) => {
    //     this.onToteIdChange(value);
    //   });
    this.userData = this.authService.userData();
  }

  resetLines() {
    this.openOrder = 0;
    this.completeOrder = 0;
    this.reprocessOrder = 0;
    this.orderTypeOrder = '';
    this.totalLinesOrder = 0;
    this.orderNumber = '';
    this.currentStatusOrder = '';
  }


  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  onOrderNoChange() {
    let obj = {
      searchField: this.searchField,
      columnFIeld: this.columnSelect,
    };
    this.orderNo.emit(obj);
    
  }
  onToteIdChange(event) {
    this.toteId.emit(event);
  }
  searchData() {
    this.onOrderNoChange();
  }

  selectFieldsReset(){
    this.columnSelect='';
    
  }
  clear() {
    this.clearData.emit(event);
    this.resetLines();
    this.searchAutocompleteList = [];

  }
  deleteOrder() {
    let paylaod = {
      OrderNumber: this.searchField,
      TotalLines:JSON.stringify(this.totalLinesOrder),
      UserName: this.userData.userName,
      WSID: this.userData.wsid,

    };
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete-order-status',
        paylaod:paylaod
        //itemList : this.itemList,
      //  detailData : event
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isExecuted) {
        this.deleteEvent.emit(res);
        this.resetLines();
        // this.deleteEvent.emit(res);

 
        // this.transactionService
        //   .get(paylaod, '/Admin/DeleteOrderStatus')
        //   .subscribe(
        //     (res: any) => {
        //       if (res.isExecuted) {
        //         this.toastr.success(labels.alert.success, 'Success!', {
        //           positionClass: 'toast-bottom-right',
        //           timeOut: 2000,
        //         });
        //         this.deleteEvent.emit(res.isExecuted);
        //       } else {
        //         this.toastr.error(labels.alert.went_worng, 'Error!', {
        //           positionClass: 'toast-bottom-right',
        //           timeOut: 2000,
        //         });
        //       }
        //     },
        //     (error) => {}
        //     // this.columnValues = res.data?.openTransactionColumns;
        //     // this.columnValues.push('actions');
        //     // this.displayOrderCols=res.data.openTransactionColumns;
        //   );
      }
    });
  }

  async autocompleteSearchColumn() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ',
      }),
      context: new HttpContext().set(BYPASS_LOG, true),
    };
    let searchPayload;
    if (this.columnSelect == 'Order Number') {
      searchPayload = {
        orderNumber: this.searchField,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
    } else {
      searchPayload = {
        query: this.searchField,
        tableName: 1,
        column: this.columnSelect,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
    }

    // NextSuggestedTransactions
    // OrderNumberNext
    this.transactionService
      .get(
        searchPayload,
        `/Admin/${
          this.columnSelect == 'Order Number'
            ? 'OrderNumberNext'
            : 'NextSuggestedTransactions'
        }`,
        true
      )
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
        },
        (error) => {}
      );
  }
  // async autocompleteSearchColumn() {
  //   let searchPayload = {
  //     orderNumber: this.orderNumber,
  //     username: this.userData.userName,
  //     wsid: this.userData.wsid,
  //   };
  //   this.transactionService
  //     .get(searchPayload, '/Admin/OrderNumberNext')
  //     .subscribe(
  //       (res: any) => {
  //         this.searchAutocompleteList = res.data;
  //       },
  //       (error) => {}
  //     );
  // }
  actionDialog(event) {
    this.searchField = '';
    this.searchAutocompleteList = [];
    this.resetLines();
  }
  ngOnDestroy() {
    this.searchByOrderNumber.unsubscribe();
    this.searchByToteId.unsubscribe();
  }
}
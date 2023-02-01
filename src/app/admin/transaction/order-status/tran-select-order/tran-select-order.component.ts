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
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { AuthService } from 'src/app/init/auth.service';
import { TransactionService } from '../../transaction.service';

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
    private dialog: MatDialog
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
    this.orderTypeOrder = '-';
    this.totalLinesOrder = 0;
    this.orderNumber = '';
    this.currentStatusOrder = '-';
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  onOrderNoChange() {
    let obj={
      searchField:this.searchField,
      columnFIeld:this.columnSelect
    }
    this.orderNo.emit(obj);
  }
  onToteIdChange(event) {
    this.toteId.emit(event);
  }
  searchData() {
      this.onOrderNoChange();
  }

  clear() {
    this.clearData.emit(event);
    this.resetLines();
    this.searchAutocompleteList=[];
    this.searchField='';
    this.columnSelect='';
    this.clearField.emit(true);
  }
  deleteOrder() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res == 'Yes') {
        let paylaod = {
          orderNumber: this.orderNumber,
          TotalLines: this.totalLinesOrder,
          UserName: this.userData.userName,
          WSID: this.userData.wsid
        };
        this.transactionService
          .get(paylaod, '/Admin/DeleteOrderStatus')
          .subscribe(
            (res: any) => {
              // this.columnValues = res.data?.openTransactionColumns;
              // this.columnValues.push('actions');
              // this.displayOrderCols=res.data.openTransactionColumns;
            },
            (error) => {}
          );
      }
    });
  }

  async autocompleteSearchColumn() {
    let searchPayload = {
      query: this.searchField,
      tableName: 1,
      column: this.columnSelect,
      username: this.userData.userName,
      wsid:  this.userData.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/NextSuggestedTransactions')
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
  actionDialog(event){
    this.searchField=''
    this.searchAutocompleteList=[]
    this.resetLines();

  }
  ngOnDestroy() {
    this.searchByOrderNumber.unsubscribe();
    this.searchByToteId.unsubscribe();
  }
}

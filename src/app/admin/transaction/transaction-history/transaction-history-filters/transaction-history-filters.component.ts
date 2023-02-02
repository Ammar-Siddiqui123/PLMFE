import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject, takeUntil, interval, Subscription, Observable } from 'rxjs';
import { FloatLabelType } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/init/auth.service';
import { TransactionService } from '../../transaction.service';

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();
let backDate = new Date(year - 50, month, day);
@Component({
  selector: 'app-transaction-history-filters',
  templateUrl: './transaction-history-filters.component.html',
  styleUrls: ['./transaction-history-filters.component.scss'],
})
export class TransactionHistoryFiltersComponent implements OnInit {
  @Output() startDate = new EventEmitter<any>();
  @Output() endDate = new EventEmitter<any>();
  @Output() orderNo = new EventEmitter<any>();
  @Output() resetDates = new EventEmitter<any>();
  searchByOrderNumber = new Subject<string>();
  orderNumber: any;
  searchAutocompleteList: any;
  sdate: any = backDate.toISOString();
  edate: any = new Date().toISOString();
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  public userData: any;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.searchByOrderNumber
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        if(value===""){
          this.onOrderNoChange('')
          return
        }
        this.autocompleteSearchColumn();
         this.onOrderNoChange(value)
      });
  }

  onOrderNoChange(event) {
    this.orderNo.emit(event);
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  resetToTodaysDate() {
    this.edate=new Date().toISOString()
    this.sdate=new Date().toISOString()
    this.resetDates.emit({endDate : new Date().toISOString(),startDate : new Date().toISOString()})
   
  }

  searchData(event) {
    this.onOrderNoChange(event);
    // if (event == this.columnSearch.searchValue) return;
    // if (
    //   this.columnSearch.searchColumn ||
    //   this.columnSearch.searchColumn == ''
    // ) {
    //   this.getContentData();
    // }
  }

  async autocompleteSearchColumn() {
    let searchPayload = {
      query: this.orderNumber,
      tableName: 3,
      column: 'Order Number',
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/NextSuggestedTransactions',true)
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
          // this.getContentData();
        },
        (error) => {}
      );
  }
  onDateChange(event: any): void {
    // this.startdateChange.emit();
    this.sdate = new Date(event).toISOString();
    this.startDate.emit(event);
    // this.getContentData();
  }

  onEndDateChange(event: any): void {
    // this.enddateChange.emit();
    this.edate = new Date(event).toISOString();
    this.endDate.emit(event);
    // this.getContentData();
  }
  ngOnDestroy() {
    this.searchByOrderNumber.unsubscribe();
  }
}

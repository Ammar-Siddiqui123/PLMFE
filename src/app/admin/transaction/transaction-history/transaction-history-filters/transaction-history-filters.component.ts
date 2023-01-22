import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject, takeUntil, interval, Subscription, Observable } from 'rxjs';

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
  @Output() startDate = new EventEmitter<Event>();
  @Output() endDate = new EventEmitter<Event>();
  @Output() orderNo = new EventEmitter<any>();
  searchByOrderNumber = new Subject<string>();
  orderNumber:any;
   sdate: any = backDate.toISOString();
  edate: any = new Date().toISOString();
  constructor() {}

  ngOnInit(): void {
    this.searchByOrderNumber
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((value) => {
     
     this.onOrderNoChange(value)
    });
  }

  onOrderNoChange(event){

      this.orderNo.emit(event);  
 
  
  }
  onDateChange(event:any): void {

    // this.startdateChange.emit();
    this.sdate = new Date(event).toISOString();
    this.startDate.emit(event);    
    // this.getContentData();
  }

  onEndDateChange(event:any): void {
    // this.enddateChange.emit();
        this.edate = new Date(event).toISOString();
    this.endDate.emit(event);    
    // this.getContentData();
  }
}

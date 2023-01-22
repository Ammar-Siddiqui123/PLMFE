import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-tran-select-order',
  templateUrl: './tran-select-order.component.html',
  styleUrls: ['./tran-select-order.component.scss'],
})
export class TranSelectOrderComponent implements OnInit {
  orderNumber: any;
  toteID: any;
  searchByOrderNumber = new Subject<string>();
  searchByToteId = new Subject<string>();
  @Output() orderNo = new EventEmitter<any>();
  @Output() toteId = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.searchByOrderNumber
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.onOrderNoChange(value);
      });

    this.searchByToteId
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.onOrderNoChange(value);
      });
  }

  onOrderNoChange(event) {
    this.orderNo.emit(event);
  }
  onToteIdChange(event) {
    this.toteId.emit(event);
  }
  ngOnDestroy() {
    this.searchByOrderNumber.unsubscribe();
    this.searchByToteId.unsubscribe();
  }
}

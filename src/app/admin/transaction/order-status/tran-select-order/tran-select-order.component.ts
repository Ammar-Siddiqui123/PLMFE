import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
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
  openOrder: any = 0;
  completeOrder: any = 0;
  reprocessOrder: any = 0;
  orderTypeOrder: any = 'not available';
  totalLinesOrder: any = 0;

  searchByOrderNumber = new Subject<string>();
  searchByToteId = new Subject<string>();
  @Output() orderNo = new EventEmitter<any>();
  @Output() toteId = new EventEmitter<any>();

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  searchAutocompleteList: any;
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
  constructor(
    private authService: AuthService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.searchByOrderNumber
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumn();
        this.onOrderNoChange(value);
      });

    this.searchByToteId
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.onToteIdChange(value);
      });
    this.userData = this.authService.userData();
  }

  resetLines(){
    this.openOrder= 0;
    this.completeOrder = 0;
    this.reprocessOrder = 0;
    this.orderTypeOrder= 'not available';
   this.totalLinesOrder= 0;
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  onOrderNoChange(event) {
    this.orderNo.emit(event);
  }
  onToteIdChange(event) {
    this.toteId.emit(event);
  }
  searchData() {
    console.log(this.orderNumber);
    this.onOrderNoChange(this.orderNumber);
    
  }

  async autocompleteSearchColumn() {
    let searchPayload = {
      orderNumber: this.orderNumber,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/OrderNumberNext')
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
        },
        (error) => {}
      );
  }
  
  ngOnDestroy() {
    this.searchByOrderNumber.unsubscribe();
    this.searchByToteId.unsubscribe();
  }
}

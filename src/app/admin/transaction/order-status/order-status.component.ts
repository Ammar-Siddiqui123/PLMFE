import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/init/auth.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnInit {
  orderNoEvent: Event;
  toteIdEvent: Event;
  openOrderEvent: Event;
  completeOrderEvent: Event;
  reprocessOrderEvent: Event;
  orderTypeOrderEvent: Event;
  totalLinesOrderEvent: Event;
  currentStatusOrderEvent: Event;
  locationZonesEvent: Event;
  orderStatusNext = [];
userData;
  constructor(
    private authService: AuthService,
    private transactionService: TransactionService
  ) {}
  ngOnInit(): void {
    this.userData=this.authService.userData();
    this.autocompleteSearchColumn();

  }
  orderNoChange(event: Event) {
    this.orderNoEvent = event;
  }
  toteIdChange(event: Event) {
    this.toteIdEvent = event;
  }

  openOrderChange(event: Event) {
    this.openOrderEvent = event;
  }
  reprocessOrderChange(event: Event) {
    this.reprocessOrderEvent = event;
  }
  orderTypeOrderChange(event: Event) {
    this.orderTypeOrderEvent = event;
  }
  completeOrderChange(event: Event) {
    this.completeOrderEvent = event;
  }
  totalLinesOrderChange(event: Event) {
    this.totalLinesOrderEvent = event;
  }
  currentStatusOrderChange(event: Event) {
    this.currentStatusOrderEvent = event;
  }
  locationZones(event: Event) {
    this.locationZonesEvent = event;
  }
  async autocompleteSearchColumn() {
    let searchPayload = {
      orderNumber: '',
      username:this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/OrderNumberNext')
      .subscribe(
        (res: any) => {
        this.orderStatusNext=res && res.data
        
        },
        (error) => {}
      );
  }
}

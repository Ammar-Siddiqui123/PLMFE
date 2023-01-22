import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnInit {
  orderNoEvent: Event;
  toteIdEvent: Event;
  constructor() {}
  orderNoChange(event: Event) {
    this.orderNoEvent = event;
  }
  toteIdChange(event: Event) {
    this.toteIdEvent = event;
  }
  ngOnInit(): void {}
}

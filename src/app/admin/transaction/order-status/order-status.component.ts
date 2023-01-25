import { Component, OnInit } from '@angular/core';

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
  locationZonesEvent: Event;

  constructor() {}
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
  locationZones(event: Event) {
    alert(event)
    this.locationZonesEvent = event;
  }
  ngOnInit(): void {}
}

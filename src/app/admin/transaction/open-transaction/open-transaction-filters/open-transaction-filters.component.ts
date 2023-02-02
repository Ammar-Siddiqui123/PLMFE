import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-open-transaction-filters',
  templateUrl: './open-transaction-filters.component.html',
  styleUrls: ['./open-transaction-filters.component.scss'],
})
export class OpenTransactionFiltersComponent implements OnInit {
  @Output() nextScreen = new EventEmitter<string>();
  @Output() filterEventChange = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}
  goToOnHold() {
    this.nextScreen.emit('complete');
  }
 
  eventChangeEmitter(event:Event){
    this.filterEventChange.emit(event)
  }
}

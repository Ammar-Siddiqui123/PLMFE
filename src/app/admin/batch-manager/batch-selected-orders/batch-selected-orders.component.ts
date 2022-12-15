import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-batch-selected-orders',
  templateUrl: './batch-selected-orders.component.html',
  styleUrls: ['./batch-selected-orders.component.scss']
})
export class BatchSelectedOrdersComponent implements OnInit {

  @Input() dataSource : any;
  @Input() displayedColumns : any;

  @Output() removeOrderEmitter = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.dataSource =  this.dataSource.filter((i : any) => i.isSelected == 1);
    console.log(changes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  removeOrders(order : any) {
    this.removeOrderEmitter.emit(order);
  }

}

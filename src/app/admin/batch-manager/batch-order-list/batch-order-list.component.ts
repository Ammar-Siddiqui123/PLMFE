import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-batch-order-list',
  templateUrl: './batch-order-list.component.html',
  styleUrls: ['./batch-order-list.component.scss']
})
export class BatchOrderListComponent implements OnInit {

  @Input() dataSource : any;
  @Input() displayedColumns : any;

  @Output() addOrderEmitter = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // this.dataSource =  this.dataSource.filter((i : any) => i.isSelected == 0);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

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

  addOrders(order : any) {
    this.addOrderEmitter.emit(order);
  }

}

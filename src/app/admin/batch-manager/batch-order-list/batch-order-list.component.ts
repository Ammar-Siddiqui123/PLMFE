import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild, Input, SimpleChanges, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-batch-order-list',
  templateUrl: './batch-order-list.component.html',
  styleUrls: ['./batch-order-list.component.scss']
})
export class BatchOrderListComponent implements OnInit {

  // @Input() orderListData : any;
  tableData:any;
  @Input() set orderListData(val: any) {
    this.tableData = new MatTableDataSource(val);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  @Input() displayedColumns : any;
  @Output() addOrderEmitter = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    // console.log(this.orderListData);
  }

  ngAfterViewInit() {
  
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }


  announceSortChange(sortState: Sort) {
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

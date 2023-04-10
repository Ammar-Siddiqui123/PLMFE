import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AdminService } from 'src/app/admin/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-ccb-create-counts',
  templateUrl: './create-counts.component.html',
  styleUrls: ['./create-counts.component.scss']
})

export class CCBCreateCountsComponent implements OnInit {
  selection: any='location';
  sdate: any = new Date();
  edate: any = new Date();
   ELEMENT_DATA: any[] =[
     {item_no: '30022', qty_location: '12', warehouse: 'Work 2141',  lot_no: 'Main 52', expiration_date: 'Jan-25-2023', serial_no: '854120'},
     {item_no: '40022', qty_location: 'loc 1212', warehouse: 'Work 2141',  lot_no: '30', expiration_date: 'Jan-25-2023', serial_no: '854120'},
     {item_no: '50022', qty_location: 'loc 1212', warehouse: 'Work 2141',  lot_no: '100', expiration_date: 'Jan-25-2023', serial_no: '854120'},
     {item_no: '60022', qty_location: 'loc 1212', warehouse: 'Work 2141', lot_no: 'Main 600', expiration_date: 'Jan-25-2023', serial_no: '854120'},
     {item_no: '70022', qty_location: 'loc 1212', warehouse: 'Work 2141',  lot_no: 'Main 600', expiration_date: 'Jan-25-2023', serial_no: '854120'},
     {item_no: '10022', qty_location: 'loc 1212', warehouse: 'Work 2141',  lot_no: 'Main 600', expiration_date: 'Jan-25-2023', serial_no: '854120'},
     {item_no: '20022', qty_location: 'loc 1212', warehouse: 'Work 2141',  lot_no: 'Main 600', expiration_date: 'Jan-25-2023', serial_no: '854120'},
  ];

  displayedColumns: string[] = ['item_no', 'qty_location', 'warehouse', 'lot_no', 'expiration_date', 'serial_no', 'actions'];
  tableData = this.ELEMENT_DATA
  dataSourceList:any
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {

    this.dataSourceList = new MatTableDataSource(this.tableData);
  }
  ngAfterViewInit() {
    this.dataSourceList.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



}

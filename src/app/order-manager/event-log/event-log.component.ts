import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { OmEventLogEntryDetailComponent } from 'src/app/dialogs/om-event-log-entry-detail/om-event-log-entry-detail.component';
import { OrderManagerService } from '../order-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.scss']
})
export class EventLogComponent implements OnInit {

  displayedColumns: string[] = ['dateStamp', 'message', 'eventCode', 'nameStamp', 'eventType', 'eventLocation', 'notes', 'transactionID'];
  dataSourceList: any;

  ignoreDateRange: boolean = false;
  startDate: any = "";
  endDate: any = "";
  message: string = "";
  eventLocation: string = "";
  eventCode: string = "";
  eventType: string = "";
  userName: string = "";
  start: number = 0;
  length: number = 10;
  filterString: string = "1 = 1";
  sortColumn: number = 0;
  sortOrder: string = "desc";

  userData: any;
  tableData: any = [];
  recordsTotal: any;
  recordsFiltered: any;
  eventLogTableSubscribe: any;
  eventLogTypeAheadSubscribe: any;

  searchAutocompleteList: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private orderManagerService: OrderManagerService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.startDate = new Date().toISOString();
    this.endDate = new Date().toISOString();
    this.eventLogTable();
  }

  ngOnDestroy() {
    this.eventLogTableSubscribe.unsubscribe();
  }

  onDateChange(event, key: any): void {
    this.startDate = "";
    this.startDate = event;
  }

  onIgnoreDateRange(ob: MatCheckboxChange) {

  }

  clearFilters() {
    this.startDate = new Date().toISOString();
    this.endDate = new Date().toISOString();
    this.message = "";
    this.eventLocation = "";
    this.userName = "";
    this.message = "";
  }

  openOmEventLogEntryDetail(element: any) {
    let dialogRef = this.dialog.open(OmEventLogEntryDetailComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
      data: {data:element}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  eventLogTable(loader: boolean = false) {
    let payload: any = {
      "draw": 0,
      "start": this.start,
      "length": this.length,
      "sortColumn": 0,
      "sortOrder": "desc",
      "messageFilter": this.message,
      "eventLocation": this.eventLocation,
      "transStatus": this.eventCode,
      "transType": this.eventType,
      "sDate": "2023-05-05",
      "eDate": "2023-06-05",
      "nameStamp": this.userName,
      "filter": this.filterString,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    };
    this.eventLogTableSubscribe = this.orderManagerService.get(payload, '/Admin/EventLogTable', loader).subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.tableData = res.data.openEvents;
        this.recordsTotal = res.data.recordsTotal;
        this.recordsFiltered = res.data.recordsFiltered;
      }
    });
  }

  search(event: any, key: any) {
    this[key] = event.option.value;
    this.resetPagination();
    this.eventLogTable(true);
  }

  resetPagination() {
    this.start = 0;
    this.length = 10;
    this.paginator.pageIndex = 0;
  }

  autocompleteSearchColumn(columnName:any,message:any) {
    this.resetPagination();
    this.eventLogTypeAheadSubscribe.unsubscribe();
    this.eventLogTypeAhead(columnName,message,true);
    this.eventLogTableSubscribe.unsubscribe();
    this.eventLogTable(true);
  }

  eventLogTypeAhead(columnName:any,message:any,loader: boolean = false) {
    this.searchAutocompleteList = [];
    let payload: any = {
      "message": message,
      "columnName": columnName,
      "sDate": "2022-06-04T00:00:00.597Z",
      "eDate": "2023-06-05T00:00:00.597Z",
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.eventLogTypeAheadSubscribe = this.orderManagerService.get(payload, '/Admin/EventLogTypeAhead', loader).subscribe((res: any) => {
      if (res.isExecuted && res.data && message != "") {
        this.searchAutocompleteList = res.data.sort();
      }
    });
  }


}


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SystemReplenishmentService } from '../system-replenishment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-sr-current-order',
  templateUrl: './sr-current-order.component.html',
  styleUrls: ['./sr-current-order.component.scss']
})
export class SrCurrentOrderComponent implements OnInit {

  displayedColumns2: string[] = ['itemNumber', 'transactionType', 'warehouse', 'zone', 'carousel', 'row', 'shelf', 'bin', 'rowNumber', 'lotNumber', 'transactionQuantity', 'description', 'orderNumber', 'unitOfMeasure', 'batchPickID', 'serialNumber', 'completedDate', 'printDate'];
  noOfPicks: number = 0;
  noOfPutAways: number = 0;
  public userData: any;
  tablePayloadObj: any = {
    draw: 0,
    start: 1,
    length: 11,
    searchString: "",
    searchColumn: "",
    sortColumn: "",
    sortDir: "asc",
    status: "",
    filter: "1=1",
    username: "",
    wsid: ""
  };
  tableData: any = [];
  filteredTableData: any = [];
  tableDataTotalCount: number = 0;

  constructor(
    private dialog: MatDialog,
    private systemReplenishmentService: SystemReplenishmentService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.tablePayloadObj.username = this.userData.userName;
    this.tablePayloadObj.wsid = this.userData.wsid;
    this.newReplenishmentOrders();
  }

  newReplenishmentOrders() {
    this.systemReplenishmentService.get(this.tablePayloadObj, '/Admin/SystemReplenishmentTable').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.tableData = res.data.sysTable;
        this.tableDataTotalCount = res.data.recordsTotal;
        this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

}

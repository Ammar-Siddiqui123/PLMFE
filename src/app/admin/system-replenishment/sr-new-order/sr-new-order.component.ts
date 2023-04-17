import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { TransactionQtyEditComponent } from 'src/app/dialogs/transaction-qty-edit/transaction-qty-edit.component';
import { SystemReplenishmentService } from '../system-replenishment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import labels from '../../../labels/labels.json'
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FilterItemNumbersComponent } from '../../dialogs/filter-item-numbers/filter-item-numbers.component';

@Component({
  selector: 'app-sr-new-order',
  templateUrl: './sr-new-order.component.html',
  styleUrls: ['./sr-new-order.component.scss']
})
export class SrNewOrderComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'replenish', 'exists', 'weight', 'symbol', 'ex', 'srno', 'replishment', 'case', 'transaction', 'allocated_pick', 'allocated_put', 'action'];
  tableData: any = [];
  filteredTableData: any = [];
  public userData: any;
  kanban: boolean = false;
  numberSelectedRep: number = 0;
  tablePayloadObj: any = {
    draw: 0,
    start: 0,
    length: 10,
    searchString: "",
    sortColumn: 5,
    searchColumn: "",
    sortDir: "asc",
    reOrder: true,
    filter: "1=1",
    username: "",
    wsid: ""
  };
  tableDataTotalCount: number = 0;
  filterItemNumbersText: string = "";


  constructor(
    private dialog: MatDialog,
    private systemReplenishmentService: SystemReplenishmentService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.tablePayloadObj.username = this.userData.userName;
    this.tablePayloadObj.wsid = this.userData.wsid;
  }

  editTransDialog(element:any): void {
    const dialogRef = this.dialog.open(TransactionQtyEditComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        rP_ID: element.rP_ID, 
        transactionQuantity: element.transactionQuantity,
        availableQuantity: element.availableQuantity,
        replenishmentQuantity: element.replenishmentQuantity
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.tableData.filter((item: any) => {
          if (item.rP_ID == result.rP_ID) {
            item.transactionQuantity = result.transactionQuantity;
          }
        });
      }
    });
  }

  newReplenishmentOrders() {
    this.systemReplenishmentService.get(this.tablePayloadObj, '/Admin/SystemReplenishmentNewTable').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.tableData = res.data.sysTable;
        this.tableDataTotalCount = res.data.recordsTotal;
        this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
        this.numberSelectedRep = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity  > 0).length;
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  onChangeKanban(ob: MatCheckboxChange) {
    // if (confirm("Click OK to create a new replenishment list.")) {
      this.createNewReplenishments(ob.checked);
      // this.newReplenishmentOrders();
    // } else {
    //   ob.checked = !ob.checked;
    //   this.kanban = !ob.checked;
    // }
  }

  createNewOrdersList() {
    if (confirm("Click OK to create a new replenishment list.")) {
      this.createNewReplenishments(this.kanban);
    }
  }

  createNewReplenishments(kanban: boolean) {
    let paylaod = {
      "kanban": kanban,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.systemReplenishmentService.create(paylaod, '/Admin/ReplenishmentInsert').subscribe((res: any) => {
      if (res.isExecuted && res.data) {
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.newReplenishmentOrders();
      } else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  actionChange(event: any) {
    if (event == '1') {
      this.filterItemNo();
    }
    else if (event == '2') {
      this.print();
    }
    else if (event == '3') {
      this.viewAllItems();
    }
    else if (event == '4') {
      this.viewSelectedItems();
    }
    else if (event == '5') {
      this.selectAll();
    }
    else if (event == '6') {
      this.unSelectAll();
    }
  }

  showChange(event: any) {
    if (event == '1') {
      this.tablePayloadObj.reOrder = false;
      this.newReplenishmentOrders();
    }
    else if (event == '2') {
      this.tablePayloadObj.reOrder = true;
      this.newReplenishmentOrders();
    }
  }

  searchChange(event: any) {
    this.tablePayloadObj.searchColumn = event;
    // this.newReplenishmentOrders();
  }

  paginatorChange(event: PageEvent) {
    if(event.previousPageIndex != undefined && event.pageIndex > event.previousPageIndex) {
      this.tablePayloadObj.start = this.tablePayloadObj.start + event.pageSize;
    }
    else {
      this.tablePayloadObj.start = this.tablePayloadObj.start - event.pageSize;
    }
    this.tablePayloadObj.length = event.pageSize;
    this.newReplenishmentOrders();
  }

  viewItemInInventoryMaster(element:any){
    // window.open(`/admin/inventoryMaster?itemNumber=${element.itemNumber}`, '_blank');
    this.router.navigate(['/admin/inventoryMaster'], { queryParams: { itemNumber: element.itemNumber } });
  }

  print(){
    if(confirm('Click OK to print a replenishment report.')){
      alert('Print Service not availabe.');
    }
  }

  selectAll(){
    this.filteredTableData.forEach((element:any) => {
      if(element.transactionQuantity > 0){
        element.replenish = true;
      }
    });
    this.numberSelectedRep = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity  > 0).length;
  }

  unSelectAll(){
    this.filteredTableData.forEach((element:any) => {
      if(element.transactionQuantity > 0){
        element.replenish = false;
      }
    });
    this.numberSelectedRep = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity  > 0).length;
  }

  viewAllItems(){
    this.tableData.forEach((element:any) => {
      let index:any = this.filteredTableData.findIndex((item:any) => item.rP_ID == element.rP_ID);
      if(index != -1){
        element.replenish = this.filteredTableData[index].replenish;
        element.transactionQuantity = this.filteredTableData[index].transactionQuantity;
      }
    });
    this.filteredTableData = JSON.parse(JSON.stringify(this.tableData));
  }

  viewSelectedItems(){
    this.tableData = JSON.parse(JSON.stringify(this. filteredTableData));
    this.filteredTableData = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity  > 0);
  }

  filterItemNo() {
    const dialogRef = this.dialog.open(FilterItemNumbersComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: this.filterItemNumbersText,
    });
    dialogRef.afterClosed().subscribe((result) => {
      debugger;
      if(result){
        this.filterItemNumbersText = result.filterItemNumbersText;
        if(result.filterItemNumbersArray && result.filterItemNumbersArray.length > 0){
          this.newReplenishmentOrders();
        }
      }
    });
  }

  changeReplenish(){
    this.numberSelectedRep = this.filteredTableData.filter((item: any) => item.replenish == true && item.transactionQuantity  > 0).length;
  }

  processReplenishments(){
    if(confirm('Click OK to create replenishment orders for all selected items.')){
      let paylaod = {
        "kanban": this.kanban,
        "username": this.userData.userName,
        "wsid": this.userData.wsid
      }
      this.systemReplenishmentService.create(paylaod, '/Admin/ProcessReplenishments').subscribe((res: any) => {
        if (res.isExecuted && res.data) {
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          this.newReplenishmentOrders()
        } else {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/init/auth.service';
import { AdminService } from '../admin.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-de-allocate-orders',
  templateUrl: './de-allocate-orders.component.html',
  styleUrls: ['./de-allocate-orders.component.scss']
})
export class DeAllocateOrdersComponent implements OnInit {

  ELEMENT_DATA_1: any[] =[
    {order_no: '1202122'},
    {order_no: '1202122'},
    {order_no: '1202122'},
  ]

    displayedColumns_1: string[] = ['select','order_no'];
    tableData_1 = this.ELEMENT_DATA_1
    dataSourceList_1:any
  

  ELEMENT_DATA: any[] =[
    {trans_type: 'Count', order_no: '1202122', priority: '36', required_date: '11/02/2022 11:58 AM', user_field_1: 'Treat with care'},
    {trans_type: 'Count', order_no: '1202122', priority: '36', required_date: '11/02/2022 11:58 AM', user_field_1: 'Treat with care'},
    {trans_type: 'Count', order_no: '1202122', priority: '36', required_date: '11/02/2022 11:58 AM', user_field_1: 'Treat with care'},
  ];
         
  displayedColumns: string[] = ['order_no','item_no','description','priority', 'transactionQuantity','unitOfMeasure','batchPickID','trans_type','deallocate'];
  tableData = this.ELEMENT_DATA
  dataSourceList:any

  public userData: any;
  public itemNumber:any = '';
  public orderNumber = '';
  public chooseSearchType:any;
  public TypeValue:any;

  searchByItem: any = new Subject<string>();
  public searchedItemOrder: any = [];

  constructor(public authService: AuthService,
    public adminService: AdminService) { }

  ngOnInit(): void {
    this.userData = this.authService.userData()
    this.searchByItem
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((value) => {
      // this.TypeValue = value
      this.getAllOrder()
      // value !== '' ? this.dataSourceList = [] : this.getAllOrder();
      this.autocompleteSearchColumnItem()
    });
    this.getAllOrder()
    this.orderItemTable()
  } 



  async autocompleteSearchColumnItem() {
    if(this.chooseSearchType == 'Order Number'){
      let payload = {
        "orderNumber": this.TypeValue,
        "userName": this.userData.userName,
        "wsid": this.userData.wsid
      }
  
      this.adminService.get(payload, '/Admin/AllocatedOrders').subscribe((res: any) => {
        // console.log(res)
        this.searchedItemOrder = res.data
      });
    }
    else if(this.chooseSearchType == 'Item Number'){
      let payload = {
        "itemNumber": this.TypeValue,
        "userName": this.userData.userName,
        "wsid": this.userData.wsid
      }
  
      this.adminService.get(payload, '/Admin/AllocatedItems').subscribe((res: any) => {
        // console.log(res)
        this.searchedItemOrder = res.data
      });
    }

  }

  optionSelect(event: MatAutocompleteSelectedEvent): void {
    // console.log(event.option.value)
    // debugger
    // this.TypeValue =   event.option.value
    this.getAllOrder()
    // this.TypeValue = event.option
  }

  // locationchangeSelect(event: MatAutocompleteSelectedEvent): void {
  //   // debugger
  //   this.itemLocation = '';
  //   setTimeout(() => { 
  //     this.itemLocation = event.option.value.location; 
  //     // this.itemQty = Number(event.option.value.itemQuantity)
  //     // console.log(event.option.value.itemQuantity)
  //     this.onLocationSelected(this.itemLocation)
  //   }, 1);
  // }


  // getRow(search){
  //   debugger
  //   console.log(search)
  //   this.TypeValue = search
  // }


  check(e){
    this.dataSourceList = []
    this.chooseSearchType = e
    this.searchedItemOrder.length = 0
  }

  getAllOrder(e?){
    // console.log(this.chooseSearchType)
    let payload = {
      "orderNumber": this.chooseSearchType == 'Order Number'?this.TypeValue:'',
      "itemNumber": this.chooseSearchType == 'Item Number'?this.TypeValue:'',
      "transType": e?.value ?? "All", 
      "userName": this.userData.userName,
      "wsid": this.userData.wsid
    }
    // console.log(payload)
    this.adminService.get(payload,'/Admin/AllAllocatedOrders').subscribe((res=>{
      console.log(res.data)
      this.dataSourceList= res.data
    }))
    
  }


  orderItemTable(){
  let payload =  {
      "draw": 1,
      "start": 0,
      "length": 15,
      "sortColumn": 0,
      "sortOrder": "asc",
      "transType": "All",
      "displayFilter": "All",
      "orderNum": "",
      "warehouse": "",
      "filter": "1 = 1",
      "username": "1234",
      "wsid": "TESTWSID"
    }
    this.adminService.get(payload,'/Admin/OrderItemsTable').subscribe((res=>{
      this.dataSourceList_1 = res.data.openTransactions
    }))
  }

}

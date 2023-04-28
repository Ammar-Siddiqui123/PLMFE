import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConsolidationManagerService } from '../consolidation-manager.service';
import { AuthService } from '../../../app/init/auth.service';
import { event } from 'jquery';
import { CmConfirmAndPackingSelectTransactionComponent } from 'src/app/dialogs/cm-confirm-and-packing-select-transaction/cm-confirm-and-packing-select-transaction.component';
import { CmConfirmAndPackingComponent } from 'src/app/dialogs/cm-confirm-and-packing/cm-confirm-and-packing.component';
import { CmItemSelectedComponent } from 'src/app/dialogs/cm-item-selected/cm-item-selected.component';
import { CmOrderNumberComponent } from 'src/app/dialogs/cm-order-number/cm-order-number.component';
import { CmPrintOptionsComponent } from 'src/app/dialogs/cm-print-options/cm-print-options.component';
import { CmShippingTransactionComponent } from 'src/app/dialogs/cm-shipping-transaction/cm-shipping-transaction.component';
import { CmShippingComponent } from 'src/app/dialogs/cm-shipping/cm-shipping.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CmOrderToteConflictComponent } from 'src/app/dialogs/cm-order-tote-conflict/cm-order-tote-conflict.component';

@Component({
  selector: 'app-consolidation',
  templateUrl: './consolidation.component.html',
  styleUrls: ['./consolidation.component.scss']
})
export class ConsolidationComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;


  @ViewChild('ordernum') ordernum: ElementRef;

  public startSelectFilter: any = '1'
  public sortBy: number
  public open: number
  public completed: number
  public backOrder: number
  public TypeValue: any
  public userData: any;
  public filterValue:any;
  public consolidationIndex:any;
  public IdentModal:any;
  public nextOrderbtn:boolean = false;
  public unverifybtn:boolean = true;
  public verifybtn:boolean = true;
  public packingbtn:boolean = true;
  public stagingbtn:boolean = true;
  public shippingbtb:boolean = true;
  public orderstatusbtn:boolean = false;
  public type :any ='';

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  public isitemVisible:boolean = true;
  public issupplyVisible:boolean = false;

  searchByItem: any = new Subject<string>();
  searchAutocompleteItemNum: any = [];

  ELEMENT_DATA: any[] = [
    { tote_id: '30022', location: 'Work 2141', staged_by: 'Main 52', staged_date: 'Jan-25-2023' },
    { tote_id: '30022', location: 'Work 2141', staged_by: 'Main 52', staged_date: 'Jan-25-2023' },
    { tote_id: '30022', location: 'Work 2141', staged_by: 'Main 52', staged_date: 'Jan-25-2023' },
    { tote_id: '30022', location: 'Work 2141', staged_by: 'Main 52', staged_date: 'Jan-25-2023' },

  ];

  displayedColumns: string[] = ['toteID', 'complete', 'stagingLocation', 'stagedBy', 'stagedDate'];
  stageTable;
  dataSourceList: any

  displayedColumns_1: string[] = ['itemNumber', 'lineNumber', 'transactionQuantity', 'toteID', 'lineStatus', 'serialNumber', 'userField1', 'actions'];
  tableData_1: any;
  dataSourceList_1: any

  ELEMENT_DATA_2: any[] = [
    { item_no: '30022', supplier_item_id: 'Work 2141', line_no: 'Work 2141', completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },
    { item_no: '30022', supplier_item_id: 'Work 2141', line_no: 'Work 2141', completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },
    { item_no: '30022', supplier_item_id: 'Work 2141', line_no: 'Work 2141', completed_qty: 'Main 52', tote_id: 'Jan-25-2023', serial_no: 'Jan-25-2023', user_field1: 'Jan-25-2023', },

  ];

  displayedColumns_2: string[] = ['itemNumber', 'supplierItemID', 'lineNumber', 'completedQuantity', 'toteID', 'serialNumber', 'userField1', 'actions'];
  tableData_2 :any;
  dataSourceList_2: any

  filterOption :any= [
    {key: '1', value: 'Item Number'},
    {key: '2', value: 'Supplier Item ID'},
    {key: '10', value: 'Lot Number'},
    {key: '8', value: 'Serial Number'},
    {key: '9', value: 'User Field 1'},
    {key: '0', value: 'Any Code'},
    {key: '6', value: 'Tote ID'},
  ];

  constructor(private dialog: MatDialog, private toastr: ToastrService,
    private router: Router, private consolidationHub: ConsolidationManagerService, private authService: AuthService,  private _liveAnnouncer: LiveAnnouncer,) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
   this.ConsolidationIndex();
   this.searchByItem
   .pipe(debounceTime(400), distinctUntilChanged())
   .subscribe((value) => {
    this.autocompleteSearchColumnItem()
   });
    }
  hideRow = true;
  firstTable= true;


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.tableData_1.sort = this.sort;
    
  }
  announceSortChange2(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.tableData_2.sort = this.sort;
  }
  announceSortChange3(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.stageTable.sort = this.sort;
  }

  clickToHide() {
    this.hideRow = !this.hideRow;
    this.firstTable = !this.firstTable;
  }

  enterOrderID(event) {
    this.TypeValue = event.target.value;

    if (event.keyCode == 13) {
      this.getTableData("", this.TypeValue);
      

    }
  }

  ConsolidationIndex(){
    let payload = {
      "username": this.userData.username,
      "wsid": this.userData.wsid,
      "orderNumber": this.TypeValue
    }
    this.consolidationHub.get(payload, '/Consolidation/ConsolidationIndex').subscribe((res: any) => {
      if(res.isExecuted){
        this.consolidationIndex = res.data;
      }
    });
  }

  getTableData(type: any, TypeValue: any) {
    let curValue = TypeValue;
    let payload = {
      "type": this.type,
      "selValue": curValue,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }

    this.consolidationHub.get(payload, '/Consolidation/ConsolidationData').subscribe((res: any) => {
      if (res.isExecuted) {
        if ((typeof res.data == 'string')) {
          switch (res.data) {
            case "DNE":
              this.toastr.error("Consolidatio The Order/Tote that you entered is invalid or no longer exists in the system.", 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
              this.ordernum.nativeElement.focus();
              break;

            case "Conflict":
              this.openCmOrderToteConflict()
              this.toastr.error("The Value you Entered matched a Tote and Order Number, select one to Continue.", 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
              break;

            case "Error":
              this.toastr.error("An Error occured while retrieving data.", 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
              break;
          }

        }
        else {
          this.btnEnable();
          this.open = res.data.openLinesCount;
          this.completed = res.data.reprocessLinesCount;
          this.backOrder = res.data.reprocessLinesCount;
          this.tableData_1 = new MatTableDataSource(res.data.consolidationTable);
          this.tableData_2 = new MatTableDataSource(res.data.consolidationTable2);

          
          this.tableData_1.paginator = this.paginator;
          this.tableData_2.paginator = this.paginator2;
          
          this.stageTable = [];
          this.stageTable = res.data.stageTable;
          this.stageTable.paginator = this.paginator3;
          
          let payload = {
            "orderNumber": curValue,
            "username": this.userData.username,
            "wsid": this.userData.wsid
          }

          this.consolidationHub.get(payload, '/Consolidation/ShippingButtSet').subscribe((res:any)=>{
            if(res.data == 1){
              this.enableConButts()
              this.shippingbtb = false;
            }
            else if(res.data == 0){
              this.enableConButts()
              this.shippingbtb = true;
            }
            else{
              this.toastr.error('Error has occured', 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
            }
            
          })
        }
      }
      else {
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    })
  }

  verifyAll() {
    
    let IDS: any = [];
    this.tableData_1.data.forEach((row: any) => {
      // row.lineStatus != "Not Completed" && row.lineStatus != "Not Assigned"
      if (row.lineStatus != "Not Completed" && row.lineStatus != "Not Assigned") {
        IDS.push(row.id.toString())
      }
    });
    let payload = {
      "iDs": 
        IDS
      ,
      "username": this.userData.userName, 
      "wsid": this.userData.wsid
    }
    this.consolidationHub.get(payload, '/Consolidation/VerifyAllItemPost').subscribe((res: any) => {
      if(!res.isExecuted){
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });

      }
      else {
        let z: any[] = [];
        this.tableData_1.data.forEach((row:any) => {
          // check if the value at row.itemNumber exists in the IDS array using the indexOf method. 
          if(IDS.indexOf(row.id.toString()) != -1) {
              z.push(row)
          }
        });

        let data = this.tableData_2.data;
        data.push(...z);
        this.tableData_2 = new MatTableDataSource(data);


        // this.tableData_2.data.push(...z)
        this.tableData_1.data = this.tableData_1.data.filter((el)=>{
            return !z.includes(el)
        })

        if(this.tableData_1.data.length == 0){
          this.toastr.info('You have consolidated all items in this order', 'Alert!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
         }
      }
    })
  }

  unVerifyAll(){

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'remove-batch-list',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Yes') {
        let IDS :any = [];
        this.tableData_2.data.forEach((row:any)=>{
          IDS.push(row.id.toString())
        }
        )
    
        let payload = {
          "iDs": IDS,
          "username": this.userData.userName, 
          "wsid": this.userData.wsid
        }
        this.consolidationHub.get(payload, '/Consolidation/UnVerifyAll').subscribe((res: any) => {
    
          if(!res.isExecuted){
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
    
          }
          else{
            this.tableData_1.data = this.tableData_1.data.concat(this.tableData_2.data);
            this.tableData_2.data = [];
          }
         
        })
      }
    });


 
  }

 verifyLine(index){
  

  let id = this.tableData_1.data[index].id;
  let status = this.tableData_1.data[index].lineStatus;

  //  status == "Not Completed" || status == "Not Assigned"
   if(status == "Not Completed" || status == "Not Assigned"){
    this.toastr.error("The selected item has not yet been completed and can't be verified at this time", 'Error!', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000
    });
   }
   else{
    let payload = {
      "id": id,
      "username": this.userData.userName ,
      "wsid": this.userData.wsid
    }

    this.consolidationHub.get(payload, '/Consolidation/VerifyItemPost').subscribe((res:any)=>{
      if(res.isExecuted){

        let data = this.tableData_2.data;
        data.push({...this.tableData_1.data[index]});
        this.tableData_2 = new MatTableDataSource(data);
        
        
        let data2 = this.tableData_1.data;
        data2.splice(index, 1);
        this.tableData_1 = new MatTableDataSource(data2);
        
      }
      else{
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }

    })
   }
  }

  unverifyLine(index,id){
    console.log(this.tableData_1.data)
    console.log(this.tableData_2.data)
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'remove-batch-list',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res == 'Yes'){
    let payload = {
      "id":id,
      "username": this.userData.userName ,
      "wsid": this.userData.wsid
    }
    this.consolidationHub.get(payload,'/Consolidation/DeleteVerified').subscribe((res:any)=>{
        console.log(res) 
        if(res.isExecuted){

          let data2 = this.tableData_1.data;
          data2.push({...this.tableData_2.data[index]});
          this.tableData_1 = new MatTableDataSource(data2);
          
          
          let data = this.tableData_2.data;
          data.splice(index, 1);
          this.tableData_2 = new MatTableDataSource(data);

          
        }
        else{
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
    })

      }
    });
  }

  filtervalue(event){
    if (event.keyCode == 13) {
      this.CheckDuplicatesForVerify(this.filterValue);
    }

  }

  checkVerifyType(columnIndex, val){
   let filterVal = this.filterValue.toLowerCase();
    this.filterValue = '';
    if (val != undefined) {
      filterVal = val.toLowerCase();
  }
    let valueCount = 0;
    let index;
    this.tableData_1.data.forEach((row:any,i: any)=>{
      // console.log(row ,i);
      let currentColVal = row.itemNumber.toLowerCase();
      console.log(currentColVal)
      if (currentColVal == filterVal) {        
        index = i;
        valueCount++;
      }
    })
    return { index: index, valueCount: valueCount }

  }

  CheckDuplicatesForVerify(val){
    let columnIndex = this.startSelectFilter;
    let result:any;
    if(columnIndex == 0){

      this.filterOption.forEach((e:any) => {
        result = this.checkVerifyType(e.key, val);
        if (result.valueCount >=  1 || e.key == 0) {
           false;             
        }      
      });
                  
    }
    else {
      result = this.checkVerifyType(columnIndex, val);
      // console.log(result,'resultttt')

    }

    // desturcturing
    const { verifyItems, blindVerifyItems } = this.consolidationIndex.cmPreferences;
    // result.valueCount >=1 && verifyItems == 'No' && blindVerifyItems == 'No'
    if(result.valueCount >=1 && verifyItems == 'No' && blindVerifyItems == 'No'){
      const dialogRef = this.dialog.open(CmItemSelectedComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          IdentModal:this.TypeValue,
          ColLabel:this.startSelectFilter,
          ColumnModal:val
        }
      });

      dialogRef.afterClosed().subscribe(result =>{
        console.log(result)
      })
    }
    else if(result.valueCount>=1){
      this.verifyLine(result.index)
    }
    else{
      this.toastr.error('Item not in order or has already been consolidated', 'error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
  }

  getSelected(event: MatSelectChange): void {

    this.startSelectFilter = event.value;
    
    if(event.value == 1){
      this.isitemVisible = true;
      this.issupplyVisible = false;
      this.displayedColumns_1.shift()
      this.displayedColumns_1.unshift('itemNumber')   
    }
    else if(event.value == 2){
      this.isitemVisible = false;
      this.displayedColumns_1.shift()
      this.displayedColumns_1.unshift('supplierItemID')
       this.issupplyVisible = true;
    }
    else{
      this.isitemVisible = true;
      this.issupplyVisible = false;
      this.displayedColumns_1.shift()
      this.displayedColumns_1.unshift('itemNumber')
    }
  }



  btnEnable(){
    this.verifybtn = false;
    this.unverifybtn = false;

  }

  btnDisable(){
    this.verifybtn = true;
    this.unverifybtn = true;

  }


  enableConButts(){
    this.nextOrderbtn = false;
    this.stagingbtn = false;
    this.packingbtn = false;
    this.verifybtn = false;
    this.unverifybtn = false;
   

  }

  disableConButts(){
    this.nextOrderbtn = true;
    this.stagingbtn = true;
    this.packingbtn = true;
    this.verifybtn = true;
    this.unverifybtn = true;
 
  }

  clearpagedata(){
    this.tableData_1 = [];
    this.tableData_2 = [];
      this.stageTable = [];
      this.TypeValue = '';
      
  }

  async autocompleteSearchColumnItem() {

    let payload = {
      "column": this.startSelectFilter,
      "value": this.filterValue,
      "orderNumber": this.TypeValue,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }

    this.consolidationHub.get(payload, '/Consolidation/ConsoleItemsTypeAhead').subscribe((res: any) => {
      this.searchAutocompleteItemNum = res.data;
    })


  }

 
  getRow(filtervalue) {
    this.CheckDuplicatesForVerify(filtervalue);

  }

 openCmShipping() {
  let dialogRef = this.dialog.open(CmShippingComponent, {
    height: 'auto',
    width: '96vw',
    autoFocus: '__non_existing_element__',
    data: {orderNumber:this.TypeValue }
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.getTableData(null,this.TypeValue);
  }
  })
 }

 openCmShippingTransaction() {
  let dialogRef = this.dialog.open(CmShippingTransactionComponent, {
    height: 'auto',
    width: '96vw',
    autoFocus: '__non_existing_element__',
    data: {
      orderNum: this.TypeValue ? this.TypeValue : '2909782A',
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && result.isExecuted) {
      this.getTableData("", this.TypeValue);
    }
  });
 }

 openCmConfirmPacking() {
  let dialogRef = this.dialog.open(CmConfirmAndPackingComponent, {
    height: 'auto',
    width: '96vw',
    autoFocus: '__non_existing_element__',
    data:{orderNumber:this.TypeValue}
   
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result){
        this.getTableData(null,this.TypeValue);
    }
    
  })
 }

 openCmOrderNo() {
  this.clearpagedata();
  this.ordernum.nativeElement.focus();
  this.disableConButts();

  // let dialogRef = this.dialog.open(CmOrderNumberComponent, {
  //   height: 'auto',
  //   width: '50vw',
  //   autoFocus: '__non_existing_element__',
   
  // })
  // dialogRef.afterClosed().subscribe(result => {
    
    
  // })
 }

 openCmItemSelected() {
  let dialogRef = this.dialog.open(CmItemSelectedComponent, {
    height: 'auto',
    width: '50vw',
    autoFocus: '__non_existing_element__',
   
  })
  dialogRef.afterClosed().subscribe(result => {
    
    
  })
 }

 openCmSelectTransaction() {
  let dialogRef = this.dialog.open(CmConfirmAndPackingSelectTransactionComponent, {
    height: 'auto',
    width: '50vw',
    autoFocus: '__non_existing_element__',
   
  })
  dialogRef.afterClosed().subscribe(result => {
    
    
  })
 }

 openCmPrintOptions() {
  let dialogRef = this.dialog.open(CmPrintOptionsComponent, {
    height: 'auto',
    width: '560px',
    autoFocus: '__non_existing_element__',
   
  })
  dialogRef.afterClosed().subscribe(result => {
    
    
  })
 }
 
 openPacking() {
  if (this.consolidationIndex.cmPreferences.confirmAndPacking) {
    this.openCmConfirmPacking();
  } else {
    this.openCmShippingTransaction()
  }
 }

 openCmOrderToteConflict() { 
  let dialogRef = this.dialog.open(CmOrderToteConflictComponent, { 
    height: 'auto',
    width: '620px',
    autoFocus: '__non_existing_element__', 
  })
  dialogRef.afterClosed().subscribe(result => { 
      this.type = result;  
      if(this.type) this.getTableData(null,this.TypeValue);
  })
 }

 navigateToOrder() {
  this.router.navigate([]).then((result) => {
    window.open(
      `/#/admin/transaction?orderStatus=${this.TypeValue}`,
      '_blank'
    );
  });
 }

}



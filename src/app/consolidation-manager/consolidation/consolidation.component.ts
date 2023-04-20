import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConsolidationManagerService } from '../consolidation-manager.service';
import { AuthService } from '../../../app/init/auth.service';
import { event } from 'jquery';
import { ItemSelected } from './item-selected';

@Component({
  selector: 'app-consolidation',
  templateUrl: './consolidation.component.html',
  styleUrls: ['./consolidation.component.scss']
})
export class ConsolidationComponent implements OnInit {

  // @ViewChild('TypeValue') TypeValue: ElementRef;
  public startSelectFilter: number
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
  public unverifybtn:boolean = false;
  public verifybtn:boolean = false;
  public packingbtn:boolean = false;
  public stagingbtn:boolean = false;
  public shippingbtb:boolean = true;
  public orderstatusbtn:boolean = false;


  public isitemVisible:boolean = true;
  public issupplyVisible:boolean = false;

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
    private router: Router, private consolidationHub: ConsolidationManagerService, private authService: AuthService,) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
   this.ConsolidationIndex();
  //  console.log(this.filterOption[1].value,'xxx')
    }
  hideRow = false;

  clickToHide() {
    this.hideRow = !this.hideRow;
  }

  enterOrderID(event) {
    // console.log(event.target.value);
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
      // console.log(res)
      if(res.isExecuted){
        this.consolidationIndex = res.data;
        // console.log(this.consolidationIndex)
      }
    });
  }

  getTableData(type: any, TypeValue: any) {
    let curValue = TypeValue;
    let payload = {
      "type": "",
      "value": curValue,
      "username": this.userData.username,
      "wsid": this.userData.wsid
    }

    this.consolidationHub.get(payload, '/Consolidation/ConsoleDataSB').subscribe((res: any) => {
      console.log(res,"f")

      if (res.isExecuted) {
        let tableData = res.data.toteCount.columnName
        // console.log(tableData)
        // typeof tableData == 'string'
        if ((false)) {
          switch (tableData) {
            case "DNE":
              alert("Consolidatio The Order/Tote that you entered is invalid or no longer exists in the system.")
              // this.TypeValue.focus();
              break;

            case "Conflict":
              // this.ShowOrderToteConflictModal(curValue, getTableData)
              alert("The Value you Entered matched a Tote and Order Number, select one to Continue")


              break;

            case "Error":
              alert("An Error occured while retrieving data")
              break;
          }

        }

        else {
          this.open = res.data.consoleDataSB.openLinesCount;
          this.completed = res.data.consoleDataSB.reprocessLinesCount;
          this.backOrder = res.data.consoleDataSB.reprocessLinesCount;
          this.tableData_1 = res.data.consoleDataSB.consolidationTable;
          this.tableData_2 = res.data.consoleDataSB.consolidationTable2;
          this.stageTable = [];
          this.stageTable = res.data.consoleDataSB.stageTable;
          
          let payload = {
            "orderNumber": curValue,
            "username": this.userData.username,
            "wsid": this.userData.wsid
          }

          this.consolidationHub.get(payload, '/Consolidation/ShippingButtSet').subscribe((res:any)=>{
            // console.log(res)
            if(res.data == 1){
              this.enableConButts()
              this.shippingbtb = false;
            }
            else if(res.data == 0){
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
        // console.log(res.responseMessage)
      }

    })


  }

  verifyAll() {
    // debugger
    let IDS: any = [];

    // get all the rows  of table tableData_1
    this.tableData_1.forEach((row: any) => {
      // row.lineStatus != "Not Completed" && row.lineStatus != "Not Assigned"
      if (true) {
        IDS.push(row.id.toString())
        console.log(row.lineStatus)
      }
    });
    let payload = {
      "iDs": 
        IDS
      ,
      "username": this.userData.userName, 
      "wsid": this.userData.wsid
    }
    console.log(payload)
    this.consolidationHub.get(payload, '/Consolidation/VerifyAllItemPost').subscribe((res: any) => {
      console.log(res)

      if(!res.isExecuted){
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });

      }
      else {
        console.log('else')
        let z: any[] = [];
        this.tableData_1.forEach((row:any) => {
          // check if the value at row.itemNumber exists in the IDS array using the indexOf method. 
          if(IDS.indexOf(row.id.toString()) != -1) {
            console.log("inside")
            let left = row
            // z.push(left.index())
            this.tableData_2.unshift(row);
            this.tableData_2 = this.tableData_2
            console.log(this.tableData_2)
          }

          // this.tableData_2.push(...this.tableData_1.splice(z,1));
          // this.tableData_2 = this.tableData_1.splice(z,1)
          
         
          //  if(this.tableData_1.length == 0){
          //   this.toastr.info('You have consolidated all items in this order', 'Alert!', {
          //     positionClass: 'toast-bottom-right',
          //     timeOut: 2000
          //   });
          //  }
          
        });
        console.log("clear")
        this.tableData_1 = [];
        
      }
     
    })



  }

  unVerifyAll(){
    let IDS :any = [];
    this.tableData_2.forEach((row:any)=>{
      // console.log(row)
      IDS.push(row.id.toString())
    }
    )

    let payload = {
      "iDs": IDS,
      "username": this.userData.userName, 
      "wsid": this.userData.wsid
    }
    this.consolidationHub.get(payload, '/Consolidation/UnVerifyAll').subscribe((res: any) => {
      // console.log(res,'unverify')

      if(!res.isExecuted){
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });

      }
      else{
        this.tableData_1 = this.tableData_1.concat(this.tableData_2);
        this.tableData_2 = [];
      }
     
    })
  }

 verifyLine(index,id,status){
    // console.log(index, id,status)
   console.log(this.tableData_2)

  //  status == "Not Completed" || status == "Not Assigned"
   if(false){
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
    console.log(payload)
    // console.log(this.tableData_1)

    this.consolidationHub.get(payload, '/Consolidation/VerifyItemPost').subscribe((res:any)=>{
      // console.log(res)
      if(true){
        // this.tableData_2 = this.tableData_1.splice(index,1)
        this.tableData_2.push(...this.tableData_1.splice(index, 1))
        console.warn("s")
        this.getTableData("", this.TypeValue);
        // console.log(index)
        // console.log(this.tableData_2)
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
    let payload = {
      "id":id,
      "username": this.userData.userName ,
      "wsid": this.userData.wsid
    }
    this.consolidationHub.get(payload,'/Consolidation/DeleteVerified').subscribe((res:any)=>{
        // console.log(res) 
        if(res.isExecuted){
          // this.tableData_1 = this.tableData_2.splice(index,1)
          // this.tableData_2;
          this.tableData_1.push(...this.tableData_2.splice(index, 1))
          console.warn()
          this.consolidationHub
          // this.tableData_1.push(...this.tableData_2.splice(index, 1))
          
        }
        else{
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
    })

  }

  filtervalue(event){
    console.log(event.target.value)
    this.filterValue = event.target.value;
    if (event.keyCode == 13) {
      this.CheckDuplicatesForVerify(this.filterValue);
    //  this.clearRemoteCache();
    // this.checkVerifyType(1,1)
    }

  }

  checkVerifyType(columnIndex, val){
    // convert to lowercase
    this.filterValue = this.filterValue.toLowerCase();
    this.filterValue = '';
    if (val != undefined) {
      this.filterValue = val.toLowerCase();
  }
    let valueCount = 0;
    let index = -1;
    this.tableData_1.forEach((row:any,i: any)=>{
      // console.log(row ,i);
      let currentColVal = row[columnIndex].toLowerCase();
      if (currentColVal == this.filterValue) {        
        index = i;
        valueCount++;
      }
       return { index: index, valueCount: valueCount }
    })

  }

  CheckDuplicatesForVerify(val){
    let columnIndex = this.startSelectFilter;
    let result;
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

    }

    // desturcturing
    const { verifyItems, blindVerifyItems } = this.consolidationIndex.cmPreferences;
    if(result.valueCount >=1 && verifyItems == 'No' && blindVerifyItems == 'No'){
      const dialogRef = this.dialog.open(ItemSelected, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          IdentModal:this.TypeValue,
          ColLabel:this.startSelectFilter
        }
      });

    }
    else if(result.valueCount>=1){
      this.verifyLine(result.index,'','')
    }
    else{
      this.toastr.error('Item not in order or has already been consolidated', 'error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
  }

  getSelected(event: MatSelectChange): void {
    console.log(event.value); // get selected value
    console.log(event.source); // get all source options

    this.startSelectFilter = event.value;
    let startSelectFilterName = event.source
    
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


  onClick() {
    console.log(this.tableData_1)
    console.log(this.tableData_2)
    // hide the column of this.tableData_1 itemnumber
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

}



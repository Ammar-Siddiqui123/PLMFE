import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BatchManagerService } from './batch-manager.service';
import { AuthService } from '../../../app/init/auth.service';

const ELEMENT_DATA: any = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', action: ''},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', action: ''},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', action: ''},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', action: ''},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', action: ''},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', action: ''},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', action: ''},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', action: ''},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', action: ''},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', action: ''},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', action: ''},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', action: ''},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', action: ''},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', action: ''},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', action: ''},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', action: ''},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', action: ''},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', action: ''},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', action: ''},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', action: ''},
];

const INVMAP_DATA = [
  { colHeader: "location", colDef: "Location" },
  { colHeader: "zone", colDef: "Zone" },
  { colHeader: "carousel", colDef: "Carousel" },
  { colHeader: "row", colDef: "Row" },
  { colHeader: "shelf", colDef: "Shelf" },
  { colHeader: "bin", colDef: "Bin" },
  { colHeader: "itemNumber", colDef: "Item Number" },
  { colHeader: "itemQuantity", colDef: "Item Quantity" },
  { colHeader: "description", colDef: "Description" },
  { colHeader: "cellSize", colDef: "Cell Size" },
  { colHeader: "goldenZone", colDef: "Velocity Code" },
  { colHeader: "maximumQuantity", colDef: "Maximum Quantity" },
  { colHeader: "dedicated", colDef: "Dedicated" },
  { colHeader: "serialNumber", colDef: "Serial Number" },
  { colHeader: "lotNumber", colDef: "Lot Number" },
  { colHeader: "expirationDate", colDef: "Expiration Date" },
  { colHeader: "unitOfMeasure", colDef: "Unit of Measure" },
  { colHeader: "quantityAllocatedPick", colDef: "Quantity Allocated Pick" },
  { colHeader: "quantityAllocatedPutAway", colDef: "Quantity Allocated Put Awa" },
  { colHeader: "putAwayDate", colDef: "Put Away Date" },
  { colHeader: "warehouse", colDef: "Warehouse" },
  { colHeader: "revision", colDef: "Revision" },
  { colHeader: "invMapID", colDef: "Inv Map ID" },
  { colHeader: "userField1", colDef: "User Field1" },
  { colHeader: "userField2", colDef: "User Field2" },
  { colHeader: "masterLocation", colDef: "Master Location" },
  { colHeader: "dateSensitive", colDef: "Date Sensitive" },
  { colHeader: "masterInvMapID", colDef: "Master Inv Map ID" },
  { colHeader: "minQuantity", colDef: "Min Quantity" },
  { colHeader: "laserX", colDef: "Laser X" },
  { colHeader: "laserY", colDef: "Laser Y" },
  { colHeader: "locationNumber", colDef: "Location Number" },
  { colHeader: "locationID", colDef: "Alternate Light" },
  { colHeader: "qtyAlcPutAway", colDef: "Quantity Allocated Put Away" },
];

@Component({
  selector: 'app-batch-manager',
  templateUrl: './batch-manager.component.html',
  styleUrls: ['./batch-manager.component.scss']
})
export class BatchManagerComponent implements OnInit {  
  batchUpdater: Event;
  public userData : any;
  orderList : any;
  displayOrderCols : string[] = ["orderNumber", "countOfOrderNumber", "minOfPriority", "detail", "action"];
  selOrderList : any = [];
  type:any;
  batchManagerSettings : any = [];
  displaySelOrderCols : string[] = ["orderNumber", "countOfOrderNumber", "action"];

  constructor(private batchService : BatchManagerService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.orderList = [];
    this.selOrderList = [];
    this.userData = this.authService.userData();
    this.getOrders("Pick");
  }
  onBatchUpdate(event: Event) {
    this.batchUpdater = event;
  }
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  // dataSource : any;

  getOrders(type : any) {
    this.type = type;
    let paylaod = {
      "transType": type,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    try {
      this.batchService.get(paylaod, '/Admin/BatchManagerOrder').subscribe((res: any) => {
        // const { data, isExecuted } = res
        // if (isExecuted && data.length > 0) {
        //   this.orderList = data;
        // } else {

        // }
        this.orderList = [
          {"orderNumber":"2950310","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950311","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950312","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950313","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950314","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950315","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950316","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950317","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950318","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950319","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950320","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950321","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950322","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950313","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950314","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950315","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950316","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950317","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950318","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950319","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950330","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
          {"orderNumber":"2950331","minOfPriority":0,"countOfOrderNumber":2,"includeInAutoBatch":false,"extraField1":"0","extraField2":""},
        
        
        ];
      });
      this.batchService.get(paylaod, '/Admin/GetBatchManager').subscribe((res: any) => {
        const { data, isExecuted } = res
        if (isExecuted) {
          this.batchManagerSettings = data.batchManagerSettings;
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  
  }

  addRemoveOrder(order : any, type : any) {
    if (type == 1) {
      this.orderList = this.orderList.filter(val => val.orderNumber !== order.orderNumber);
      this.selOrderList = [order, ...this.selOrderList];
      
    } else {
      this.selOrderList = this.selOrderList.filter(val => val.orderNumber !== order.orderNumber);
      this.orderList = [order, ...this.orderList];
    }
  }
  addRemoveAllOrders(operation){
    if(operation === 'add'){
        this.selOrderList = [...this.selOrderList,...this.orderList];
        this.orderList = [];
    }
    else if(operation === 'remove'){
      this.orderList = [...this.orderList,...this.selOrderList];
      this.selOrderList = [];
    }
    
  }
  batchCreated(event:any){
    if(event){
      this.ngOnInit();
    }
  }

}

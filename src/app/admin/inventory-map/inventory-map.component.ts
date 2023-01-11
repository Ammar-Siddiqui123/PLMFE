import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../init/auth.service';
import { AddInvMapLocationComponent } from '../dialogs/add-inv-map-location/add-inv-map-location.component';
import { AdjustQuantityComponent } from '../dialogs/adjust-quantity/adjust-quantity.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { QuarantineConfirmationComponent } from '../dialogs/quarantine-confirmation/quarantine-confirmation.component';
import { SetColumnSeqComponent } from '../dialogs/set-column-seq/set-column-seq.component';
import { SetColumnSeqService } from '../dialogs/set-column-seq/set-column-seq.service';
import { InventoryMapService } from './inventory-map.service';


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
  selector: 'app-inventory-map',
  templateUrl: './inventory-map.component.html',
  styleUrls: ['./inventory-map.component.scss']
})
export class InventoryMapComponent implements OnInit {
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);


  public displayedColumns: any ;
  public dataSource: any = new MatTableDataSource;
  customPagination: any = {
    total : '',
    recordsPerPage : 20,
    startIndex: '',
    endIndex: ''
  }
  columnSearch: any = {
    
    searchColumn : {
      colHeader :'',
      colDef: ''
    },
    searchValue : ''
  }

  sortColumn: any ={
    columnName: 32,
    sortOrder: 'asc'
  }
  userData: any;
  payload: any;

  searchAutocompleteList: any;

  public columnValues: any = [];
  public itemList: any;
  public filterLoc:any = 'Nothing';

  detailDataInventoryMap: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('viewAllLocation') customTemplate: TemplateRef<any>;

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];


  constructor(
    private dialog: MatDialog,
    private seqColumn: SetColumnSeqService,
    private authService: AuthService,
    private invMapService: InventoryMapService,
    private toastr: ToastrService, 
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.customPagination = {
      total : '',
      recordsPerPage : 20,
      startIndex: 0,
      endIndex: 20
    }

    this.initializeApi();
    this.getColumnsData();
  //  this.getContentData();



  }

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;

    this.customPagination.startIndex =  e.pageSize*e.pageIndex

    this.customPagination.endIndex =  (e.pageSize*e.pageIndex + e.pageSize)
   // this.length = e.length;
    this.customPagination.recordsPerPage = e.pageSize;
   // this.pageIndex = e.pageIndex;

   this.initializeApi();
   this.getContentData()
   
  }

  initializeApi(){
    this.userData = this.authService.userData();
    this.payload = {
     "username": this.userData.userName,
     "wsid": this.userData.wsid,
     "oqa": this.filterLoc,
     "searchString": this.columnSearch.searchValue,
     "searchColumn": this.columnSearch.searchColumn.colHeader,
     "sortColumnIndex": this.sortColumn.columnName,
     "sRow":  this.customPagination.startIndex,
     "eRow": this.customPagination.endIndex,
     "sortOrder": this.sortColumn.sortOrder,
     "filter": "1 = 1"
   }
  }
  getColumnsData(){
 //   this.displayedColumns = [];
    
    this.invMapService.getSetColumnSeq(this.userData.userName, this.userData.wsid).subscribe((res: any) => {
       
     this.displayedColumns = INVMAP_DATA;
     //this.displayedColumns.unshift({ colHeader: "", colDef: "" });

      if(res?.data?.columnSequence){
        this.columnValues =  res.data?.columnSequence ;
        this.columnValues.push('actions');
        this.getContentData();
      } else {
        this.toastr.error('Something went wrong', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }

  getContentData(){
    this.invMapService.getInventoryMap(this.payload).subscribe((res: any) => {
       
      this.itemList =  res.data?.inventoryMaps?.map((arr => {
        return {'itemNumber': arr.itemNumber, 'desc': arr.description}
      }))
       
      this.detailDataInventoryMap= res.data?.inventoryMaps;
      this.dataSource = new MatTableDataSource(res.data?.inventoryMaps);
    //  this.dataSource.paginator = this.paginator;
      this.customPagination.total = res.data?.recordsFiltered;
      this.dataSource.sort = this.sort;
    });
  }

  invMapTable(){
    
  }

  addLocDialog() { 
    let dialogRef = this.dialog.open(AddInvMapLocationComponent, {
      height: '750px',
      width: '100%',
      data: {
        mode: 'addInvMapLocation',
        itemList : this.itemList
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getContentData();
    })
  }
  inventoryMapAction(actionEvent: any) {
    if (actionEvent.value === 'set_column_sq') {
      let dialogRef = this.dialog.open(SetColumnSeqComponent, {
        height: '700px',
        width: '600px',
        data: {
          mode: actionEvent.value,
        }
      })
      dialogRef.afterClosed().subscribe(result => {
    //    
        // const matSelect: MatSelect = actionEvent.source;
        // matSelect.writeValue(null);
        this.getColumnsData();
      })
    }
  }

  applyFilter(filterValue:any, colHeader:any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewAllLocDialog(): void {
    const dialogRef = this.dialog.open(this.customTemplate, {
       width: '400px'
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  viewLocFilter(){
    this.initializeApi();
    this.getContentData();
    this.dialog. closeAll();
  }

  edit(event: any){
    let dialogRef = this.dialog.open(AddInvMapLocationComponent, {
      height: '750px',
      width: '100%',
      data: {
        mode: 'editInvMapLocation',
        itemList : this.itemList,
        detailData : event
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getContentData();
    })
  }

  delete(event: any){
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'delete-inventory-map',
        id: event.invMapID
     //   grp_data: grp_data
      }
    })
    dialogRef.afterClosed().subscribe(result => {

      this.getContentData();
    })
  }


  quarantine(event){

    let dialogRef = this.dialog.open(QuarantineConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'inventory-map-quarantine',
        id: event.invMapID
     //   grp_data: grp_data
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getContentData();
    })
  }

  unQuarantine(event){

    let dialogRef = this.dialog.open(QuarantineConfirmationComponent, {
      height: 'auto',
      width: '480px',
      data: {
        mode: 'inventory-map-unquarantine',
        id: event.invMapID
     //   grp_data: grp_data
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getContentData();
    })
  }

  adjustQuantity(event){
    let dialogRef = this.dialog.open(AdjustQuantityComponent, {
      height: 'auto',
      width: '800px',
      data: {
        id: event.invMapID
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getContentData();
    })
  }

  viewInInventoryMaster(){

    this.router.navigate(['/admin/inventoryMaster']);
  }

  viewLocationHistory(){
    
  }

  autocompleteSearchColumn(){
    let searchPayload = {
      "columnName": this.columnSearch.searchColumn.colDef,
      "value": this.columnSearch.searchValue,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMapService.getSearchData(searchPayload).subscribe((res: any) => {
      if(res.data){
        this.searchAutocompleteList = res.data;
      }

    });
  }

  searchColumn(){
    if(this.columnSearch.searchValue){
      this.initializeApi();
      this.getContentData();
    }
  }

  searchData(){
    if( this.columnSearch.searchColumn.colHeader ||  this.columnSearch.searchColumn.colHeader == '' ){
      this.initializeApi();
      this.getContentData();
    }
  }

  announceSortChange(e : any){
    // let index = this.columnValues.findIndex(x => x === e.active );
    // this.sortColumn = {
    //   columnName: index,
    //   sortOrder: e.direction
    // }

    // this.initializeApi();
    // this.getContentData();


  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

}

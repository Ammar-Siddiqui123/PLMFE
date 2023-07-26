import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router,RoutesRecognized } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { SpinnerService } from '../../../app/init/spinner.service';
import { AuthService } from '../../init/auth.service';
import { AddInvMapLocationComponent } from '../dialogs/add-inv-map-location/add-inv-map-location.component';
import { AdjustQuantityComponent } from '../dialogs/adjust-quantity/adjust-quantity.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { QuarantineConfirmationComponent } from '../dialogs/quarantine-confirmation/quarantine-confirmation.component';
import { SetColumnSeqComponent } from '../dialogs/set-column-seq/set-column-seq.component';  
import { filter, pairwise } from 'rxjs/operators';
import { ColumnSequenceDialogComponent } from '../dialogs/column-sequence-dialog/column-sequence-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AlertConfirmationComponent } from 'src/app/dialogs/alert-confirmation/alert-confirmation.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ContextMenuFiltersService } from '../../../app/init/context-menu-filters.service';
import { MatMenuTrigger} from '@angular/material/menu';
import { InputFilterComponent } from '../../dialogs/input-filter/input-filter.component';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { RouteHistoryService } from 'src/app/services/route-history.service';


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
  { colHeader: "maxQuantity", colDef: "Maximum Quantity" },
  { colHeader: "dedicated", colDef: "Dedicated" },
  { colHeader: "serialNumber", colDef: "Serial Number" },
  { colHeader: "lotNumber", colDef: "Lot Number" },
  { colHeader: "expirationDate", colDef: "Expiration Date" },
  { colHeader: "unitOfMeasure", colDef: "Unit of Measure" },
  { colHeader: "quantityAllocatedPick", colDef: "Quantity Allocated Pick" },
  { colHeader: "quantityAllocatedPutAway", colDef: "Quantity Allocated Put Away" },
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
  // { colHeader: "qtyAlcPutAway", colDef: "Quantity Allocated Put Away" },
];

@Component({
  selector: 'app-inventory-map',
  templateUrl: './inventory-map.component.html',
  styleUrls: ['./inventory-map.component.scss'],
  host: {
    "(window:click)": "onClick()"
  }
})

export class InventoryMapComponent implements OnInit {
  onDestroy$: Subject<boolean> = new Subject();
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  setStorage;
  fieldNames:any;
  routeFromIM:boolean=false;
  routeFromOM:boolean=false;
  public displayedColumns: any ;
  public dataSource: any = [];
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
    columnName: 0,
    sortOrder: 'asc'
  }
  userData: any;
  payload: any;

  searchAutocompleteList: any;

  public columnValues: any = [];
  public itemList: any;
  public filterLoc:any = 'Nothing';
  public isSearchColumn:boolean = false;
  spliUrl;

  detailDataInventoryMap: any;
  transHistory:boolean = false;
  myroute:any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('matRef') matRef: MatSelect;
  @ViewChild('viewAllLocation') customTemplate: TemplateRef<any>;
  @ViewChild(MatAutocompleteTrigger) autocompleteInventory: MatAutocompleteTrigger;

  //---------------------for mat menu start ----------------------------

  @ViewChild('trigger') trigger: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };
  onContextMenu(event: MouseEvent, SelectedItem: any, FilterColumnName?: any, FilterConditon?: any, FilterItemType?: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.trigger.menuData = { item: {SelectedItem: SelectedItem, FilterColumnName : FilterColumnName, FilterConditon: FilterConditon, FilterItemType : FilterItemType }};
    this.trigger.menu?.focusFirstItem('mouse');
    this.trigger.openMenu();
  }

  onClick() {
    this.trigger.closeMenu();
  }

  public OSFieldFilterNames() { 
    this.Api.ColumnAlias().subscribe((res: any) => {
      this.fieldNames = res.data;
      // this.displayedColumns.filter((item,i)=>{
      //   if(item.colHeader==='userField1'){
      //     this.displayedColumns[i].colDef= this.fieldNames.userField1
      //   }else if(item.colHeader==='userField2'){
      //     this.displayedColumns[i].colDef= this.fieldNames.userField2
      //   }
      // })
    })
  }
  ClearFilters()
  {
    this.FilterString = "";
    this.initializeApi();
    this.getContentData();
  }
  
  InputFilterSearch(FilterColumnName: any, Condition: any, TypeOfElement: any) {
    const dialogRef =  this.dialog.open(InputFilterComponent, {
      height: 'auto',
      width: '480px',
      data:{
        FilterColumnName: FilterColumnName,
        Condition: Condition,
        TypeOfElement:TypeOfElement
      },
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe((result) => { 
      if(result.SelectedColumn){
        this.onContextMenuCommand(result.SelectedItem, result.SelectedColumn, result.Condition,result.Type)
      }
    }
    );
  }

  getType(val) : string
  {
     return this.filterService.getType(val);
  }
 
  FilterString : string = "1 = 1";
  onContextMenuCommand(SelectedItem: any, FilterColumnName: any, Condition: any, Type: any) {
    if (SelectedItem != undefined) {
      this.FilterString = this.filterService.onContextMenuCommand(SelectedItem, FilterColumnName, "clear", Type);
      this.FilterString = this.filterService.onContextMenuCommand(SelectedItem, FilterColumnName, Condition, Type);
    }
    this.FilterString = this.FilterString != "" ? this.FilterString : "1 = 1";
    this.initializeApi();
    this.getContentData();
  }

 //---------------------for mat menu End ----------------------------
 previousUrl: string;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private Api: ApiFuntions,
    private toastr: ToastrService, 
    private router: Router,
    private loader: SpinnerService,
    private _liveAnnouncer: LiveAnnouncer,
    private filterService:ContextMenuFiltersService,
    private routeHistoryService: RouteHistoryService
  ) {
    this.previousUrl = this.routeHistoryService.getPreviousUrl();
 
    
    if(this.router.getCurrentNavigation()?.extras?.state?.['searchValue'] ){
      this.columnSearch.searchValue = this.router.getCurrentNavigation()?.extras?.state?.['searchValue'] ;
      this.columnSearch.searchColumn = {
        colDef: this.router.getCurrentNavigation()?.extras?.state?.['colDef'],
        colHeader: this.router.getCurrentNavigation()?.extras?.state?.['colHeader']
      }
    }
 
    if(router.url == '/OrderManager/InventoryMap'){
      this.transHistory = true;
    }
    else if(router.url == '/admin/inventoryMap' || '/InductionManager/Admin/InventoryMap'){
      this.transHistory = false;
    }


    // router.events
    //   .pipe(
    //     filter((evt: any) => evt instanceof RoutesRecognized),
    //     pairwise()
    //   )
    //   .subscribe((events: RoutesRecognized[]) => {
      
    //     if (events[0].urlAfterRedirects == '/InductionManager/Admin') { 
    //       localStorage.setItem('routeFromInduction','true')
    //         // this.showReprocess=false;
    //         // this.showReprocessed=false;
         
    //     }else{ 
    //       localStorage.setItem('routeFromInduction','false')
    //       // this.showReprocess=true;
    //       // this.showReprocessed=true;
    //     }
    //   });
  }

  ngOnInit(): void {

 
    this.customPagination = {
      total : '',
      recordsPerPage : 20,
      startIndex: 0,
      endIndex: 20
    }

    this.OSFieldFilterNames();
    this.initializeApi();
    this.getColumnsData();

   //  this.getContentData();



  }


  ngAfterViewInit() {
    this.setStorage =localStorage.getItem('routeFromInduction')
 
    this.spliUrl=this.router.url.split('/'); 

    if( this.spliUrl[1] == 'InductionManager' || this.spliUrl[1] == 'OrderManager' ){
       this.myroute =false
    }
    else {
      this.myroute = true

    }

  //  this.routeFromIM=JSON.parse(this.setStorage)

    
    }
  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;

    this.customPagination.startIndex =  e.pageSize*e.pageIndex

    this.customPagination.endIndex =  (e.pageSize*e.pageIndex + e.pageSize)
   // this.length = e.length;
    this.customPagination.recordsPerPage = e.pageSize;
   // this.pageIndex = e.pageIndex;

   this.dataSource.sort = this.sort;

   this.initializeApi();
   this.getContentData()
   
  }

  clearMatSelectList(){
    this.matRef.options.forEach((data: MatOption) => data.deselect());
  }

  initializeApi(){
    this.userData = this.authService.userData();
    if(this.FilterString == "")
    {
      this.FilterString = "1 = 1"
    }
    this.payload = {
     "username": this.userData.userName,
     "wsid": this.userData.wsid,
     "oqa": this.filterLoc,
     "searchString": this.columnSearch.searchValue,
     "searchColumn": this.columnSearch.searchColumn.colDef,
     "sortColumnIndex": this.sortColumn.columnName,
     "sRow":  this.customPagination.startIndex,
     "eRow": this.customPagination.endIndex,
     "sortOrder": this.sortColumn.sortOrder,
     "filter": this.FilterString
   }
  }
  getColumnsData(){
    let payload = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
      "tableName": "Inventory Map"
    }
    this.Api.getSetColumnSeq(payload).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.displayedColumns = INVMAP_DATA;

      if(res.data){
        this.columnValues =  res.data;

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
    this.Api.getInventoryMap(this.payload).pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
      // console.log(res.data);
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

  addLocDialog() { 
    let dialogRef = this.dialog.open(AddInvMapLocationComponent, {
      height: 'auto',
      width: '100%',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'addInvMapLocation',
        itemList : this.itemList,
        fieldName:this.fieldNames
      }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      
      if(result!='close'){
        this.getContentData();
      }
        
    })
  }
  inventoryMapAction(actionEvent: any) {
    if (actionEvent.value === 'set_column_sq') {

      let dialogRef = this.dialog.open(ColumnSequenceDialogComponent, {
        height: 'auto',
        width: '960px',
        data: {
          mode: event,
          tableName: 'Inventory Map',
        },
      });
      dialogRef
        .afterClosed()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((result) => {
          this.clearMatSelectList();
          // this.selectedVariable='';
          if (result && result.isExecuted) {
            this.getColumnsData();
          }
        });
      // let dialogRef = this.dialog.open(SetColumnSeqComponent, {
      //   height: '700px',
      //   width: '600px',
      //   autoFocus: '__non_existing_element__',
      //   data: {
      //     mode: actionEvent.value,
      //     tableName:'Inventory Map'
      //   }
      // })
      // dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      //   this.clearMatSelectList();
      //   if(result!='close'){
      //     this.getContentData();
      //   }
      // })
    }
  }

  applyFilter(filterValue:any, colHeader:any) {
    //need to test this
    this.dataSource.filter = "";
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewAllLocDialog(): void {
    const dialogRef = this.dialog.open(this.customTemplate, {
       width: '560px',
       autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      
    });
  }

  viewLocFilter(){
    this.initializeApi();
    this.getContentData();
    this.dialog.closeAll();
  }

  edit(event: any){
    let dialogRef = this.dialog.open(AddInvMapLocationComponent, {
      height: 'auto',
      width: '100%',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'editInvMapLocation',
        itemList : this.itemList,
        detailData : event,
        fieldName:this.fieldNames
      }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      if(this.router.url=="/InductionManager/Admin/InventoryMap" || this.router.url=="/OrderManager/InventoryMap"){
        this.getContentData();
      }
      if(result!='close'){
      
        this.getContentData();
      }
    })
  }

  delete(event: any){
    
    if(event.itemQuantity > 0){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '786px',
        data: {
          message: "This location currently has a positive item quantity and cannot be deleted.",
        },
        autoFocus: '__non_existing_element__'
      });
    }
    else{
      let dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'delete-inventory-map',
          id: event.invMapID
        //  grp_data: grp_data
        }
      })
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
  
        this.getContentData();
      })
    }
    
  }


  quarantine(event){

    let dialogRef = this.dialog.open(QuarantineConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'inventory-map-quarantine',
        id: event.invMapID
     //   grp_data: grp_data
      }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      this.getContentData();
    })
  }

  unQuarantine(event){

    let dialogRef = this.dialog.open(QuarantineConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'inventory-map-unquarantine',
        id: event.invMapID
     //   grp_data: grp_data
      }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      this.getContentData();
    })
  }

  adjustQuantity(event){
    if(event.itemNumber == ""){
      return;
    }
    let dialogRef = this.dialog.open(AdjustQuantityComponent, {
      height: 'auto',
      width: '800px',
      autoFocus: '__non_existing_element__',
    
      data: {
        id: event.invMapID,
        fieldNames:this.fieldNames.itemNumber
      }
    })
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
      this.getContentData();
    })
  }

  duplicate(event){
    var obj:any = {
      userName:this.userData.userName,wsid:this.userData.wsid,invMapID:event.invMapID
    }
  this.Api.duplicate(obj).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
    this.displayedColumns = INVMAP_DATA;

    if(res.data){
      this.getContentData();
    } else {
      this.toastr.error('Something went wrong', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
  });

  }

  viewInInventoryMaster(row){

    // this.router.navigate(['/admin/inventoryMaster']);


    if( this.spliUrl[1] == 'OrderManager' ){
      this.router.navigate([]).then((result) => {
        window.open(`/#/OrderManager/InventoryMaster?itemNumber=${row.itemNumber}`, '_self');
      });
   }else if(this.spliUrl[1] == 'InductionManager' ){
    window.open(`/#/InductionManager/Admin/InventoryMaster?itemNumber=${row.itemNumber}`, '_self');

   }
   else {
    localStorage.setItem('routeFromInduction','false')
    this.router.navigate([]).then((result) => {
      window.open(`/#/admin/inventoryMaster?itemNumber=${row.itemNumber}`, '_self');
    });

   }

   
  }

  viewLocationHistory(row : any){

    if( this.spliUrl[1] == 'OrderManager' ){
      this.router.navigate([]).then((result) => {
        window.open(`/#/OrderManager/OrderStatus?location=${row.locationNumber}`, '_self');
      });
   }
   
   else if( this.spliUrl[1] == 'InductionManager' ){
    this.router.navigate([]).then((result) => {
      window.open(`/#/InductionManager/Admin/TransactionJournal?location=${row.locationNumber}`, '_self');
    });
 }
   else {
    localStorage.setItem('routeFromInduction','false')
    this.router.navigate([]).then((result) => {
      window.open(`/#/admin/transaction?location=${row.locationNumber}`, '_self');
    });

   }


   
  }

  autocompleteSearchColumn(){
    let searchPayload = {
      "columnName": this.columnSearch.searchColumn.colDef,
      "value": this.columnSearch.searchValue,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.Api.getSearchData(searchPayload).pipe(takeUntil(this.onDestroy$)).subscribe((res: any) => {
      if(res.data){
        this.searchAutocompleteList = res.data;
      }

    });
  }

  searchColumn(){ 
    
    if(this.columnSearch.searchColumn === ''){
      this.isSearchColumn = false;
    }else{
      this.isSearchColumn = true;
    }
    this.searchAutocompleteList = [];
    if(this.columnSearch.searchValue){
      this.columnSearch.searchValue = '';
      this.initializeApi();
      this.getContentData();
    }
  }
  closeautoMenu()
  {
    this.autocompleteInventory.closePanel(); 
  }
  searchData(){
    
    if( this.columnSearch.searchColumn &&  this.columnSearch.searchColumn !== '' ){
      this.initializeApi();
      this.getContentData();
    }
  }

  reset(){
   
    if( this.columnSearch.searchValue==''){
    
      this.initializeApi()
      this.getContentData()
    }
  
  }

  announceSortChange(e : any){
    
    let index = this.columnValues.findIndex(x => x === e.active );
    this.sortColumn = {
      columnName: index,
      sortOrder: e.direction
    }

    this.initializeApi();
    this.getContentData();


  }


  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  //   //this.employee_data_source.sort = this.sort;

  //   this.dataSource.sort = this.sort;
  // }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.colDef === o2.colDef && o1.colHeader === o2.colHeader;
  }
  
  isAuthorized(controlName:any) {
    return !this.authService.isAuthorized(controlName);
 }


 tranhistory(seletedRecord:any){
  // this.router.navigate([]).then((result) => {
  //   window.open(`/#/OrderManager/OrderStatus?type=TransactionHistory`, '_blank');
  // });

  this.router.navigate([]).then((result) => {
      let url = `/#/OrderManager/OrderStatus?itemNumber=${seletedRecord.itemNumber}&type=TransactionHistory`;
      window.open(url, '_blank');
  });
 }

 printRange(){
  // this.router.navigateByUrl(`/report-view?file=EventLogExport-lst`);
 }

 printSelected(event: any){
  this.router.navigateByUrl(`/report-view?file=LocLabel-lbl`);
 }


}

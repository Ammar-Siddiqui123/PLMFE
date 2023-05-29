import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, HostListener, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BlossomToteComponent } from 'src/app/dialogs/blossom-tote/blossom-tote.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../app/init/auth.service';
import { ProcessPicksService } from './process-picks.service';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/internal/operators/startWith';
import { PickToteManagerComponent } from 'src/app/dialogs/pick-tote-manager/pick-tote-manager.component';
import { ViewOrdersComponent } from 'src/app/dialogs/view-orders/view-orders.component';
import { WorkstationZonesComponent } from 'src/app/dialogs/workstation-zones/workstation-zones.component';
import { map, Subject, takeUntil } from 'rxjs';
import labels from '../../labels/labels.json';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-process-picks',
  templateUrl: './process-picks.component.html',
  styleUrls: ['./process-picks.component.scss']
})
export class ProcessPicksComponent implements OnInit {
  TOTE_SETUP: any = [];
  dialogClose: boolean = false;
  public userData: any;
  batchID: any = '';
  pickBatchQuantity: any = '';
  autoPickOrderSelection: any = '';
  autoPickToteID: any = '';
  usePickBatchManager: any = '';
  useInZonePickScreen: any;
  useDefaultFilter: any;
  useDefaultZone: any;
  countInfo: any;
  pickType: any = 'MixedZones';
  allZones: any;
  allOrders: any[] = [];
  resultObj: any[] = [];
  pickBatchesList: any[] = [];
  orderNumberList: any[] = [];
  pickBatches = new FormControl('');
  orderNumber = new FormControl('');
  batchWithID = false;
  // pickBatches:any = '';
  filteredOptions: Observable<any[]>;
  filteredOrderNum: Observable<any[]>;
  displayedColumns: string[] = ['position', 'toteid', 'orderno', 'priority', 'other'];
  dataSource: any;
  nxtToteID: any;
  selection = new SelectionModel<any>(true, []);
  onDestroy$: Subject<boolean> = new Subject();
  @ViewChild('batchPickID') batchPickID: TemplateRef<any>;
  @ViewChild('processSetup') processSetup: TemplateRef<any>;
  @ViewChild('batch_id') batch_id: ElementRef;
  isBatchIdFocus: boolean = false;

  public ifAllowed: boolean = false
  orderInput: any;
  constructor(
    private dialog: MatDialog,
    private pPickService: ProcessPicksService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.pickToteSetupIndex();
    this.getAllZones();
    this.getAllOrders();
    this.isBatchIdFocus = true;
  }
  getAllOrders() {
    let paylaod = {
      "OrderView": 'All',
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/OrdersInZone').subscribe((res) => {
      if (res.data) {
        this.orderNumberList = res.data
      }
      this.filteredOrderNum = this.orderNumber.valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value)),
        map(name => (name ? this._orderFilter(name) : this.orderNumberList.slice()))
      );
    });
  }

  ifOrderExits(orderNum: any) {
    let isBatchFull;
    this.TOTE_SETUP.map(obj => {
      isBatchFull = false;
      if (obj.orderNumber != '') {
        isBatchFull = true;
      }
    });
    if (isBatchFull) {
      this.toastr.error('No open totes in batch', 'Batch is Filled.', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.orderNumber.setValue('');
      return;
    }
    if (orderNum != '') {
      const val = this.orderNumberList.includes(orderNum);
      if (!val) {
        let zone = '';
        this.allZones.map(i => {
          zone += i + ' ';
        })
        this.toastr.error(`Order ${orderNum} does not have a line go to Zones: ${zone} `, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        this.orderNumber.setValue('');
        return;
      }
      else {
        const isOrderNumExists = this.TOTE_SETUP.filter(val => {
          return val.orderNumber == orderNum
        });
        if (isOrderNumExists.length > 0) {
          this.orderNumber.setValue('');
        } else {
          for (let element of this.TOTE_SETUP) {
            if (element.orderNumber === '') {
              element.orderNumber = orderNum;
              this.orderNumber.setValue('');
              break;
            }
          }

        }

      }

    }

  }

  ngAfterViewChecked(): void {
    if (this.isBatchIdFocus) {
      this.batch_id.nativeElement.focus();
      this.isBatchIdFocus = false;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  onbeforeunload(event) {
    if (this.ifAllowed) {
      event.preventDefault();
      event.returnValue = false;
    }
  }

  @HostListener('click')
  documentClick(event: MouseEvent) {
    this.ifAllowed = true
  }

  getAllZones() {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/WSPickZoneSelect').subscribe((res) => {
      if (res.data) {
        this.allZones = res.data;
      }
      // console.log(this.allZones);
    });
  }

  pickToteSetupIndex() {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/PickToteSetupIndex').subscribe(res => {
      // console.log(res.data.imPreference);
      this.countInfo = res.data.countInfo;
      this.pickBatchesList = res.data.pickBatches;
      this.pickBatchQuantity = res.data.imPreference.pickBatchQuantity;
      this.autoPickOrderSelection = res.data.imPreference.autoPickOrderSelection;
      this.autoPickToteID = res.data.imPreference.autoPickToteID;
      this.useInZonePickScreen = res.data.imPreference.useInZonePickScreen;
      this.usePickBatchManager = res.data.imPreference.usePickBatchManager;
      this.useDefaultFilter = res.data.imPreference.useDefaultFilter;
      this.useDefaultZone = res.data.imPreference.useDefaultZone;
      // this.useInZonePickScreen = false;
      this.createToteSetupTable(this.pickBatchQuantity);

      this.filteredOptions = this.pickBatches.valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value)),
        map(name => (name ? this._filter(name) : this.pickBatchesList.slice()))
      );
    });
  }

  createToteSetupTable(pickBatchQuantity: any) {
    for (let index = 0; index < pickBatchQuantity; index++) {
      this.TOTE_SETUP.push({ position: index + 1, toteID: '', orderNumber: '', priority: '' },);
    }
    this.dataSource = new MatTableDataSource<any>(this.TOTE_SETUP);
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.pickBatchesList.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _orderFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.orderNumberList.filter(option => option.toLowerCase().includes(filterValue));
  }

  onAddBatch(val: string) {
    let filledTote:boolean = false;
    this.TOTE_SETUP.map(obj => {
      if(obj.toteID !== ''){
        filledTote = true;
      }
    });
    
    // console.log(filledTote);
    
    if(filledTote){
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          message: 'Press OK to create a new Tote Setup. Press Cancel to keep the current Tote Setup.'
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result=='Yes'){
          this.addingBatch(val);
        }
      })

    }
    else{
      this.addingBatch(val);
    }
    
  }

  addingBatch(val:any){
    if (val === 'batchWithID') {
      this.batchWithID = true;
    }
    else {
      this.batchWithID = false;
    }
    const dialogRef = this.dialog.open(this.batchPickID, {
      width: 'auto',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      if (this.dialogClose) {
        if (val === 'batchWithID') {
          this.pPickService.get('', '/Induction/NextBatchID').subscribe(res => {
            this.batchID = res.data;
            let payload = {
              "wsid": this.userData.wsid,
              "type": this.pickType
            }
            if (!this.useInZonePickScreen) {
              if (!this.usePickBatchManager) {
                if (this.autoPickOrderSelection) {
                  this.pPickService.get(payload, '/Induction/FillOrderNumber').subscribe(res => {
                    this.TOTE_SETUP.forEach((element, key) => {
                      element.orderNumber = res.data[key];
                    });
                  });
                }
                if (this.autoPickToteID) {
                  this.getAllToteIds(true)
                }
              }
              if(this.batchID != ''){
                if (this.autoPickToteID) {
                  this.getAllToteIds(true);
                  if(this.usePickBatchManager){
                    this.openPickToteDialogue();
                  }
                }
              }
              this.TOTE_SETUP.map(obj => {
                obj.toteID = '';
                obj.orderNumber = '';
                obj.priority = '';
              });
              this.allOrders = [];
            }
            else {
              if (this.autoPickToteID) {
                this.getAllToteIds(true);
              }
            }
          });
        }
        else {
          if (this.batchID === '') {
            this.toastr.error('Batch id is required.', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
          else 
          {
            let payload = {
              "wsid": this.userData.wsid,
              "type": this.pickType
            }
            if (!this.useInZonePickScreen) {
              if (!this.usePickBatchManager) {
                if (this.autoPickOrderSelection) {
                  this.pPickService.get(payload, '/Induction/FillOrderNumber').subscribe(res => {
                    this.TOTE_SETUP.forEach((element, key) => {
                      element.orderNumber = res.data[key];
                    });
                  });
                }
                if (this.autoPickToteID) {
                  this.getAllToteIds(true)
                }
              }
              this.TOTE_SETUP.map(obj => {
                obj.toteID = '';
                obj.orderNumber = '';
              });
            }
            else {
              if (this.autoPickToteID) {
                this.getAllToteIds(true)
              }
            }


          }
        }
      }
    });
  }

  onViewOrder(ele:any) {
   if(ele.orderNumber){
    this.router.navigate([]).then((result) => {
      window.open(`/#/InductionManager/Admin/TransactionJournal?orderStatus=${ele.orderNumber}`, '_blank');
    });
   }
   else{
    this.toastr.error('Please enter in an order number.', 'Error!', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000
    });
   }
  }


  confirmAddBatchDialog() {
    this.dialogClose = true;
    this.dialog.closeAll();
  }
  closeBatchDialog() {
    this.dialogClose = false;
    this.dialog.closeAll();
  }

  openPickToteDialogue() {
    if (!this.batchID) {
      this.toastr.error('Batch ID cannot be empty when opening the pick batch manager.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else {
      const dialogRef = this.dialog.open(PickToteManagerComponent, {
        height: '90vh',
        width: '100vw',
        data: {
          pickBatchQuantity: this.pickBatchQuantity,
          useDefaultFilter: this.useDefaultFilter,
          useDefaultZone: this.useDefaultZone,
          allOrders: this.allOrders,
          resultObj: this.resultObj,
        },
        autoFocus: '__non_existing_element__'
      });
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(resultObj => {
        // console.log(resultObj);
        
        let result:any = [];
        resultObj?.forEach((val: any) => {
          result.push(val.orderNumber);
        })
        if (result.length > 0) {
          this.allOrders = result;
          this.resultObj = resultObj;
        }
        else {
          this.allOrders = []
          this.resultObj = []
          this.TOTE_SETUP.forEach((element) => {
            element.orderNumber = '';
          });
        } 
        this.TOTE_SETUP.forEach((element, key) => {
            element.orderNumber = resultObj[key]?.orderNumber ?? '';
            element.priority = resultObj[key]?.priority ?? '';
        });
      });
    }

  }

  openViewOrdersDialogue(viewType: any) {
    const dialogRef = this.dialog.open(ViewOrdersComponent, {
      height: 'auto',
      width: '100vw',
      data: {
        viewType: viewType,
        pickBatchQuantity: this.pickBatchQuantity,
        allOrders: this.allOrders,
      },
      autoFocus: '__non_existing_element__'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
     
      
      if(result === true){

      }
      else{
        if (result.length > 0) {
          this.allOrders = result;  
        this.TOTE_SETUP.forEach((element, key) => {
            element.orderNumber = result[key] ?? '';
        });
        }
        else {
          this.allOrders = []
          this.TOTE_SETUP.forEach((element) => {
            element.orderNumber = '';
          });
        }
  
      }
      
    })
  }

  openBlossomToteDialogue() {
    const dialogRef = this.dialog.open(BlossomToteComponent, {
      height: 'auto',
      width: '786px',
      autoFocus: '__non_existing_element__'
    });
  }

  openWorkstationZone() {
    let dialogRef = this.dialog.open(WorkstationZonesComponent, {
      height: 'auto',
      width: '750px',
      autoFocus: '__non_existing_element__',

    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllZones();
      }
    })
  }

  isValidOrderNumber(element:any){
    // console.log(element.orderNumber);
    let payload ={
      "OrderNumber": element.orderNumber
    }
    this.pPickService.get(payload, '/Induction/ValidateOrderNumber').subscribe(res => {
    if(res.data === 'Invalid'){
      this.toastr.error('This is not a vaild order number for this pick batch.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      element.orderNumber = ''
    }
    });
  }

  onToteAction(val: any) {
    if (val.value === 'fill_all_tote') {
      this.getAllToteIds();
    }
    else if (val.value === 'fill_next_tote') {
      this.getNextToteId();
    }
    else if (val.value === 'clear_all_totes') {
      this.clearAllTotes();
    }
    else if (val.value === 'clear_all_orders') {
      this.clearAllOrders();
    }

    const matSelect: MatSelect = val.source;
    matSelect.writeValue(null);
  }

  getAllToteIds(autoToteIds: boolean = false) {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/NextTote').subscribe(res => {
      this.nxtToteID = res.data;
      this.TOTE_SETUP.forEach((element, key) => {
        if (!element.toteID) {
          element.toteID = this.nxtToteID;
          this.nxtToteID = this.nxtToteID + 1;
        }
        if (autoToteIds) {
          element.toteID = this.nxtToteID;
          this.nxtToteID = this.nxtToteID + 1;
        }
      });
      this.updateNxtTote();
    });

  }

  updateNxtTote() {
    let updatePayload = {
      "tote": this.nxtToteID,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.update(updatePayload, '/Induction/NextToteUpdate').subscribe(res => {
      if (!res.isExecuted) {
        this.toastr.error('Something is wrong.', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }

    });
  }
  getNextToteId() {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/NextTote').subscribe(res => {
      this.nxtToteID = res.data;
      for (let element of this.TOTE_SETUP) {
        if (element.toteID === '') {
          element.toteID = this.nxtToteID;
          this.nxtToteID = this.nxtToteID + 1;
          break;
        }
      }
      this.updateNxtTote();
    });
  }

  clearAllTotes() {
    this.TOTE_SETUP.forEach((element, key) => {
      element.toteID = "";
    });
  }

  clearAllOrders() {
    this.TOTE_SETUP.forEach((element, key) => {
      element.orderNumber = "";
      element.priority = "";
    });
    this.allOrders = [];
  }

  checkDuplicateTote(val: any, i: any) {
    for (let index = 0; index < this.TOTE_SETUP.length; index++) {
      const element = this.TOTE_SETUP[index];
      if(val.toteID !== ''){
        if (element.toteID == val.toteID && index != i) {
          this.TOTE_SETUP[i].toteID = "";
          this.toastr.error('This tote id is already in this batch. Enter a new one', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          break;
        }
      }
      }
      
  }

  fillNextToteID(i: any) {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/NextTote').subscribe(res => {
      this.nxtToteID = res.data;
      this.TOTE_SETUP[i].toteID = this.nxtToteID;
      this.nxtToteID = this.nxtToteID + 1;
      this.updateNxtTote();
    });
  }

  clearOrderNumber(i: any) {
    this.TOTE_SETUP[i].orderNumber = "";
    this.TOTE_SETUP[i].priority = "";
    this.allOrders[i] = '';
  }

  confirmProcessSetup() {
    const dialogRef = this.dialog.open(this.processSetup, {
      width: '450px',
      autoFocus: '__non_existing_element__',
    });
  }

  onPrcessBatch() {
    if (!this.batchID) {
      this.toastr.error('Please enter in a batch id to proccess.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.dialog.closeAll();
      return
    }
    let Positions: any[] = [];
    let ToteIDs: any[] = [];
    let OrderNumbers: any[] = [];
    this.TOTE_SETUP.map(obj => {
      Positions.push(obj.position?.toString() ?? '');
      ToteIDs.push(obj.toteID?.toString() ?? '');
      OrderNumbers.push(obj.orderNumber?.toString() ?? '');
    });
    // console.log(this.TOTE_SETUP);
    if (this.TOTE_SETUP.filter(e => e.toteID).length == 0) {
      this.toastr.error('Please enter in at least 1 tote id to process.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.dialog.closeAll();
      return
    }
    if (this.TOTE_SETUP.filter(e => e.orderNumber).length == 0) {
      this.toastr.error('Please enter in at least 1 order number to process.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.dialog.closeAll();
      return
    }
    if (this.useInZonePickScreen) {
      let paylaod = {
        Positions,
        ToteIDs,
        OrderNumbers,
        "BatchID": this.batchID,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      this.pPickService.create(paylaod, '/Induction/InZoneSetupProcess').subscribe(res => {
        if (res.isExecuted) {
          this.dialog.closeAll();
          this.TOTE_SETUP.map(obj => {
            obj.toteID = '';
            obj.orderNumber = '';
          });
          this.batchID = '';
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
        else {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
    else {
      let paylaod = {
        Positions,
        ToteIDs,
        OrderNumbers,
        "BatchID": this.batchID,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
        'Count': 0
      }
      this.pPickService.create(paylaod, '/Induction/PickToteSetupProcess').subscribe(res => {
        if (res.isExecuted) {
          this.dialog.closeAll();
          this.TOTE_SETUP.map(obj => {
            obj.toteID = '';
            obj.orderNumber = '';
          });
          this.batchID = '';
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
        else {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }


  }

}

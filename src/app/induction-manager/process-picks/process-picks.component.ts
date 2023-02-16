import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  useInZonePickScreen: any;
  countInfo: any;
  allZones: any;
  allOrders: any[] = [];
  pickBatchesList: any[] = [];;
  pickBatches = new FormControl('');
  // pickBatches:any = '';
  filteredOptions: Observable<any[]>;
  displayedColumns: string[] = ['position', 'toteid', 'orderno', 'priority', 'other'];
  dataSource: any;
  nxtToteID: any;
  selection = new SelectionModel<any>(true, []);
  onDestroy$: Subject<boolean> = new Subject();
  @ViewChild('batchPickID') batchPickID: TemplateRef<any>;
  @ViewChild('processSetup') processSetup: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private pPickService: ProcessPicksService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.pickToteSetupIndex();
    this.getAllZones();
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
      this.countInfo = res.data.countInfo;
      this.pickBatchesList = res.data.pickBatches;
      this.pickBatchQuantity = res.data.imPreference.pickBatchQuantity;
      this.useInZonePickScreen = res.data.imPreference.useInZonePickScreen;
      // this.useInZonePickScreen = false;
      this.createToteSetupTable(this.pickBatchQuantity);
      console.log(this.pickBatches);

      this.filteredOptions = this.pickBatches.valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value)),
        map(name => (name ? this._filter(name) : this.pickBatchesList.slice()))
      );

      console.log(res.data);
      console.log(this.countInfo);
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
    // return this.pickBatchesList.filter(
    //   option => option.toLowerCase().indexOf(filterValue) === 0
    // );

    return this.pickBatchesList.filter(option => option.toLowerCase().includes(filterValue));
  }

  onAddBatch(val: string) {
    const dialogRef = this.dialog.open(this.batchPickID, {
      width: 'auto',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      // console.log(val);
      // console.log(this.dialogClose);
      if (this.dialogClose) {
        if (val === 'batchWithID') {
          this.pPickService.get('', '/Induction/NextBatchID').subscribe(res => {
            this.batchID = res.data;
          });
        }
        else {
          if (this.batchID === '') {
            this.toastr.error('Batch id is required.', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        }
      }
    });
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
    if(!this.batchID){
      this.toastr.error('Batch ID cannot be empty when opening the pick batch manager.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else{
      const dialogRef = this.dialog.open(PickToteManagerComponent, {
        height: '90vh',
        width: '100vw',
        autoFocus: '__non_existing_element__'
      })
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
      // console.log(result);

      this.allOrders.push(result);
      // console.log(this.allOrders);

      this.TOTE_SETUP.forEach((element, key) => {
        if (element.orderNumber === '') {
          element.orderNumber = result[key] ?? '';
        }
      });
      // console.log(this.TOTE_SETUP);
      // this.dataSource = new MatTableDataSource<any>(this.TOTE_SETUP);

    })
  }

  openBlossomToteDialogue() {
    const dialogRef = this.dialog.open(BlossomToteComponent, {
      height: 'auto',
      width: '786px',
      autoFocus: '__non_existing_element__'
    })
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

  onToteAction(val: any) {
    if (val === 'fill_all_tote') {
      this.getAllToteIds();
    }
    else if (val === 'fill_next_tote') {
      this.getNextToteId();
    }
    else if (val === 'clear_all_totes') {
      this.clearAllTotes();
    }
    else if (val === 'clear_all_orders') {
      this.clearAllOrders();
    }    
  }

  getAllToteIds() {
    let paylaod = {
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/NextTote').subscribe(res => {
      this.nxtToteID = res.data;
      this.TOTE_SETUP.forEach((element, key) => {
        element.toteID = this.nxtToteID;
        this.nxtToteID = this.nxtToteID + 1;
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
    });
  }

  checkDuplicateTote(val :any, i : any) {
    for (let index = 0; index < this.TOTE_SETUP.length; index++) {
      const element = this.TOTE_SETUP[index];
      if (element.toteID == val.toteID && index != i) {
        this.TOTE_SETUP[i].toteID = "";
        this.toastr.error('Duplicate Tote ID.', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        break;
      }
    }
  }

  confirmProcessSetup(){
    const dialogRef = this.dialog.open(this.processSetup, {
      width: '450px',
      autoFocus: '__non_existing_element__',
    });
  }

  onPrcessBatch() {
    if(!this.batchID){
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
      Positions.push(obj.position.toString());
      ToteIDs.push(obj.toteID.toString());
      OrderNumbers.push(obj.orderNumber.toString());
    });
    let paylaod = {
      Positions,
      ToteIDs,
      OrderNumbers,
      "BatchID": this.batchID,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.pPickService.create(paylaod, '/Induction/InZoneSetupProcess').subscribe(res => {
      if(res.isExecuted){
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
      else{
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });

  }

}

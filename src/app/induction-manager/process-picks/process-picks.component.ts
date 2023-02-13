import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../../app/init/auth.service';
import { ProcessPicksService } from './process-picks.service';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { BlossomToteComponent } from 'src/app/dialogs/blossom-tote/blossom-tote.component';
import { PickToteManagerComponent } from 'src/app/dialogs/pick-tote-manager/pick-tote-manager.component';
import { ViewOrdersComponent } from 'src/app/dialogs/view-orders/view-orders.component';
import { WorkstationZonesComponent } from 'src/app/dialogs/workstation-zones/workstation-zones.component';

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
  countInfo: any;
  allZones: any;
  pickBatchesList: any[] = [];;
  pickBatches = new FormControl('');
  // pickBatches:any = '';
  filteredOptions: Observable<any[]>;
  displayedColumns: string[] = ['position', 'toteid', 'orderno', 'priority', 'other'];
  dataSource: any;
  nxtToteID: any;
  selection = new SelectionModel<any>(true, []);
  @ViewChild('batchPickID') batchPickID: TemplateRef<any>;

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
      console.log(this.allZones);
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
    return this.pickBatchesList.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onAddBatch(val: string) {
    const dialogRef = this.dialog.open(this.batchPickID, {
      width: 'auto',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log(val);
      console.log(this.dialogClose);
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
    const dialogRef = this.dialog.open(PickToteManagerComponent, {
      height: '90vh',
      width: '100vw',
      autoFocus: '__non_existing_element__'
    })
  }

  openViewOrdersDialogue(viewType: any) {
    const dialogRef = this.dialog.open(ViewOrdersComponent, {
      height: 'auto',
      width: '100vw',
      autoFocus: '__non_existing_element__'
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

  updateNxtTote(){
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

}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BatchDeleteComponent } from 'src/app/dialogs/batch-delete/batch-delete.component';
import { SelectZonesComponent } from 'src/app/dialogs/select-zones/select-zones.component';
import { SelectionTransactionForToteComponent } from 'src/app/dialogs/selection-transaction-for-tote/selection-transaction-for-tote.component';
import { TotesAddEditComponent } from 'src/app/dialogs/totes-add-edit/totes-add-edit.component';
import { ToastrService } from 'ngx-toastr';

import { ProcessPutAwayService } from './../processPutAway.service';
import { AuthService } from 'src/app/init/auth.service';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';

export interface PeriodicElement {
  position: string;

}

@Component({
  selector: 'app-process-put-aways',
  templateUrl: './process-put-aways.component.html',
  styleUrls: ['./process-put-aways.component.scss']
})
export class ProcessPutAwaysComponent implements OnInit {
  ELEMENT_DATA = [{ position: 0, cells: '', toteid: '' }];
  displayedColumns: string[] = [
    'positions',
    'cells',
    'toteid',
    'save',
  ];
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  licAppData;
  public userData: any;
  public cellSize = "0";
  public batchId = "";
  public status = "Not Processed";
  public assignedZones = "";
  public autoPutToteIDS = false;
  public pickBatchQuantity = 0;
  public currentToteID = 0;
  public toteID = "";
  public assignedZonesArray:any;

  displayedColumns1: string[] = [
    'status',
    'orderno',
    'itemno',
    'transaction',
    'location',
    'completed'
  ];
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private service: ProcessPutAwayService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.ELEMENT_DATA.length=0;
    this.userData = this.authService.userData();
    this.getCurrentToteID();
    this.getProcessPutAwayIndex();
  }

  getCurrentToteID()
  {
    var payLoad = {
      "username": this.userData.username,
      "wsid": this.userData.wsid
    };
    this.service.create(payLoad, '/Induction/NextTote').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.currentToteID = res.data;
        } else {
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => { }
    );
  }

  openSelectZonesDialogue() {
    if (this.batchId != "") {
      const dialogRef = this.dialog.open(SelectZonesComponent, {
        height: '96vh',
        width: '100%',
        autoFocus: '__non_existing_element__',
        data: {
          batchId: this.batchId,
          userId: this.userData.username,
          wsid:this.userData.wsid,
          assignedZones:this.assignedZonesArray
        }
  
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
        var zones = "Zones:";
        this.assignedZonesArray = result;
        for(var i=0;i<result.length;i++)
        {
          zones = zones+" "+result[i].zone;
        }
        this.assignedZones = zones;
        }
      });
    }
    else {
      this.showMessage("Please select batch", 2000, "error");
    }

  }

  openTotesDialogue() {
    const dialogRef = this.dialog.open(TotesAddEditComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__'
    })
  }

  openDeleteBatchDialogue() {
    const dialogRef = this.dialog.open(BatchDeleteComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__'
    })
  }

  clearBatch() {
    this.batchId = "";
  }

  processBath() {
    if (this.batchId == "") {
      this.showMessage("You must provide a Batch ID.", 2000, "error");
    }
    else {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          message: "Batch processed!  Click OK to move onto the next step or cancel to remain on this screen to create/edit more batches."
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result=='Yes'){
        for(var k=0;k<this.assignedZonesArray.length;k++)
        {
          console.log(this.assignedZonesArray[k]);
        }
        // var payLoad = [
        //   {

        //     batchID: "202101110000004",
        //     zoneLabel: this.assignedZones,
        //     totes: [
        //       "1143,1144,1145,1146,1147", toteID
        //       "1,1,1,1,1", cells
        //       "1,2,3,4,5" position
        //     ],
        //     username: this.userData.username,
        //     wsid: this.userData.wsid
        //   }
        // ];


        }
        

      })

    }
  }

  showMessage(message: any, timeout: any, type: any) {
    if (type == "error") {
      this.toastr.error(message, 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: timeout,
      });
    }
    else {
      this.toastr.success(message, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: timeout
      });
    }

  }

  getProcessPutAwayIndex() {
    var payLoad = {
      "username": this.userData.username,
      "wsid": this.userData.wsid
    };
    this.service.create(payLoad, '/Induction/ProcessPutAwayIndex').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.cellSize = res.data.imPreference.defaultCells;
          this.autoPutToteIDS = res.data.imPreference.autoPutAwayToteID;
          this.pickBatchQuantity = res.data.imPreference.pickBatchQuantity;
          //console.log(this.pickBatchQuantity);
        } else {
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => { }
    );
  }

  makeTotes(numTotes, defaultCells, defaultIDs) {
    // var btc = $('#batch_totes_container');
    // btc.children().remove();
    // for (var x = 1; x <= numTotes; x++) {
    // btc.append(makeTote(x, defaultCells, '', ''));
    // };
  }

  getNextBatchID() {
    var payLoad = {
      "username": this.userData.username,
      "wsid": this.userData.wsid
    };
    this.service.create(payLoad, '/Induction/NextBatchID').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.batchId = res.data;
          this.openSelectZonesDialogue();
        } else {
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => { }
    );
  }

  createNewBatch(withID = "") {
    if (withID == "") {
      if (this.batchId == "") {
        this.showMessage("You must assign a Batch ID before creating a new batch.", 2000, "error");
      }
      else {

      }
    }
    else {
      //Getting and setting next batch ID
      this.getNextBatchID();
      //setup totes
      //this.pickBatchQuantity;
      //ELEMENT_DATA.push({ position: 'uzair' });
      this.ELEMENT_DATA.length=0;
      for (let index = 0; index < this.pickBatchQuantity; index++) 
      { 
      if (!this.autoPutToteIDS) {
        this.ELEMENT_DATA.push({ position: index + 1, cells: this.cellSize, toteid: '' } ); 
      }
      else 
      {
        this.ELEMENT_DATA.push({ position: index + 1, cells: this.cellSize, toteid: this.currentToteID.toString()} ); 
        this.currentToteID++;
      }
      
      } 
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

      
    }

  }

  onToteChange($event,position)
  {
  if(this.ELEMENT_DATA[(position)-1].toteid!=$event.target.value)
  {
    this.ELEMENT_DATA[(position)-1].toteid = $event.target.value;
  }
  }


  updateToteID($event)
  {
    for(var i=0;i<this.pickBatchQuantity;i++)
    {
    if(this.ELEMENT_DATA[i].toteid=="")
    {
      this.ELEMENT_DATA[i].toteid = $event.target.value;
      this.toteID = "";
      break;
    }
    }
  }



  assignToteAtPosition(element:any,clear=0)
  {
  if(clear==0)
  {
    this.ELEMENT_DATA[(element.position)-1].toteid = this.currentToteID.toString();
    this.currentToteID++;
  }
  else 
  {
    console.log(this.ELEMENT_DATA[(element.position)-1].toteid);
    this.ELEMENT_DATA[(element.position)-1].toteid = "";
  }
  
  }

  setToDefaultQuantity() {
    if (this.batchId == "") {
      this.showMessage("You must provide a Batch ID.", 2000, "error");
    }
    else {
    for(var i=0;i<this.pickBatchQuantity;i++)
    {
    this.ELEMENT_DATA[i].cells = this.cellSize.toString();
    }
    }
   }

   openSelectionTransactionDialogue(){
    const dialogRef =  this.dialog.open(SelectionTransactionForToteComponent, {
      height: 'auto',
      width: '1100px',
      autoFocus: '__non_existing_element__'
    })
     }
  }
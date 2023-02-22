import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FloatLabelType } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { ToteTransactionViewComponent } from 'src/app/dialogs/tote-transaction-view/tote-transaction-view.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MarkToteFullComponent } from 'src/app/dialogs/mark-tote-full/mark-tote-full.component';

export interface PeriodicElement {
  position: string;
}

@Component({
  selector: 'app-process-put-aways',
  templateUrl: './process-put-aways.component.html',
  styleUrls: ['./process-put-aways.component.scss'],
})
export class ProcessPutAwaysComponent implements OnInit {
  ELEMENT_DATA = [{ position: 0, cells: '', toteid: '' }];
  displayedColumns: string[] = ['positions', 'cells', 'toteid', 'save'];
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  licAppData;
  rowSelected = false;
  public userData: any;
  public cellSize = '0';
  public batchId = '';
  public status = 'Not Processed';
  public assignedZones = '';
  public autoPutToteIDS = false;
  public pickBatchQuantity = 0;
  public currentToteID = 0;
  public toteID = '';
  public cell='';
  public toteNumber='';
  public actionDropDown: any;
  public assignedZonesArray = [{ zone: '' }];
  searchAutocompleteItemNum: any = [];
  searchByItem: any = new Subject<string>();
  floatLabelControlItem: any = new FormControl('item' as FloatLabelType);
  hideRequiredControlItem = new FormControl(false);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('matRef') matRef: MatSelect;
  @ViewChild('actionRef') actionRef: MatSelect;
  selectedOption: any;
  displayedColumns1: string[] = [
    'status',
    'totesPosition',
    'toteID',
    'cells',
    'toteQuantity',
    'zoneLabel',
  ];

  selectedIndex: number = 0;
  // Process Put Away
  batchId2: string = '';

  searchAutocompleteItemNum2: any = [];
  dataSource2: any;

  inputType="Any";
  inputValue="";

  nextPos: any;
  nextPutLoc: any;
  nextCell: any;

  postion: any;
  tote: any;

  // Global
  processPutAwayIndex: any;

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
    private authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.ELEMENT_DATA.length = 0;
    this.userData = this.authService.userData();
    this.getCurrentToteID();
    this.getProcessPutAwayIndex();

    this.searchByItem
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        if (value == 1) {
          this.autocompleteSearchColumnItem2();
        } else {
          this.autocompleteSearchColumnItem();
        }
      });
  }

  getCurrentToteID() {
    var payLoad = {
      username: this.userData.username,
      wsid: this.userData.wsid,
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
      (error) => {}
    );
  }

  getFloatLabelValueItem(): FloatLabelType {
    return this.floatLabelControlItem.value || 'item';
  }

  gridAction(action: any) {
    if (action == 'assignAll') {
      for (let index = 0; index < this.pickBatchQuantity; index++) {
        this.ELEMENT_DATA[index].toteid = this.currentToteID.toString();
        this.currentToteID++;
      }

      this.actionDropDown = null;
    } else {
      this.actionDropDown = null;
    }
  }

  getRow(batchID) {
    var payLoad = {
      batchID: batchID,
      username: this.userData.username,
      wsid: this.userData.wsid,
    };
    this.service.create(payLoad, '/Induction/BatchTotes').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.ELEMENT_DATA.length = 0;
          for (var i = 0; i < res.data.length; i++) {
            this.ELEMENT_DATA.push({
              position: parseInt(res.data[i].totePosition),
              cells: res.data[i].cells,
              toteid: res.data[i].toteID.toString(),
            });

            if (i == 0) {
              try {
                this.assignedZones = res.data[i].zoneLabel;
                var zones = res.data[i].zoneLabel.split(' ');
                for (var i = 1; i < zones.length; i++) {
                  //console.log({zone:zones[i]});
                  this.assignedZonesArray.push({ zone: zones[i] });
                }
              } catch (e) {}
            }
          }
          this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        } else {
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => {}
    );
  }

  openSelectZonesDialogue() {
    if (this.batchId != '') {
      const dialogRef = this.dialog.open(SelectZonesComponent, {
        height: '96vh',
        width: '100%',
        autoFocus: '__non_existing_element__',
        data: {
          batchId: this.batchId,
          userId: this.userData.username,
          wsid: this.userData.wsid,
          assignedZones: this.assignedZonesArray,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          var zones = 'Zones:';
          this.assignedZonesArray = result;
          for (var i = 0; i < result.length; i++) {
            zones = zones + ' ' + result[i].zone;
          }
          this.assignedZones = zones;
        }
      });
    } else {
      this.showMessage('Please select batch', 2000, 'error');
    }
  }

  openTotesDialogue(position:any) {
    const dialogRef = this.dialog.open(TotesAddEditComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
      data:
      {
        position: position
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      if(result.toteID!="")
      {
        this.ELEMENT_DATA[(result.position)-1].toteid = result.toteID.toString();
        //this.ELEMENT_DATA[(result.position)-1].cells = result.cellID.toString();
        for(var i=0;i<this.ELEMENT_DATA.length;i++)
        {
        this.ELEMENT_DATA[i].cells = result.cellID.toString();
        }
        
      }

      }
    });



  }
  openToteTransactionViewDialogue() {
    const dialogRef = this.dialog.open(TotesAddEditComponent, {
      height: 'auto',
      width: '80vw',
      autoFocus: '__non_existing_element__'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      if(result.toteID!="")
      {
        this.ELEMENT_DATA[(result.position)-1].toteid = result.toteID.toString();
        //this.ELEMENT_DATA[(result.position)-1].cells = result.cellID.toString();
        for(var i=0;i<this.ELEMENT_DATA.length;i++)
        {
        this.ELEMENT_DATA[i].cells = result.cellID.toString();
        }
        
      }

      }
    });
  }

  openDeleteBatchDialogue() {
    const dialogRef = this.dialog.open(BatchDeleteComponent, {
      height: 'auto',
      width: '50vw',
      autoFocus: '__non_existing_element__',
      data: {
        batchId: this.batchId2,
        toteId: this.toteNumber ? this.toteNumber : '',
        userName: this.userData.userName,
        wsid: this.userData.wsid,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isExecuted) {
      }
    });
  }

  clearBatch() {
    this.batchId = '';
  }

  processBath() {
    if (this.batchId == '') {
      this.showMessage('You must provide a Batch ID.', 2000, 'error');
    } else {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          message:
            'Batch processed!  Click OK to move onto the next step or cancel to remain on this screen to create/edit more batches.',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'Yes') {
          var toteID = '',
            cells = '',
            position = '';
          for (var i = 0; i < this.ELEMENT_DATA.length; i++) {
            if (i == 0) {
              toteID = toteID + this.ELEMENT_DATA[i].toteid;
              cells = cells + this.ELEMENT_DATA[i].cells;
              position = position + this.ELEMENT_DATA[i].position;
            } else {
              toteID = toteID + ',' + this.ELEMENT_DATA[i].toteid;
              cells = cells + ',' + this.ELEMENT_DATA[i].cells;
              position = position + ',' + this.ELEMENT_DATA[i].position;
            }
          }
          var payLoad = {
            batchID: this.batchId,
            zoneLabel: this.assignedZones,
            totes: [toteID, cells, position],
            username: this.userData.userName,
            wsid: this.userData.wsid,
          };
          this.service.create(payLoad, '/Induction/ProcessBatch').subscribe(
            (res: any) => {
              if (res.data && res.isExecuted) {
                this.toastr.success(res.responseMessage, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
                this.selectedIndex = 1;
                this.batchId2 = this.batchId;
                this.fillToteTable(this.batchId);
              } else {
                this.toastr.error('Something went wrong', 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
              }
            },
            (error) => {}
          );
        }
      });
    }
  }

  showMessage(message: any, timeout: any, type: any) {
    if (type == 'error') {
      this.toastr.error(message, 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: timeout,
      });
    } else {
      this.toastr.success(message, 'Success!', {
        positionClass: 'toast-bottom-right',
        timeOut: timeout,
      });
    }
  }

  getProcessPutAwayIndex() {
    var payLoad = {
      username: this.userData.username,
      wsid: this.userData.wsid,
    };
    this.service.create(payLoad, '/Induction/ProcessPutAwayIndex').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.cellSize = res.data.imPreference.defaultCells;
          this.autoPutToteIDS = res.data.imPreference.autoPutAwayToteID;
          this.pickBatchQuantity = res.data.imPreference.pickBatchQuantity;
          this.processPutAwayIndex = res.data;
        } else {
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => {}
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
      username: this.userData.username,
      wsid: this.userData.wsid,
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
      (error) => {}
    );
  }

  createNewBatch(withID = '') {
    if (withID == '') {
      if (this.batchId == '') {
        this.showMessage(
          'You must assign a Batch ID before creating a new batch.',
          2000,
          'error'
        );
      } else {
        this.ELEMENT_DATA.length = 0;
        for (let index = 0; index < this.pickBatchQuantity; index++) {
          if (!this.autoPutToteIDS) {
            this.ELEMENT_DATA.push({
              position: index + 1,
              cells: this.cellSize,
              toteid: '',
            });
          } else {
            this.ELEMENT_DATA.push({
              position: index + 1,
              cells: this.cellSize,
              toteid: this.currentToteID.toString(),
            });
            this.currentToteID++;
          }
        }
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
    } else {
      //Getting and setting next batch ID
      this.getNextBatchID();
      //setup totes
      //this.pickBatchQuantity;
      //ELEMENT_DATA.push({ position: 'uzair' });
      this.ELEMENT_DATA.length = 0;
      for (let index = 0; index < this.pickBatchQuantity; index++) {
        if (!this.autoPutToteIDS) {
          this.ELEMENT_DATA.push({
            position: index + 1,
            cells: this.cellSize,
            toteid: '',
          });
        } else {
          this.ELEMENT_DATA.push({
            position: index + 1,
            cells: this.cellSize,
            toteid: this.currentToteID.toString(),
          });
          this.currentToteID++;
        }
      }
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    }
  }

  onToteChange($event, position, cells = '') {
    if (cells == '') {
      if (this.ELEMENT_DATA[position - 1].toteid != $event.target.value) {
        this.ELEMENT_DATA[position - 1].toteid = $event.target.value;
      }
    } else {
      if (this.ELEMENT_DATA[position - 1].cells != $event.target.value) {
        this.ELEMENT_DATA[position - 1].cells = $event.target.value;
      }
    }
  }

  async autocompleteSearchColumnItem() {
    let searchPayload = {
      batchID: this.batchId,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.service
      .get(searchPayload, '/Induction/BatchIDTypeAhead', true)
      .subscribe(
        (res: any) => {
          if (res.data) {
            this.searchAutocompleteItemNum = res.data;
          } else {
            this.toastr.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => {}
      );
  }

  async autocompleteSearchColumnItem2() {
    let searchPayload = {
      batchID: this.batchId2,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.service.get(searchPayload, '/Induction/BatchIDTypeAhead', true).subscribe(
      (res: any) => {
        if (res.data) {
          this.searchAutocompleteItemNum2 = res.data;
        } else {
          this.toastr.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => {}
    );
  }

  updateToteID($event) {
    for (var i = 0; i < this.pickBatchQuantity; i++) {
      if (this.ELEMENT_DATA[i].toteid == '') {
        this.ELEMENT_DATA[i].toteid = $event.target.value;
        this.toteID = '';
        break;
      }
    }
  }

  assignToteAtPosition(element: any, clear = 0) {
    if (clear == 0) {
      this.ELEMENT_DATA[element.position - 1].toteid =
        this.currentToteID.toString();
      this.currentToteID++;
    } else {
      this.ELEMENT_DATA[element.position - 1].toteid = '';
    }
  }

  setToDefaultQuantity() {
    if (this.batchId == '') {
      this.showMessage('You must provide a Batch ID.', 2000, 'error');
    } else {
      for (var i = 0; i < this.pickBatchQuantity; i++) {
        this.ELEMENT_DATA[i].cells = this.cellSize.toString();
      }
    }
  }

  selectionChanged(value:any)
  {
    this.inputType = value;
  }

  openSelectionTransactionDialogue() {
    if(this.inputValue=="")
    {
      this.toastr.error('Please enter input value', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000,
      });

    }
    else 
    {
      const dialogRef = this.dialog.open(SelectionTransactionForToteComponent, {
        height: 'auto',
        width: '1100px',
        autoFocus: '__non_existing_element__',
        data: {
          inputType:  this.inputType,
          inputValue: this.inputValue,
          userName:   this.userData.userName,
          wsid:       this.userData.wsid,
          batchID:    this.batchId,
          zones:      this.assignedZones,  
          totes:      this.dataSource2.data
        }
      });

      dialogRef.afterClosed().subscribe((result) => {        
        if (result == 'NO') {
          this.toastr.error('The input code provided was not recognized as an Item Number, Lot Number, Serial Number, Host Transaction ID, Scan Code or Supplier Item ID.', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });        
        }
      });

    }
    
  }

  selectTotes(i: any) {
    for (const iterator of this.dataSource2.data) {
      iterator.isSelected = false;
    }
    this.dataSource2.data[i].isSelected = !this.dataSource2.data[i].isSelected;
    this.tote = this.dataSource2.data[i].toteID;
    this.postion = this.dataSource2.data[i].totesPosition;
    this.cell = this.dataSource2.data[i].cells;
    this.toteNumber=this.dataSource2.data[i].toteID;
    this.rowSelected = true;
  }

  fillToteTable(batchID: string = '') {
    try {
      var payLoad = {
        batchID: batchID ? batchID : this.batchId2,
        sortOrder: 'asc',
        sortColumn: 0,
        username: this.userData.username,
        wsid: this.userData.wsid,
      };

      this.service.create(payLoad, '/Induction/TotesTable').subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            for (const iterator of res.data.totesTable) {
              iterator.isSelected = false;
              if (iterator.cells <= iterator.toteQuantity) {
                iterator.status = 1;
              } else {
                iterator.status = 0;
              }
            }
            res.data.totesTable[0].isSelected = true;
            this.dataSource2 = new MatTableDataSource<any>(res.data.totesTable);
            this.dataSource2.paginator = this.paginator;
            this.selectTotes(0)
          } else {
            this.toastr.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => {}
      );
    } catch (error) {
      console.log(error);
    }
  }

  completeBatch() {
    try {
      if (this.batchId2 == '') {
        this.showMessage('You must provide a Batch ID.', 2000, 'error');
      } else {
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          height: 'auto',
          width: '560px',
          autoFocus: '__non_existing_element__',
          data: {
            message: 'Click OK to complete this batch.',
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result == 'Yes') {
            var payLoad = {
              batchID: this.batchId2,
              username: this.userData.userName,
              wsid: this.userData.wsid,
            };

            this.service.create(payLoad, '/Induction/CompleteBatch').subscribe(
              (res: any) => {
                if (res.isExecuted) {
                  this.toastr.success(
                    'Batch Completed Successfully',
                    'Success!',
                    {
                      positionClass: 'toast-bottom-right',
                      timeOut: 2000,
                    }
                  );
                } else {
                  this.toastr.error('Something went wrong', 'Error!', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000,
                  });
                }
              },
              (error) => {}
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  goToNext() {
    var fil = this.dataSource2.data.filter((e: any) => e.status == 0);
    if (fil.length > 0) {
      this.nextPutLoc = fil[0].toteID;
      this.nextPos = fil[0].totesPosition;
      this.nextCell = fil[0].cells;
    } else {
      this.nextPutLoc = '';
      this.nextPos = '';
      this.nextCell = '';
    }
  }

  selectPosOrTote(type: number, value: any = '') {
    if (type == 0) {
      var fil = this.dataSource2.data.filter(
        (e: any) => e.totesPosition == value?.toString()
      );
      if (fil.length > 0) {
        this.tote = fil[0].toteID;
      } else {
        this.tote = '';
      }
    } else if (type == 1) {
      var fil = this.dataSource2.data.filter(
        (e: any) => e.toteID == value?.toString()
      );
      if (fil.length > 0) {
        this.postion = fil[0].totesPosition;
      } else {
        this.postion = '';
      }
    } else {
      var fil = this.dataSource2.data.filter((e: any) => {
        return (
          e.totesPosition == this.postion?.toString() && e.toteID == this.tote
        );
      });
      if (fil.length > 0) {
        for (const iterator of this.dataSource2.data) {
          iterator.isSelected = false;
        }
        this.dataSource2.data[
          this.dataSource2.data.indexOf(fil[0])
        ].isSelected = true;
      } else {
        this.showMessage(
          'The selected position and/or tote ID was not found in the table.',
          2000,
          'error'
        );
      }
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.dataSource2.sort = this.sort;
  }

  clearMatSelectList() {
    this.actionRef.options.forEach((data: MatOption) => data.deselect());
  }

  actionDialog(opened: boolean) {
    if (!opened && this.selectedOption && this.selectedOption === 'markTote') {
     
      const dialogRef = this.dialog.open(MarkToteFullComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'add-trans',
          message: 'Click OK to mark this Tote as being Full',
          userName: this.userData.userName,
          wsid: this.userData.wsid,
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        this.clearMatSelectList();
        if (res) {
          let payLoad = {
            toteNumber: this.toteNumber,
            cell: this.cell,
            batchID: this.batchId2,
            username: this.userData.userName,
            wsid: this.userData.wsid,
          };
    
          this.service.create(payLoad, '/Induction/MarkToteFull').subscribe(
            (res: any) => {
              if (res.data && res.isExecuted) {
                this.toastr.success(
                  'Batch Completed Successfully',
                  'Success!',
                  {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000,
                  }
                );
                this.fillToteTable();
              } else {
                this.toastr.error('Something went wrong', 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
              }
            },
            (error) => {}
          );
          
        }
      });
    } else if (
      !opened &&
      this.selectedOption &&
      this.selectedOption === 'ViewTote'
    ) {
    this.clearMatSelectList();
    }
  }
}

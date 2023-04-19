import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConsolidationManagerService } from '../../consolidation-manager/consolidation-manager.service';
import { AuthService } from 'src/app/init/auth.service';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FloatLabelType } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { AlertConfirmationComponent } from 'src/app/dialogs/alert-confirmation/alert-confirmation.component';
import { CmShipSplitLineComponent } from '../cm-ship-split-line/cm-ship-split-line.component';
import { CmShipEditConIdComponent } from '../cm-ship-edit-con-id/cm-ship-edit-con-id.component';
import { CmShipEditQtyComponent } from '../cm-ship-edit-qty/cm-ship-edit-qty.component';
import { CmToteIdUpdateModalComponent } from '../cm-tote-id-update-modal/cm-tote-id-update-modal.component';

@Component({
  selector: 'app-cm-shipping-transaction',
  templateUrl: './cm-shipping-transaction.component.html',
  styleUrls: ['./cm-shipping-transaction.component.scss']
})
export class CmShippingTransactionComponent implements OnInit {

  public userData: any;

  toteID: string = '';
  STIndex : any;

  ELEMENT_DATA: any[] =[
    {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },
    {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },
    {item_no: '30022', line_no: '30022', tote_id: '30022', order_qty: 'Work 2141', picked_qty: '212', container_id: '123641', ship_qty: '999' },   
  ];  
  displayedColumns: string[] = ['item_no', 'line_no', 'tote_id', 'order_qty', 'picked_qty', 'container_id', 'ship_qty', 'action'];
  tableData : any = this.ELEMENT_DATA
  dataSourceList : any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private dialog          : MatDialog,
              public dialogRef        : MatDialogRef<CmShippingTransactionComponent>,
              private toast           : ToastrService,
              private service         : ConsolidationManagerService,
              private authService     : AuthService,
              private _liveAnnouncer  : LiveAnnouncer,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getShippingTransactionIndex();
  }

  getShippingTransactionIndex() {
    try {
      var payLoad = {
        orderNumber : this.data && this.data.orderNum ? this.data.orderNum : '',
        username: this.userData.userName,
        wsid: this.userData.wsid
      };

      this.service.get(payLoad, '/Consolidation/ShippingTransactionIndex').subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.STIndex = res.data;
          } else {
            this.toast.error('Something went wrong', 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
          }
        },
        (error) => { }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async onKey(event : any, type : string) {
    if (event.key === 'Enter') {
      if (type == 'toteIDtoUpdate' && this.toteID != "") {        
        this.checkToteID();
      } 
      // else if (type == 'location' && this.location != "") {
        // this.scanLocation();
      // }      
    }
  }

  checkToteID() {
    var noExists = false;      
    for (var x = 0; x < this.tableData; x++) {
        var tabTote = this.tableData.data[x].tote_id;
        if (this.toteID == tabTote) {
            this.openToteIDUpdate();
            noExists = false;
            break;
        } else {
            noExists = true;
        }
    };
    if (noExists) {
      this.toast.error('The given Tote ID is not contained within this order number', 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
    };
  }

  openToteIDUpdate() {    
    let dialogRef = this.dialog.open(CmToteIdUpdateModalComponent, {
      height: 'auto',
      width: '96vw',
      autoFocus: '__non_existing_element__',
      data: {
        toteID : this.toteID,
        orderNumber : this.data.orderNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  completePacking() {
    try {

      var payLoad = {
        orderNumber: this.data.orderNumber,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };

      this.service.get(payLoad, '/Consolidation/selCountOpenTransactionsTemp').subscribe(
        (res: any) => {
          if (res.isExecuted) {

            if (res.data == -1) 
            {
              this.toast.error('An error has occurred', 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
            } 
            else if (res.data == 0) 
            {
              let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                height: 'auto',
                width: '560px',
                autoFocus: '__non_existing_element__',
                data: {
                  message: 'Are you sure you want to update this order number as complete for packing?',
                },
              });
      
              dialogRef.afterClosed().subscribe((result) => {
                if (result == 'Yes') {
                  this.service.create(payLoad, '/Consolidation/updCompletePacking').subscribe(
                    (res: any) => {
                      if (res.isExecuted) {
                        this.toast.success('Packing Completed Successfully', 'Success!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
                        this.dialogRef.close();
                      } else {
                        this.toast.error('Something went wrong', 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
                      }
                    },
                    (error) => { }
                  );
                }
              });
            } 
            else 
            {
              let dialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
                height: 'auto',
                width: '560px',
                autoFocus: '__non_existing_element__',
                data: {
                  message: 'Are you sure you want to update this order number as complete for packing?',
                },
              });
      
              dialogRef1.afterClosed().subscribe((result) => {
                if (result == 'Yes') {
                  let dialogRef2 = this.dialog.open(ConfirmationDialogComponent, {
                    height: 'auto',
                    width: '560px',
                    autoFocus: '__non_existing_element__',
                    data: {
                      message: 'Back orders exist for this order number. Still continue pack complete?',
                    },
                  });

                  dialogRef2.afterClosed().subscribe((result) => {
                    if (result == 'Yes') {
                      this.service.create(payLoad, '/Consolidation/updCompletePacking').subscribe(
                        (res: any) => {
                          if (res.isExecuted) {
                            this.toast.success('Packing Completed Successfully', 'Success!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
                            this.dialogRef.close();
                          } else {
                            this.toast.error('Something went wrong', 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
                          }
                        },
                        (error) => { }
                      );
                    }
                  });                  
                }
              });
            }
          } else {
            this.toast.error('Something went wrong', 'Error!', { positionClass: 'toast-bottom-right', timeOut: 2000 });
          }
        },
        (error) => { }
      );
    } catch (error) {
      console.log(error);
    }
  }

  openShipSplitLine() {
    let dialogRef = this.dialog.open(CmShipSplitLineComponent, {
      height: 'auto',
      width: '96vw',
      autoFocus: '__non_existing_element__',
      data: {
        ref : 'ShipTtansactionsTable'        
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  openShipPrintItemLabel() {
    // let dialogRef = this.dialog.open(AlertConfirmationComponent, {
    //   height: 'auto',
    //   width: '96vw',
    //   autoFocus: '__non_existing_element__'     
    // });

    // dialogRef.afterClosed().subscribe(result => {});
  }

  openShipEditQuantity() {
    let dialogRef = this.dialog.open(CmShipEditQtyComponent, {
      height: 'auto',
      width: '96vw',
      autoFocus: '__non_existing_element__'     
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  openShipEditContainerID() {
    let dialogRef = this.dialog.open(CmShipEditConIdComponent, {
      height: 'auto',
      width: '96vw',
      autoFocus: '__non_existing_element__',
      data: {
        order : this.data
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.tableData.sort = this.sort;
  }


}

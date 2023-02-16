import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AuthService } from 'src/app/init/auth.service';
import { SetItemLocationComponent } from '../../dialogs/set-item-location/set-item-location.component';
import { SupplierItemIdComponent } from '../../dialogs/supplier-item-id/supplier-item-id.component';
import { TemporaryManualOrderNumberAddComponent } from '../../dialogs/temporary-manual-order-number-add/temporary-manual-order-number-add.component';
import { UnitMeasureComponent } from '../../dialogs/unit-measure/unit-measure.component';
import { UserFieldsEditComponent } from '../../dialogs/user-fields-edit/user-fields-edit.component';
import { TransactionService } from '../../transaction/transaction.service';
import labels from '../../../labels/labels.json';
import { PostManualTransactionComponent } from '../../dialogs/post-manual-transaction/post-manual-transaction.component';
import { DeleteConfirmationTransactionComponent } from '../../dialogs/delete-confirmation-transaction/delete-confirmation-transaction.component';
import { DeleteConfirmationManualTransactionComponent } from '../../dialogs/delete-confirmation-manual-transaction/delete-confirmation-manual-transaction.component';
import { WarehouseComponent } from '../../dialogs/warehouse/warehouse.component';

@Component({
  selector: 'app-generate-transaction',
  templateUrl: './generate-transaction.component.html',
  styleUrls: ['./generate-transaction.component.scss'],
})
export class GenerateTransactionComponent implements OnInit {
  invMapIDget;
  transactionID;
  selectedOrder;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  searchByInput: any = new Subject<string>();
  orderNumber: any;
  searchAutocompleteList: any;
  userData;
  item;
  itemNumber;
  supplierID;
  expDate: any;
  revision;
  description;
  lotNumber;
  uom;
  notes;
  serialNumber;
  transType;
  reqDate;
  lineNumber;
  transQuantity;
  priority;
  lineSeq;
  hostTransID;
  batchPickID;
  wareHouse;
  toteID;

  totalQuantity: '';
  zone: '';
  row: '';
  shelf: '';
  carousel: '';
  quantityAllocatedPick: '';
  quantityAllocatedPutAway: '';
  invMapID: '';

  emergency = false;
  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.userData = this.authService.userData();
  }

  ngOnInit(): void {
    this.searchByInput
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumn();
      });
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  searchData(event) {
    // this.selectedOrder = event.target.value;
  }

  getRow(row) {
    this.clear();
    this.transactionID = row.id;
    console.log(row);
    let payLoad = {
      id: row.id,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(payLoad, '/Admin/TransactionInfo', true)
      .subscribe(
        (res: any) => {
          if (res && res.data && res.data.getTransaction) {
            this.item = res.data.getTransaction;

            this.itemNumber = this.item.itemNumber;
            this.supplierID = this.item.supplierItemID;
            this.expDate = this.item.expirationDate;
            this.revision = this.item.revision;
            this.description = this.item.description;
            this.lotNumber = this.item.lotNumber;
            this.uom = this.item.unitOfMeasure;
            this.notes = this.item.notes;
            this.serialNumber = this.item.serialNumber;
            this.transType = this.item.transactionType;
            this.reqDate = this.item.requiredDate;
            this.lineNumber = this.item.lineNumber;
            this.transQuantity = this.item.transactionQuantity;
            this.priority = this.item.priority;
            this.lineSeq = this.item.lineSequence;
            this.hostTransID = this.item.hostTransactionID;
            this.batchPickID = this.item.batchPickID;
            this.wareHouse = this.item.warehouse;
            this.toteID = this.item.toteID;
            this.emergency=this.item.emergency==='False'  || this.item.emergency==='false' ?false:true

            this.totalQuantity = res.data.totalQuantity;
            this.zone = this.item.zone;
            this.row = this.item.row;
            this.shelf = this.item.shelf;
            this.carousel = this.item.carousel;
            this.invMapID = this.item.invMapID;
            this.quantityAllocatedPick =res.data && res.data.quantityAllocated.length &&   res.data.quantityAllocated[0].quantityAllocatedPick;
      
            this.quantityAllocatedPutAway =res.data &&  res.data.quantityAllocated.length &&   res.data.quantityAllocated[0].quantityAllocatedPutAway;
            
          } else {
            this.item = '';
          }
        },
        (error) => {}
      );
  }
  clear() {
    this.itemNumber = '';
    this.supplierID = '';
    this.expDate = '';
    this.revision = '';
    this.description = '';
    this.lotNumber = '';
    this.uom = '';
    this.notes = '';
    this.serialNumber = '';
    this.transType = '';
    this.reqDate = '';
    this.lineNumber = '';
    this.transQuantity = '';
    this.priority = '';
    this.lineSeq = '';
    this.hostTransID = '';
    this.batchPickID = '';
    this.wareHouse = '';
    this.toteID = '';
  }
  async autocompleteSearchColumn() {
    let searchPayload = {
      transaction: this.orderNumber,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/ManualTransactionTypeAhead', true)
      .subscribe(
        (res: any) => {
          this.searchAutocompleteList = res.data;
        },
        (error) => {}
      );
  }
  openSetItemLocationDialogue() {
    if (this.orderNumber == '' || !this.item) return;
    const dialogRef = this.dialog.open(SetItemLocationComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        userName: this.userData.userName,
        wsid: this.userData.wsid,
        itemNumber: this.itemNumber,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('---', res);
      if (res && res.invMapID) {
        this.invMapIDget = res.invMapID;
        this.itemNumber = res.itemNumber;
        this.getLocationData();
      }
    });
  }

  clearFields() {
    this.clear();
    this.zone = '';
    this.carousel = '';
    this.row = '';
    this.shelf = '';
    this.totalQuantity = '';
    this.quantityAllocatedPick = '';
    this.quantityAllocatedPutAway = '';
    this.orderNumber = '';
  }

  postTransaction(type) {
    if (
      this.item === '' ||
      this.item === undefined ||
      this.orderNumber === '' ||
      this.orderNumber === undefined
    )
      return;

    const dialogRef = this.dialog.open(PostManualTransactionComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        message:
          type === 'save'
            ? 'Click OK To Post And Save The Temporary Transaction.'
            : 'Click OK To Post And Delete the Temporary Transaction',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let payload = {
          deleteTransaction: type === 'save' ? false : true,
          transactionID: this.transactionID,
          username: this.userData.userName,
          wsid: this.userData.wsid,
        };
        this.transactionService
          .get(payload, '/Admin/PostTransaction')
          .subscribe(
            (res: any) => {
              if (res && res.isExecuted) {
                this.toastr.success(labels.alert.success, 'Success!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
              } else {
                this.toastr.error(res.responseMessage, 'Error!', {
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
  deleteTransaction() {
    const dialogRef = this.dialog.open(
      DeleteConfirmationManualTransactionComponent,
      {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          mode: 'delete-manual-transaction',
          heading: 'Delete Transaction',
          message: `Click OK to delete the current manual transaction.`,
          userName: this.userData.userName,
          wsid: this.userData.wsid,
          orderNumber: this.orderNumber,
          transID: this.transactionID,
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isExecuted) {
        this.clearFields();
      }
    });
  }
  getLocationData() {
    let payload = {
      invMapID: this.invMapIDget,
      username: this.userData.userName,
      wsid: this.userData.wsid,
    };
    this.transactionService.get(payload, '/Admin/LocationData', true).subscribe(
      (res: any) => {
        if (res && res.isExecuted) {
          let items = res.data.locationTables[0];
          this.zone = items.zone;
          this.carousel = items.carousel;
          this.row = items.row;
          this.shelf = items.shelf;
          this.totalQuantity = res.data.totalQuantity;
          this.quantityAllocatedPick = res.data.pickQuantity;
          this.quantityAllocatedPutAway = res.data.putQuantity;
        }
      },
      (error) => {}
    );
  }
  openWareHouse(){
    const dialogRef = this.dialog.open(WarehouseComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        userName: this.userData.userName,
        wsid: this.userData.wsid,
        supplierID: this.supplierID,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
     this.wareHouse=res;
      
    });
  

  }
  updateTransaction() {
    //following sequence must follow to update
    let updateValsequence: any = [];
    updateValsequence[0] = this.itemNumber; //itemNumber
    updateValsequence[1] = this.transType; //TransType 
    updateValsequence[2] = this.expDate; //expDate
    updateValsequence[3] = this.revision; //revision 
    updateValsequence[4] = this.description; //description
    updateValsequence[5] = this.lotNumber; //lotNumber
    updateValsequence[6] = this.uom; //UoM  
    updateValsequence[7] = this.notes; //notes
    updateValsequence[8] = this.serialNumber; //serialNumber
    updateValsequence[9] = this.reqDate; //RequiredDate
    updateValsequence[10] = this.lineNumber; //lineNumber
    updateValsequence[11] = this.transQuantity.toString(); //transQuantity
    updateValsequence[12] = this.priority.toString(); //priority 
    updateValsequence[13] = this.lineSeq.toString(); //lineSeq
    updateValsequence[14] = this.hostTransID.toString(); //hostTransID
    updateValsequence[15] = this.batchPickID.toString(); //batchPickID
    updateValsequence[16] = this.emergency.toString(); //emergency
    updateValsequence[17] = this.wareHouse; //wareHouse
    updateValsequence[18] = this.toteID.toString(); //toteID
    updateValsequence[19] = this.zone; //Zone
    updateValsequence[20] = this.shelf ; //shelf 
    updateValsequence[21] = this.carousel; //carousel 
    updateValsequence[22] = this.row; //row
    updateValsequence[23] = ''; //Bin
    updateValsequence[24] = this.invMapID.toString(); //InvMapID
  

    let payload = {
      newValues: updateValsequence,
      transID: this.transactionID,
      userName: this.userData.userName,
      wsid: this.userData.wsid,
    };

    this.transactionService
      .get(payload, '/Admin/UpdateTransaction')
      .subscribe((res: any) => {
        if (res && res.isExecuted) {
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        } else {
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      });
  }
  openSupplierItemDialogue() {
    const dialogRef = this.dialog.open(SupplierItemIdComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        userName: this.userData.userName,
        wsid: this.userData.wsid,
        supplierID: this.supplierID,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.supplierID=res.supplierID;
    });
  }
  openUnitOfMeasureDialogue() {
    const dialogRef = this.dialog.open(UnitMeasureComponent, {
      height: 'auto',
      width: '800px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((res) => {
     this.uom=res;

    });
  }
  openTemporaryManualOrderDialogue() {
    const dialogRef = this.dialog.open(TemporaryManualOrderNumberAddComponent, {
      height: 'auto',
      width: '800px',
      autoFocus: '__non_existing_element__',
      data: {
        userName: this.userData.userName,
        wsid: this.userData.wsid,
        orderNumber: this.orderNumber ? this.orderNumber : '',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isExecuted) {
        this.orderNumber = res.orderNumber;
        this.itemNumber = res.itemNumber;
        this.getRow(res);
      }
      console.log(res);
    });
  }

  openUserFieldsEditDialogue() {
    const dialogRef = this.dialog.open(UserFieldsEditComponent, {
      height: 'auto',
      width: '800px',
      autoFocus: '__non_existing_element__',
      data: {
        transID:this.transactionID,
        userName: this.userData.userName,
        wsid: this.userData.wsid,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.isExecuted) {

      }
      console.log(res);
    });
  }
}

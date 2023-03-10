import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TransactionService } from '../../transaction/transaction.service';
import labels from '../../../labels/labels.json';

@Component({
  selector: 'app-temporary-manual-order-number-add',
  templateUrl: './temporary-manual-order-number-add.component.html',
  styleUrls: ['./temporary-manual-order-number-add.component.scss'],
})
export class TemporaryManualOrderNumberAddComponent implements OnInit {
  floatLabelControl: any = new FormControl('auto' as FloatLabelType);
  floatLabelControlItem: any = new FormControl('item' as FloatLabelType);
  hideRequiredControl = new FormControl(false);
  hideRequiredControlItem = new FormControl(false);
  searchAutocompleteOrderNum: any;
  searchAutocompleteItemNum: any = [];
  setLocationByItemList: any = [];
  orderNumber;
  inventoryMapID;
  searchByOrder: any = new Subject<string>();
  searchByItem: any = new Subject<string>();
  transType = 'Pick';
  itemNumber;
  orderRequired:boolean=false;
  itemInvalid:boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<any>

  ) {
    this.orderNumber = data.orderNumber;
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  getFloatLabelValueItem(): FloatLabelType {
    return this.floatLabelControlItem.value || 'item';
  }
  searchData(event) {
    // console.log(event);
  }
  setItem(event?) {
    let payLoad = {
      itemNumber: this.itemNumber,
      username: this.data.userName,
      wsid: this.data.wsid,
    };
    this.transactionService.get(payLoad, '/Admin/GetLocations', true).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.setLocationByItemList = res.data.map((item) => {
            return {
              invMapID: item.invMapID,
              select: `${item.itemQty} @ ${item.locationNumber}`,
            };
          });

          // console.log(this.setLocationByItemList);
        }

        // this.searchAutocompleteItemNum = res.data;
      },
      (error) => {}
    );
  }

  saveTransaction() {

    if(this.orderRequired || this.itemInvalid ||  !this.setLocationByItemList.length || this.itemNumber==='' || this.itemNumber===undefined)return
    let payLoad = {
      orderNumber: this.orderNumber,
      itemNumber: this.itemNumber,
      transactionType: this.transType,
      invMapID: this.inventoryMapID,
      username: this.data.userName,
      wsid: this.data.wsid,
    };

    this.transactionService
      .get(payLoad, '/Admin/NewTransactionSave', true)
      .subscribe(
        (res: any) => {
          if (res.isExecuted) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
            this.dialogRef.close({ isExecuted: true,id:res.data,orderNumber:this.orderNumber,itemNumber:this.itemNumber});
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
            this.dialogRef.close({ isExecuted: true,id:res.data,orderNumber:this.orderNumber,itemNumber:this.itemNumber  });
          }
        },
        (error) => {}
      );
  }
  onFocusOutEvent(event,type){
// console.log(event.target.value)
if(type==='order'){
if(event.target.value===''){
this.orderRequired=true
}else{
  this.orderRequired=false;
}
}else if(type==='item'){
  // if(this.itemNumber==='')return;
   let payLoad = {
    itemNumber: this.itemNumber,
      username: this.data.userName,
      wsid: this.data.wsid,
    };
    this.transactionService
      .get(payLoad, '/Common/ItemExists', true)
      .subscribe(
        (res: any) => {
          if(res && res.isExecuted){
            if(res.data===''){
              this.itemInvalid=true
            }else{
              this.itemInvalid=false

            }
     
          }
          // this.searchAutocompleteItemNum = res.data;
        },
        (error) => {}
      );
}
  } 
  getRow(row) {
    // console.log(row);
    // let payLoad = {
    //   id: row.id,
    //   username: this.data.userName,
    //   wsid: this.data.wsid,
    // };
    // this.transactionService
    //   .get(payLoad, '/Admin/ManualTransactionTypeAhead', true)
    //   .subscribe(
    //     (res: any) => {
    //       if(res && res.data){
    //         this.setLocationByItemList=res.data.map((item)=>{
    //           return {invMapID:item.invMapID,select:`${item.itemQty}@${item.locationNumber}`}
    //         })
    //         console.log(this.setLocationByItemList);
    //       }
    //       // this.searchAutocompleteItemNum = res.data;
    //     },
    //     (error) => {}
    //   );
  }

  async autocompleteSearchColumn() {
    let searchPayload = {
      transaction: this.orderNumber,
      username: this.data.userName,
      wsid: this.data.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Admin/ManualTransactionTypeAhead', true)
      .subscribe(
        (res: any) => {
          this.searchAutocompleteOrderNum = res.data;
        },
        (error) => {}
      );
  }

  async autocompleteSearchColumnItem() {

   
    let searchPayload = {
      itemNumber: this.itemNumber,
      beginItem:'---',
      isEqual:false,
      username: this.data.userName,
      wsid: this.data.wsid,
    };
    this.transactionService
      .get(searchPayload, '/Common/SearchItem', true)
      .subscribe(
        (res: any) => {
          if (res.data) {
            this.searchAutocompleteItemNum=res.data
            this.setItem()
            // if (this.searchAutocompleteItemNum.includes(res.data)) return;
            // this.searchAutocompleteItemNum.push(res.data);
          }
        },
        (error) => {}
      );
  }
  ngOnInit(): void {
    this.searchByOrder
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumn();
      });

    this.searchByItem
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.autocompleteSearchColumnItem();
      });
  }

  ngOnDestroy() {
    this.searchByOrder.unsubscribe();
    this.searchByItem.unsubscribe();
  }
}

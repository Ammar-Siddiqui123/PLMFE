import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TransactionService } from '../../transaction/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { InventoryMasterService } from '../../inventory-master/inventory-master.service';
import { WarehouseService } from 'src/app/common/services/warehouse.service';
import { UnitOfMeasureService } from 'src/app/common/services/unit-measure.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SetColumnSeqService } from '../../../admin/dialogs/set-column-seq/set-column-seq.service';
import labels from '../../../labels/labels.json';




@Component({
  selector: 'app-reprocess-transaction-detail',
  templateUrl: './reprocess-transaction-detail.component.html',
  styleUrls: ['./reprocess-transaction-detail.component.scss']
})
export class ReprocessTransactionDetailComponent implements OnInit {

  isHistory:any;
  
  transactionID:any;
  public userData: any;
  searchValue: any = '';
  searchList: any;
  public warehouse_list: any;
  public unitOfMeasure_list: any;
  label:boolean;
  emergency:boolean;
  expDate:any;
  reqDate:any;



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<any>,private transactionService: TransactionService,private toastr: ToastrService,private authService: AuthService,private invMasterService: InventoryMasterService, private whService: WarehouseService,private umService: UnitOfMeasureService,private saveTransaction: SetColumnSeqService) { }

  editTransactionForm = new FormGroup({
    transactionQuantity: new FormControl('', [Validators.required]),
    unitOfMeasure: new FormControl(''),
    serialNumber: new FormControl(''),
    lotNumber: new FormControl(''),
    expirationDate: new FormControl(' ' ),
    revision: new FormControl('' ),
    notes: new FormControl(''),
    userField1: new FormControl(''),
    userField2: new FormControl('' ),
    hostTransactionID: new FormControl(''),
    requiredDate: new FormControl(' '),
    batchPickID: new FormControl(''),
    lineNumber: new FormControl('', [Validators.required]),
    lineSequence: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    label: new FormControl(''),
    emergency: new FormControl(''),
    wareHouse: new FormControl(''),
    orderNumber: new FormControl({ value: '', disabled: true }),
    itemNumber: new FormControl({ value: '', disabled: true }),
    transactionType: new FormControl({ value: '', disabled: true }),
    importDate: new FormControl({ value: '', disabled: true }),

    importBy:  new FormControl({ value: '', disabled: true }),
    zone:  new FormControl({ value: '', disabled: true }),
    carousel: new FormControl({ value: '', disabled: true }),
    row: new FormControl({ value: '', disabled: true }),
    shelf:  new FormControl({ value: '', disabled: true }),
    bin: new FormControl({ value: '', disabled: true }),
    reason:  new FormControl({ value: '', disabled: true }),
    reasonMessage:  new FormControl({ value: '', disabled: true }),
    description:  new FormControl({ value: '', disabled: true }),

  });

  closeWindow()
  {
    this.dialogRef.close('add'); 
  }

  onNumberValueChange()
  {

    var currentLotNumber=this.editTransactionForm.get("lotNumber")?.value?.toString()==""?"0":this.editTransactionForm.get("lotNumber")?.value?.toString();
    var currentSerialNumber=this.editTransactionForm.get("serialNumber")?.value?.toString()==""?"0":this.editTransactionForm.get("serialNumber")?.value?.toString();
    
    

    this.editTransactionForm.get("lotNumber")?.setValue(parseInt(currentLotNumber||'').toString());
    this.editTransactionForm.get("serialNumber")?.setValue(parseInt(currentSerialNumber||'').toString());
    
    
  }

  editTransaction() {
    console.log('=====================POST==============================');
    console.log(this.editTransactionForm.get("label")?.value?.toString());
    console.log(this.editTransactionForm.get("emergency")?.value);
    var payload = {
      "id":this.transactionID,
      "oldValues": [
      ],
      "newValues": [
        this.editTransactionForm.get("transactionQuantity")?.value,
        this.editTransactionForm.get("unitOfMeasure")?.value,
        this.editTransactionForm.get("serialNumber")?.value,
        this.editTransactionForm.get("lotNumber")?.value?.toString(),
        // (this.expDate!=null&&this.expDate!="1900-01-01T19:31:48.000Z")?this.expDate:" ",
        this.dayIncrement(this.expDate),
        this.editTransactionForm.get("revision")?.value,
        this.editTransactionForm.get("notes")?.value,
        this.editTransactionForm.get("userField1")?.value,
        this.editTransactionForm.get("userField2")?.value, 
        this.editTransactionForm.get("hostTransactionID")?.value,
        // (this.reqDate!=null&&this.reqDate!="1900-01-01T19:31:48.000Z")?this.reqDate:" ",
        this.dayIncrement(this.reqDate),

        this.editTransactionForm.get("batchPickID")?.value,
        this.editTransactionForm.get("lineNumber")?.value?.toString(),
        this.editTransactionForm.get("lineSequence")?.value?.toString(),
        this.editTransactionForm.get("priority")?.value?.toString(),
        this.editTransactionForm.get("label")?.value?.toString(),
        this.editTransactionForm.get("emergency")?.value?.toString(),
        this.editTransactionForm.get("wareHouse")?.value
      ],
      "username": this.userData.username,
      "wsid": this.userData.wsid
  }

  this.saveTransaction.save(payload).subscribe((res: any) => {


    this.dialogRef.close('add');
          this.toastr.success(labels.alert.update, 'Success!',{
            positionClass: 'toast-bottom-right',
            timeOut:2000
         });

    (error) => {
      this.toastr.error('Something went wrong', 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
    }
  });
  }

  ngOnInit(): void {
    this.isHistory  = this.data.history;
    this.transactionID = this.data.transactionID;
    this.userData = this.authService.userData();
    this.getTransactionDetail();
    this.getWarehouse();
    this.getUOM();
  }

  getUOM(){
    this.umService.getUnitOfMeasure().subscribe((res) => {
      if (res.isExecuted) {
        this.unitOfMeasure_list = res.data;
      }
    });
  }

  getWarehouse(){
    this.whService.getWareHouse().subscribe((res) => {
      this.warehouse_list = res.data;
     });
  }

  onDateChange(event: any , fromExpDate=""): void {
    if(!(fromExpDate==""))
    {
      this.expDate = new Date(event).toISOString();
    }
    else 
    {
      this.reqDate = new Date(event).toISOString();
    }
    
  }

  getTransactionDetail()
  {
    var payload={
      id:''+this.transactionID+'',
      username: this.userData.userName,
      wsid: this.userData.wsid,
      history: false,
      }
      this.transactionService.get(payload, '/Admin/TransactionByID').subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            let finalExpiryDate,finalReqDate;
            try
            {
              if(res.data[0].expirationDate!=''){
                // var expDate = res.data[0].expirationDate.split(" ");
                // expDate = expDate[0].split('/');
                // finalExpiryDate = new Date(expDate[2],expDate[0]-1,parseInt(expDate[1])+1);
                finalExpiryDate = new Date(res.data[0].expirationDate);

              }
              if(res.data[0].requiredDate!=''){
              // var reqDate = res.data[0].requiredDate.split(" ");
              // reqDate = reqDate[0].split('/');
              // finalReqDate = new Date(reqDate[2],reqDate[0]-1,parseInt(reqDate[1])+1);
              finalReqDate = new Date(res.data[0].requiredDate);


              }
          
              this.expDate = finalExpiryDate?finalExpiryDate.toISOString():'';
              this.reqDate = finalReqDate?finalReqDate.toISOString():'';
            }
            catch(e){}
            console.log('===========GET===============>');
            console.log(this.expDate);
            console.log(this.reqDate);

            this.expDate = this.expDate!="1900-01-01T19:31:48.000Z"?this.expDate:" ";
            this.reqDate = this.reqDate!="1900-01-01T19:31:48.000Z"?this.reqDate:" ";
            
            
            if(res.data[0].label==false){this.label=false;}else{this.label=true;}
            if(res.data[0].emergency=='False'){this.emergency=false;}else{this.emergency=true;}
            this.editTransactionForm.patchValue({
              "transactionQuantity": res.data[0].transactionQuantity,
              "unitOfMeasure": res.data[0].unitOfMeasure,
              "serialNumber": res.data[0].serialNumber,
              "lotNumber":res.data[0].lotNumber,
              "expirationDate": this.expDate!="1900-01-01T19:31:48.000Z"?this.expDate:" ",
              "revision":res.data[0].revision,
              "notes": res.data[0].notes,
              "userField1": res.data[0].userField1,
              "userField2": res.data[0].userField2,
              "hostTransactionID":res.data[0].hostTransactionID,
              "requiredDate": this.reqDate!="1900-01-01T19:31:48.000Z"?this.reqDate:" ",
              "batchPickID": res.data[0].batchPickID,
              "lineNumber":res.data[0].lineNumber,
              "lineSequence": res.data[0].lineSequence,
              "priority": res.data[0].priority,
              "label": this.label.toString(),
              "emergency": this.emergency.toString(),
              "wareHouse":res.data[0].wareHouse,
              "orderNumber":res.data[0].orderNumber,
              "itemNumber": res.data[0].itemNumber,
              "transactionType": res.data[0].transactionType,
              "importDate": res.data[0].importDate,
              "importBy": res.data[0].importBy,
              "zone":res.data[0].zone,
              "carousel": res.data[0].carousel,
              "row": res.data[0].row,
              "shelf": res.data[0].shelf,
              "bin": res.data[0].bin,
              "reason": res.data[0].reason,
              "reasonMessage": res.data[0].reasonMessage,
              "description": res.data[0].description


            }); 

            
          } else {
            console.log(res);
            this.toastr.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => {}
      );
  }

  dayIncrement(date:any){

    // (this.expDate!=null&&this.expDate!="1900-01-01T19:31:48.000Z")?this.expDate:" ",
    if(date!=null && date!="1900-01-01T19:31:48.000Z"){
      var newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    }else{
      return '';
    }

   
  }
}

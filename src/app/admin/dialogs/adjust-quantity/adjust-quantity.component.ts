import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellSizeComponent } from '../cell-size/cell-size.component';
import { VelocityCodeComponent } from '../velocity-code/velocity-code.component';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { AdjustQuantityService } from './adjust-quantity.service';
import { ToastrService } from 'ngx-toastr';
import { ConditionalExpr } from '@angular/compiler';

export interface  AdjustQuantityDataStructure   {
 // invMapID : string |  '',
  itemNumber :  string |  '',
  description :  string |  '',
  location :  string |  '',
  quantityAllocatedPick:  string |  '',
  quantityAllocatedPutAway :  string |  '',

  zone:   any |  '',  //notExist
  currentMaxQty:  any |  '',  //notExist
  currentMinQty:  any |  '',  //notExist
  currentLocationQty:  any |  '' //notExist
  locationZone:  any |  '' //notExist
 
}

@Component({
  selector: 'app-adjust-quantity',
  templateUrl: './adjust-quantity.component.html',
  styleUrls: ['./adjust-quantity.component.scss']
})
export class AdjustQuantityComponent implements OnInit {

 adjustInventoryMapForm: FormGroup;

 getAdjustQuantityData  :    AdjustQuantityDataStructure = {

  itemNumber : '',
  description :  '',
  location : '',
  zone: '', //notExist
  quantityAllocatedPick:  '',
  quantityAllocatedPutAway : '',
  locationZone : '',
  currentMaxQty: '', //notExist
  currentMinQty: '', //notExist
  currentLocationQty: '' , //notExist

} ;

 getAdjustReasonsList: any ;

 

  constructor(
    private dialog: MatDialog,
    public fb: FormBuilder,
    private adjustQuantityService: AdjustQuantityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>
  ) {

  }

  ngOnInit(): void {
    console.log(this.data.id)
    this.getItemQuantity(this.data.id);
    this.getAdjustmentReasons();
    this.initializeDataSet();
  }

  initializeDataSet(){
    this.adjustInventoryMapForm = this.fb.group({
      mapID: [ this.data.id, [Validators.required]],
      quantity: [  '', [Validators.required]],
      description: [  '', [Validators.required]],
    });
  }

  getItemQuantity(id: any){
    this.adjustQuantityService.getItemQuantityDetail(id).subscribe((res) => {
      if(res.data && res.isExecuted){
        this.getAdjustQuantityData = res.data;
      }
    });
  }

  getAdjustmentReasons(){
    this.adjustQuantityService.getAdjustmentReasonsList().subscribe((res) => {
      if(res.data && res.isExecuted){
        this.getAdjustReasonsList = res.data;
      }
    });
  }
  onSubmit(form: FormGroup) {
    console.log('create',form);

    if(form.valid){
      this.adjustQuantityService.updateItemQuantity(form.value).subscribe((res) => {
        if(res.isExecuted){
          this.toastr.success(res.responseMessage, 'Success!',{
            positionClass: 'toast-bottom-right',
            timeOut:2000
         });
          console.log(res.responseMessage)
         // this.dialog.closeAll(form.value.quantity);
          this.dialogRef.close(form.value.quantity);   
        }
      });
    }
  }

  get f() {
    return this.adjustInventoryMapForm.controls;
  }
  hasError(fieldName: string, errorName: string) {
    return this.adjustInventoryMapForm.get(fieldName)?.touched && this.adjustInventoryMapForm.get(fieldName)?.hasError(errorName);
  }
  isValid() {
    return this.adjustInventoryMapForm.valid;
  }

 






}

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ProcessPutAwayService } from 'src/app/induction-manager/processPutAway.service';
import { AuthService } from 'src/app/init/auth.service';
import { CrossDockTransactionComponent } from '../cross-dock-transaction/cross-dock-transaction.component';
import labels from '../../labels/labels.json';
import { CellSizeComponent } from 'src/app/admin/dialogs/cell-size/cell-size.component';
import { VelocityCodeComponent } from 'src/app/admin/dialogs/velocity-code/velocity-code.component';
import { CellSizeService } from 'src/app/common/services/cell-size.service';
import { VelocityCodeService } from 'src/app/common/services/velocity-code.service';
import { ChooseLocationComponent } from '../choose-location/choose-location.component';
import { WarehouseComponent } from 'src/app/admin/dialogs/warehouse/warehouse.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-transaction-for-tote-extend',
  templateUrl: './selection-transaction-for-tote-extend.component.html',
  styleUrls: ['./selection-transaction-for-tote-extend.component.scss']
})
export class SelectionTransactionForToteExtendComponent implements OnInit {

  public userData   : any;
  toteForm          : FormGroup;
  cellSizeList      : any = [];
  velocityCodeList  : any = [];
  orderNum          : any;
  totes             : any = [];


  constructor(public dialogRef                  : MatDialogRef<SelectionTransactionForToteExtendComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog                    : MatDialog,
              public formBuilder                : FormBuilder,
              private authService               : AuthService,
              private toast                     : ToastrService,
              private service                   : ProcessPutAwayService,
              private cellSizeService           : CellSizeService,
              private velocityCodeService       : VelocityCodeService,
              private toastr: ToastrService,
              public router: Router,
              ) {

    this.toteForm = this.formBuilder.group({

      // Header
      itemNumber                        : new FormControl('', Validators.compose([])),
      description                       : new FormControl('', Validators.compose([])),
      batchID                           : new FormControl('', Validators.compose([])),
      zones                             : new FormControl('', Validators.compose([])),

      // Trans Info
      orderNumber                       : new FormControl('', Validators.compose([])),
      category                          : new FormControl('', Validators.compose([])),
      subCategory                       : new FormControl('', Validators.compose([])),
      userField1                        : new FormControl('', Validators.compose([])),
      userField2                        : new FormControl('', Validators.compose([])),
      lotNumber                         : new FormControl('', Validators.compose([])),                  
      expirationDate                    : new FormControl('', Validators.compose([])),
      serialNumber                      : new FormControl('', Validators.compose([])),
      transactionQuantity               : new FormControl('', Validators.compose([])),
      warehouse                         : new FormControl('', Validators.compose([])),

      // Item Info
      supplierItemID                    : new FormControl('', Validators.compose([])),
      warehouseSensitive                : new FormControl({value : false, disabled : true}, Validators.compose([])),
      dateSensitive                     : new FormControl({value : false, disabled : true}, Validators.compose([])),
      fifo                              : new FormControl({value : false, disabled : true}, Validators.compose([])),
      unitOfMeasure                     : new FormControl('', Validators.compose([])),
      carouselCellSize                  : new FormControl('', Validators.compose([])),
      bulkCellSize                      : new FormControl('', Validators.compose([])),
      cfCellSize                        : new FormControl('', Validators.compose([])),
      carouselVelocity                  : new FormControl('', Validators.compose([])),
      bulkVelocity                      : new FormControl('', Validators.compose([])),
      cfVelocity                        : new FormControl('', Validators.compose([])),
      primaryPickZone                   : new FormControl('', Validators.compose([])),
      secondaryPickZone                 : new FormControl('', Validators.compose([])),

      // Location Info
      zone                              : new FormControl('', Validators.compose([])),
      carousel                          : new FormControl('', Validators.compose([])),
      row                               : new FormControl('', Validators.compose([])),
      shelf                             : new FormControl('', Validators.compose([])),
      bin                               : new FormControl('', Validators.compose([])),
      cellSize                          : new FormControl('', Validators.compose([])),
      velocityCode                      : new FormControl('', Validators.compose([])),
      itemQuantity                      : new FormControl('', Validators.compose([])),
      maximumQuantity                   : new FormControl('', Validators.compose([])),
      quantityAllocatedPutAway          : new FormControl('', Validators.compose([])),

      // Complete Transaction
      toteID                            : new FormControl('', Validators.compose([])),
      totePos                           : new FormControl('', Validators.compose([])),
      toteCells                         : new FormControl({value : '', disabled : true}, Validators.compose([])),
      toteQty                           : new FormControl(0, Validators.compose([])),

      invMapID                          : new FormControl(0, Validators.compose([])),
      dedicated                         : new FormControl(false, Validators.compose([])),

    });

  }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getCellSizeList();
    this.getVelocityCodeList();
    this.getDetails();    
  }

  getDetails() {
    try {
      var payload = { 
        "otid": this.data.otid,
        "itemNumber": this.data.itemNumber,
        "username": this.userData.userName,
        wsid: this.userData.wsid 
      }
      this.service.get(payload, '/Induction/ItemDetails').subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            const values = res.data[0];  

            this.orderNum = values.orderNumber;
            this.totes = this.data.totes;

            var fil = this.totes.filter((e: any) => e.isSelected == true);

            this.toteForm.patchValue({

              // Header
              itemNumber                        : values.itemNumber,
              description                       : values.description,
              batchID                           : this.data.batchID,
              zones                             : this.data.zones,

              // Trans Info
              orderNumber                       : values.orderNumber,
              category                          : values.category,
              subCategory                       : values.subCategory,
              userField1                        : values.userField1,
              userField2                        : values.userField2,
              lotNumber                         : values.lotNumber,                  
              expirationDate                    : values.expirationDate,
              serialNumber                      : values.serialNumber,
              transactionQuantity               : values.transactionQuantity,
              warehouse                         : values.warehouse,

              // Item Info
              supplierItemID                    : values.supplierItemID,
              warehouseSensitive                : values.warehouseSensitive,
              dateSensitive                     : values.dateSensitive,
              fifo                              : values.fifo,
              unitOfMeasure                     : values.unitOfMeasure,
              carouselCellSize                  : values.carouselCellSize,
              bulkCellSize                      : values.bulkCellSize,
              cfCellSize                        : values.cfCellSize,
              carouselVelocity                  : values.carouselVelocity,
              bulkVelocity                      : values.bulkVelocity,
              cfVelocity                        : values.cfVelocity,
              primaryPickZone                   : values.primaryPickZone,
              secondaryPickZone                 : values.secondaryPickZone,

              // Location Info
              zone                              : values.zone,
              carousel                          : values.carousel,
              row                               : values.row,
              shelf                             : values.shelf,
              bin                               : values.bin,
              cellSize                          : values.cellSize,
              velocityCode                      : values.velocityCode,
              itemQuantity                      : values.itemQuantity,
              maximumQuantity                   : values.maximumQuantity,
              quantityAllocatedPutAway          : values.quantityAllocatedPutAway,

              // Complete Transaction
              toteID                            : fil[0].toteID,
              totePos                           : fil[0].totesPosition,
              toteCells                         : fil[0].cells,
              toteQty                           : this.data.transactionQuantity ? this.data.transactionQuantity : this.data.defaultPutAwayQuantity,

              invMapID                          : values.invMapID,
              dedicated                         : values.dedicated,

            });
          } else {
            this.toast.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => { }
      );
    } catch (error) {
      console.log(error);
    }
  }

  clearTransInfo() {

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        message: 'Click OK to clear serial number, lot number, expiration date, warehouse, Ship VIA, and Ship To Name',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        this.toteForm.patchValue({
          userField1                        : '',
          userField2                        : '',
          lotNumber                         : '',                  
          expirationDate                    : '',
          serialNumber                      : '',
          warehouse                         : '',
        }); 
      }
    });    
  }

  getCellSizeList() {
    this.cellSizeService.getCellSize().subscribe((res) => {
      this.cellSizeList = res.data;
    });
  }

  getVelocityCodeList() {
    this.velocityCodeService.getVelocityCode().subscribe((res) => {
      this.velocityCodeList = res.data;
    });
  }

  updateItemInfo() {
    try {

      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: 'auto',
        width: '560px',
        autoFocus: '__non_existing_element__',
        data: {
          message: 'Click OK to save current cell sizes and velocity codes for this item to the inventory master.',
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'Yes') {

          const values = this.toteForm.value;

          var payload = { 
            "itemNumber": values.itemNumber,
            "ccell": values.carouselCellSize,
            "bcell": values.bulkCellSize,
            "cFcell": values.cfCellSize,
            "cvel": values.carouselVelocity,
            "bvel": values.bulkVelocity,
            "cFvel": values.cfVelocity,
            "pzone": values.primaryPickZone,
            "szone": values.secondaryPickZone,
            username: this.userData.userName,
            wsid: this.userData.wsid 
          }
          
          this.service.update(payload, '/Induction/IMUpdate').subscribe(
            (res: any) => {
              if (res.data && res.isExecuted) {
                this.toast.success(labels.alert.update, 'Success!',{
                  positionClass: 'toast-bottom-right',
                  timeOut:2000
               });            
              } else {
                this.toast.error('Something went wrong', 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
              }
            },
            (error) => { }
          );
          
        }
      }); 
      
    } catch (error) {
      console.log(error);
    }
  }

  public openCellSizeDialog(param : any) {

    let currentValue="";

    if(param == 'cellSize') {
      currentValue  = this.toteForm.controls['carouselCellSize'].value
    } else if(param == 'bulkCellSize'){
      currentValue  = this.toteForm.controls['bulkCellSize'].value
    } else if(param == 'cfCellSize'){
      currentValue  = this.toteForm.controls['cfCellSize'].value
    }
    
    let dialogRef = this.dialog.open(CellSizeComponent, {
      height: 'auto',
      width: '750px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
        cs:currentValue
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     
      if(result){
        if(param == 'cellSize'){
          this.toteForm.patchValue({
            'carouselCellSize' : result
          });
        } else if(param == 'bulkCellSize'){
          this.toteForm.patchValue({
            'bulkCellSize' : result
          });
        } else if(param == 'cfCellSize'){
          this.toteForm.patchValue({
            'cfCellSize' : result
          });
        }
      }

      this.getCellSizeList();


    });

  }

  public openVelocityCodeDialog(param : any) {
    
    let currentValue="";

    if(param == 'goldenZone') {
      currentValue  = this.toteForm.controls['carouselVelocity'].value
    } else if(param == 'bulkVelocity') {
      currentValue  = this.toteForm.controls['bulkVelocity'].value
    } else if(param == 'cfVelocity') {
      currentValue  = this.toteForm.controls['cfVelocity'].value
    }
    
    let dialogRef = this.dialog.open(VelocityCodeComponent, {
      height: 'auto',
      width: '750px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
        vc: currentValue
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(param == 'goldenZone'){
          this.toteForm.patchValue({
            'carouselVelocity' : result
          });
        } else if(param == 'bulkVelocity'){
          this.toteForm.patchValue({
            'bulkVelocity' : result
          });
        } else if(param == 'cfVelocity'){
          this.toteForm.patchValue({
            'cfVelocity' : result
          });
        }
      }
      this.getVelocityCodeList();
    });    
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openChooseLocation() {
    const values = this.toteForm.value;
    const dialogRef = this.dialog.open(ChooseLocationComponent, {
      height: 'auto',
      width: '70vw',
      autoFocus: '__non_existing_element__',
      data: values
    });
  }

  findLocation() {
    try {

      const values = this.toteForm.value;

      var payLoad = {
        "qtyPut": values.quantityAllocatedPutAway ? parseInt(values.quantityAllocatedPutAway) : 0,
        "item": values.itemNumber,
        "ccell": values.carouselCellSize,
        "cvel": values.carouselVelocity,
        "bcell": values.bulkCellSize,
        "bvel": values.bulkVelocity,
        "cfcell": values.cfCellSize,
        "cfvel": values.cfVelocity,
        "whse": values.warehouse,
        "dateSens": values.dateSensitive,
        "fifo": values.fifo,
        "isReel": false,
        "lot": values.lotNumber,
        "ser": values.serialNumber,
        "replenfwd": true,
        "prevZone": values.zones,
        "dedicate": values.dedicate,
        "rts": false,
        "expDate": values.expirationDate,
        "primaryZone": values.primaryPickZone,
        "secondaryZone": values.secondaryPickZone,
        username: this.userData.userName,
        wsid: this.userData.wsid,
      };
      this.service.create(payLoad, '/Induction/FindLocation').subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {

            this.toteForm.patchValue({
              // Location Info
              zone                              : res.data.zone,
              carousel                          : res.data.carousel,
              row                               : res.data.row,
              shelf                             : res.data.shelf,
              bin                               : res.data.bin,
              cellSize                          : res.data.cellSz,
              velocityCode                      : res.data.velCode,
              itemQuantity                      : res.data.locQty,
              maximumQuantity                   : res.data.locMaxQty,
              quantityAllocatedPutAway          : res.data.qtyAlloc,
              invMapID                          : res.data.invMapID
            });

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
      console.log(error)
    }
  }

  openCrossDockTransactionDialogue() {
    const values = this.toteForm.value;
    
    const dialogRef = this.dialog.open(CrossDockTransactionComponent, {
      height: 'auto',
      width: '70vw',
      autoFocus: '__non_existing_element__',
      data: {
        itemWhse: values.itemNumber,
        userId: this.userData.userName,
        wsid: this.userData.wsid,
        warehouse: values.warehouse,
        batchID: this.data.batchID,
        zone: values.zones,
        description: values.description,
        values,
        otid : this.data.otid
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res == "Submit") {
        this.completeTransaction();
      }
      
    });
  }
  
  openWareHouse() {
    const values = this.toteForm.value;
    const dialogRef = this.dialog.open(WarehouseComponent, {
      height: 'auto',
      width: '640px',
      autoFocus: '__non_existing_element__',
      data: {
        userName: this.userData.userName,
        wsid: this.userData.wsid,
        supplierID: values.supplierItemID,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res!='clear') {
        this.toteForm.patchValue({
          'warehouse' : res
        });
      }
    });
  }

  completeTransaction() {
    try {

      const values = this.toteForm.value;

      let payLoad = {
        sRow: 1,
        eRow: 5,
        itemWhse: [
          values.itemNumber,
          // "238562",
          values.warehouse,
          "1=1"
        ],
        username: this.userData.userName,
        wsid: this.userData.wsid 
      };

      this.service
        .get(payLoad, '/Induction/CrossDock')
        .subscribe(
          (res: any) => {
            if (res.data && res.isExecuted) 
            {
              if(res.data.transaction.length > 0)
              {
                let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                  height: 'auto',
                  width: '560px',
                  autoFocus: '__non_existing_element__',
                  data: {
                    message: 'Cross Dock opportunity!  Click OK to view backorder transactions for the item you are putting away.',
                  },
                });

                dialogRef.afterClosed().subscribe((result) => {
                  if (result == 'Yes') {
                    this.openCrossDockTransactionDialogue();
                  }
                  else {
                    this.complete(values);
                  }
                });                
              }
              else 
              {
                this.complete(values);              
              }
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

  complete(values : any) {
    
    if (values.invMapID <= 0 || values.invMapID) {
      this.toast.error('You must select a location for this transaction before it can be processed.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }

    if (values.fifo && !values.expirationDate) {
      this.toast.error('This item is marked as FIFO with Expiration Date and its FIFO Date.You must provide an Expiration Date.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }

    if (values.warehouseSensitive && !values.warehouse) {
      this.toast.error('This item is warehouse sensitive and must be assigned a warehouse before process can continue.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }
    
    if (values.dateSensitive && !values.expirationDate) {
      this.toast.error('This item is date sensitive. You must provide an expiration date.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      return;
    }

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        message: 'Click OK to complete this transaction and assign it to the selected batch and tote.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {                                                              

        if (values.toteQty <= 0) {
          this.toast.error('Quantity should be greater 0', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        } else {

          var payload2 = {
            "otid": this.data.otid,
            "splitQty": 0, // (values.toteQty ? parseInt(values.toteQty) : 0) - (values.quantityAllocatedPutAway ? parseInt(values.quantityAllocatedPutAway) : 0),
            "qty": values.toteQty,
            "toteID": values.toteID,
            "batchID": this.data.batchID,
            "item": values.itemNumber,
            "uF1": values.userField1,
            "uF2": values.userField2,
            "lot": values.lotNumber,
            "ser": values.serialNumber,
            "totePos": values.totePos ? parseInt(values.totePos) : 0,
            "cell": values.cellSize,
            "warehouse": values.warehouse,
            "expDate": values.expirationDate,
            "revision": "",
            "zone": values.zone,
            "carousel": values.carousel,
            "row": values.row,
            "shelf": values.shelf,
            "bin": values.bin,
            "invMapID": values.invMapID,
            "locMaxQty": values.maximumQuantity ? parseInt(values.maximumQuantity) : 0,
            "reel": false,
            "dedicate": values.dedicated,
            "orderNumber": values.orderNumber,
            "username": this.userData.userName,
            wsid: this.userData.wsid 
          }
          
          this.service.create(payload2, '/Induction/TaskComplete').subscribe(
            (res: any) => {
              console.log(res)
              if (res.data && res.isExecuted) {
                this.dialogRef.close("Task Completed");
                this.toast.success(labels.alert.update, 'Success!',{
                  positionClass: 'toast-bottom-right',
                  timeOut:2000
                });            
              } else {
                this.toast.error('Something went wrong', 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000,
                });
              }
            },
            (error) => { }
          );
        }                      
      }
    });
  }
  onViewItemDetail(itemNum:any) { 
    this.router.navigate([]).then(() => {
      window.open(`/#/admin/inventoryMaster?itemNumber=${itemNum}`, '_blank');
    });
  }
  forSameSKU() {
    this.toteForm.patchValue({
      orderNumber                       : '',

      zone                              : '',
      carousel                          : '',
      row                               : '',
      shelf                             : '',
      bin                               : '',
      cellSize                          : '',
      velocityCode                      : '',
      itemQuantity                      : '',
      maximumQuantity                   : '',
      quantityAllocatedPutAway          : '',
    }); 
  }

}

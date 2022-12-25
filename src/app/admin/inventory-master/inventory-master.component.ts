import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/init/auth.service';
import { InventoryMasterService } from './inventory-master.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { ItemCategoryComponent } from '../dialogs/item-category/item-category.component';
import { ItemNumberComponent } from '../dialogs/item-number/item-number.component';
import { UnitMeasureComponent } from '../dialogs/unit-measure/unit-measure.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import labels from '../../labels/labels.json'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory-master',
  templateUrl: './inventory-master.component.html',
  styleUrls: ['./inventory-master.component.scss']
})
export class InventoryMasterComponent implements OnInit {
  public userData: any;
  public invData: any;
  public getInvMasterData: any;
  public locationTable: any;
  public getItemNum: any;
  public openCount: any;
  public histCount: any;
  public procCount: any;
  public totalQuantity: any;
  public totalPicks: any;
  public totalPuts: any;
  public wipCount: any;
  constructor(
    private invMasterService: InventoryMasterService, 
    private authService: AuthService, 
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    ) { }
  @ViewChild('quarantineAction') quarantineTemp: TemplateRef<any>;
  invMaster: FormGroup;

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getInventory();
    this.initialzeIMFeilds();
    
  }
  initialzeIMFeilds(){
    this.invMaster = this.fb.group({

      itemNumber: [ '', [Validators.required]],
      supplierItemID : [ '', [Validators.required]],
      description : [ '', [Validators.required]],
      reorderPoint : [ '', [Validators.required]],
      replenishmentPoint : [ '', [Validators.required]],
      category : [ '', [Validators.required]],
      reorderQuantity : [ '', [Validators.required]],
      replenishmentLevel : [ '', [Validators.required]],
      subCategory : [ '', [Validators.required]],
      unitOfMeasure : [ '', [Validators.required]],
      kanbanReplenishmentPoint : [ '', [Validators.required]],
      kanbanReplenishmentLevel : [ '', [Validators.required]],

      totalQuantity: [ '', [Validators.required]],
      wipCount: [ '', [Validators.required]],
      totalPicks: [ '', [Validators.required]],
      totalPuts: [ '', [Validators.required]],
      openCount: [ '', [Validators.required]],
      histCount: [ '', [Validators.required]],
      procCount: [ '', [Validators.required]],
      

      primaryPickZone: [ '', [Validators.required]],
      secondaryPickZone: [ '', [Validators.required]],
      caseQuantity: [ '', [Validators.required]],
      pickFenceQuantity: [ '', [Validators.required]],
      pickSequence: [ '', [Validators.required]],

      dateSensitive: [ '', [Validators.required]],
      warehouseSensitive: [ '', [Validators.required]],
      splitCase: [ '', [Validators.required]],
      active: [ '', [Validators.required]],
      fifo: [ '', [Validators.required]],
      fifoDate: [ '', [Validators.required]],

      bulkCellSize: [ '', [Validators.required]],
      cellSize: [ '', [Validators.required]],
      cfCellSize: [ '', [Validators.required]],

      bulkVelocity: [ '', [Validators.required]],
      cfVelocity: [ '', [Validators.required]],



      kitInventories: [ '', [Validators.required]],



      includeInAutoRTSUpdate: [ '', [Validators.required]],
      minimumRTSReelQuantity: [ '', [Validators.required]],

    

      scanCode: [ '', [Validators.required]],


      avgPieceWeight: [ '', [Validators.required]],
      sampleQuantity: [ '', [Validators.required]],
      minimumUseScaleQuantity: [ '', [Validators.required]],
      useScale: [ '', [Validators.required]],
 


      unitCost: [ '' || 0, [Validators.required]],
     // supplierItemID: [ '', [Validators.required]],
      manufacturer: [ '', [Validators.required]],
      specialFeatures: [ '', [Validators.required]],
    

      location:[''] //dummy

    });
  }
  onSubmit(form: FormGroup){
    console.log(form.value);
  }
  public getInventory() {
    let paylaod = {
      "itemNumber": "",
      "app": "",
      "newItem": false,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/GetInventory').subscribe((res: any) => {
      this.invData = res.data;
      this.getInvMasterDetail(res.data.firstItemNumber);
    });
  }

  public getInvMasterDetail(itemNum: any) {
    let paylaod = {
      "itemNumber": itemNum,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/GetInventoryMasterData').subscribe((res: any) => {
      this.getInvMasterData = res.data;
      this.totalQuantity = res.data.totalQuantity;
      this.wipCount   = res.data.wipCount;
      this.totalPicks = res.data.totalPicks;
      this.totalPuts  = res.data.totalPuts;
      this.openCount  = res.data.openCount;
      this.histCount  = res.data.histCount;
      this.procCount  = res.data.procCount;
      // this.invMaster.controls['itemNumber'].setValue('');

      this.invMaster.patchValue({
        'itemNumber' : this.getInvMasterData.itemNumber,
        'supplierItemID' : this.getInvMasterData.supplierItemID,
        'description' : this.getInvMasterData.description,
        'reorderPoint' : this.getInvMasterData.reorderPoint,
        'replenishmentPoint' : this.getInvMasterData.replenishmentPoint,
        'category': this.getInvMasterData.category,
        'reorderQuantity' : this.getInvMasterData.reorderQuantity,
        'replenishmentLevel' : this.getInvMasterData.replenishmentLevel,
        'subCategory': this.getInvMasterData.subCategory,
        'unitOfMeasure': this.getInvMasterData.unitOfMeasure,
        'kanbanReplenishmentPoint' : this.getInvMasterData.kanbanReplenishmentPoint,
        'kanbanReplenishmentLevel' : this.getInvMasterData.kanbanReplenishmentLevel        
      });

      console.log(this.getInvMasterData);
    })
  }


  public getLocationTable(stockCode: any) {
    let paylaod = {
      "stockCode": stockCode,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/GetLocationTable').subscribe((res: any) => {
      console.log(res.data);
      this.locationTable = res.data;
    })
  }
  public getItemNumber(itemNumber: any) {
    let paylaod = {
      "itemNumber": itemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/GetItemNumber').subscribe((res: any) => {
      console.log(res.data);
      this.getItemNum = res.data;
    })
  }
  public addNewItem(form: NgForm) {
    let paylaod = {
      "itemNumber": form.value.itemNumber,
      "description": form.value.description,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.create(paylaod, '/Admin/AddNewItem').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public updateInvMastOTQuarantine(form: NgForm) {
    let paylaod = {
      "itemNumber": form.value.itemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
      "append": true
    }
    this.invMasterService.create(paylaod, '/Admin/UpdateInventoryMasterOTQuarantine').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public updateInvMastOTUnQuarantine(form: NgForm) {
    let paylaod = {
      "itemNumber": form.value.itemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
      "append": true
    }
    this.invMasterService.create(paylaod, '/Admin/UpdateInventoryMasterOTUnQuarantine').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public deleteItemNum(itemNumber: any) {
    let paylaod = {
      "itemNumber": itemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
      "append": true
    }
    this.invMasterService.delete(paylaod, '/Admin/DeleteItem').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public refreshKits(itemNumber: any) {
    let paylaod = {
      "itemNumber": itemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.get(paylaod, '/Admin/RefreshKits').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public insertKit(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "kitItem": form.kitItem,
      "kitQuantity": form.kitQuantity,
      "specialFeatures": form.specialFeatures,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.create(paylaod, '/Admin/InsertKit').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public updateKit(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "oldKitItem": form.oldKitItem,
      "newKitItem": form.newKitItem,
      "kitQuantity": form.kitQuantity,
      "specialFeatures": form.specialFeatures,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.update(paylaod, '/Admin/UpdateKit').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public deleteKit(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "kitItem": form.kitItem,
      "kitQuantity": form.kitQuantity,
      "specialFeatures": form.specialFeatures,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.delete(paylaod, '/Admin/DeleteKit').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public getDescriptionByItem(itemNum: any) {
    let paylaod = {
      "itemNumber": itemNum,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.delete(paylaod, '/Admin/DeleteKit').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public refreshScanCodes(itemNum: any) {
    let paylaod = {
      "itemNumber": itemNum,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.get(paylaod, '/Admin/RefreshScanCodes').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public insertScanCodes(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "scanCode": form.scanCode,
      "scanType": form.scanType,
      "scanRange": form.scanRange,
      "startPosition": form.startPosition,
      "codeLength": form.codeLength,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.create(paylaod, '/Admin/InsertScanCodes').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public updateScanCodes(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "scanCode": form.scanCode,
      "scanType": form.scanType,
      "scanRange": form.scanRange,
      "oldStartPosition": form.oldStartPosition,
      "newStartPosition": form.newStartPosition,
      "oldCodeLength": form.oldCodeLength,
      "newCodeLength": form.newCodeLength,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.update(paylaod, '/Admin/UpdateScanCodes').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public deleteScanCode(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "scanCode": form.scanCode,
      "scanType": form.scanType,
      "scanRange": form.scanRange,
      "startPosition": form.startPosition,
      "codeLength": form.codeLength,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.delete(paylaod, '/Admin/DeleteScanCode').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public updateInventoryMaster(form: NgForm) {
    form.value.username = this.userData.userName;
    form.value.wsid = this.userData.wsid;
    this.invMasterService.update(form.value, '/Admin/UpdateInventoryMaster').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public updateReelQuantity(form: NgForm) {

    let paylaod = {
      "itemNumber": form.value.itemNumber,
      "minimumRTS": form.value.minimumRTS,
      "includeAutoRTS": true,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.update(paylaod, '/Admin/UpdateReelQuantity').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public updateReelAll(form: NgForm) {

    let paylaod = {
      "rtsAmount": form.value.rtsAmount,
      "rtsQuantity": form.value.rtsAmount,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.update(paylaod, '/Admin/UpdateReelAll').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public refreshRTS(itemNumber: any) {
    let paylaod = {
      "itemNumber": itemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.update(paylaod, '/Admin/RefreshRTS').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public validateKit(form: any) {
    let paylaod = {
      "kit": form.value.kit,
      "itemNumber": form.value.itemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.update(paylaod, '/Admin/ValidateKit').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public updateItemNumber(form: any) {
    let paylaod = {
      "oldItemNumber": form.oldItemNumber,
      "newItemNumber": form.newItemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.update(paylaod, '/Admin/UpdateItemNumber').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public previousItemNumber(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "filter": form.filter,
      "firstItem": form.firstItem,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.get(paylaod, '/Admin/PreviousItemNumber').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public nextItemNumber(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "filter": form.filter,
      "firstItem": form.firstItem,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.get(paylaod, '/Admin/NextItemNumber').subscribe((res: any) => {
      console.log(res.data);
    })
  }
  public getItemNumberCount(form: any) {
    let paylaod = {
      "itemNumber": form.itemNumber,
      "filter": form.filter,
      "firstItem": form.firstItem,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMasterService.get(paylaod, '/Admin/GetItemNumberCount').subscribe((res: any) => {
      console.log(res.data);
    })
  }

  public openAddItemDialog() {
    let dialogRef = this.dialog.open(ItemNumberComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        itemNumber: '',
        newItemNumber : '',
        addItem : true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const { itemNumber, desc } = result;
        let paylaod = {
          "itemNumber": itemNumber,
          "description": desc,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.invMasterService.create(paylaod, '/Admin/AddNewItem').subscribe((res: any) => {
          // console.log(res.data);
          if (res.isExecuted) {
            // this.invMaster.patchValue({
            //   'itemNumber' : res.data.newItemNumber
            // }); 
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          } else {
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      }

    });
  }







  deleteItem($event) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  quarantineDialog(): void {
    const dialogRef = this.dialog.open(this.quarantineTemp, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
  

}

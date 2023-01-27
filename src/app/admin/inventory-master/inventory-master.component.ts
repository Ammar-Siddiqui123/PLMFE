import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/init/auth.service';
import { InventoryMasterService } from './inventory-master.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { ItemCategoryComponent } from '../dialogs/item-category/item-category.component';
import { ItemNumberComponent } from '../dialogs/item-number/item-number.component';
import { UnitMeasureComponent } from '../dialogs/unit-measure/unit-measure.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import labels from '../../labels/labels.json'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-master',
  templateUrl: './inventory-master.component.html',
  styleUrls: ['./inventory-master.component.scss']
})
export class InventoryMasterComponent implements OnInit {

  public userData: any;
  public invData: any;
  public getInvMasterData: any;
  public invMasterLocations: any;
  public paginationData : {
    total : 0,
    position: 0,
    itemNumber: 0
  }
  public currentPageItemNo : any = '';
  searchList: any;
  searchValue: any = '';


  public locationTable: any;
  public getItemNum: any;
  public openCount: any;
  public histCount: any;
  public procCount: any;
  public totalQuantity: any;
  public totalPicks: any;
  public totalPuts: any;
  public wipCount: any;
  public append: any;
  constructor(
    private invMasterService: InventoryMasterService, 
    private authService: AuthService, 
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
   // public quarantineDialogRef: MatDialogRef<'quarantineAction'>,
    ) { }
  @ViewChild('quarantineAction') quarantineTemp: TemplateRef<any>;
  @ViewChild('UNquarantineAction') unquarantineTemp: TemplateRef<any>;
  @ViewChild('propertiesChanged') propertiesChanged: TemplateRef<any>;
  invMaster: FormGroup;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    alert();
  }


  ngOnInit(): void {

    this.userData = this.authService.userData();
    this.initialzeIMFeilds();
    this.getInventory();
    
  }

  initialzeIMFeilds(){
    this.invMaster = this.fb.group({

      itemNumber: [  this.getInvMasterData?.itemNumber || '', [Validators.required,  Validators.maxLength(50)]],
      supplierItemID : [  this.getInvMasterData?.supplierItemID || '', [ Validators.maxLength(50)]],
      description : [  this.getInvMasterData?.description || '', [ Validators.maxLength(255)]],
      reorderPoint : [  this.getInvMasterData?.reorderPoint || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      replenishmentPoint : [  this.getInvMasterData?.replenishmentPoint || 0, [ Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      category : [  this.getInvMasterData?.category || '', [ Validators.maxLength(50)]],
      reorderQuantity : [  this.getInvMasterData?.reorderQuantity ||  0, [ Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      replenishmentLevel : [  this.getInvMasterData?.replenishmentLevel || 0, [Validators.maxLength(9) , Validators.pattern("^[0-9]*$")]],
      subCategory : [  this.getInvMasterData?.subCategory || '', [Validators.maxLength(50)]],
      unitOfMeasure : [  this.getInvMasterData?.unitOfMeasure || '', [ Validators.maxLength(50)]],
      kanbanReplenishmentPoint : [  this.getInvMasterData?.kanbanReplenishmentPoint || 0, [  Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      kanbanReplenishmentLevel : [  this.getInvMasterData?.kanbanReplenishmentLevel || 0, [ Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],

      totalQuantity: [  this.getInvMasterData?.totalQuantity || 0, [Validators.required]],
      wipCount: [  this.getInvMasterData?.wipCount || 0, [Validators.required]],
      totalPicks: [  this.getInvMasterData?.totalPicks || 0, [Validators.required]],
      totalPuts: [  this.getInvMasterData?.totalPuts || 0, [Validators.required]],
      openCount: [  this.getInvMasterData?.openCount || 0, [Validators.required]],
      histCount: [  this.getInvMasterData?.histCount || 0, [Validators.required]],
      procCount: [  this.getInvMasterData?.procCount || 0, [Validators.required]],
      

      primaryPickZone: [  this.getInvMasterData?.primaryPickZone.toLowerCase() || ''],
      secondaryPickZone: [  this.getInvMasterData?.secondaryPickZone.toLowerCase() || ''],
      caseQuantity: [  this.getInvMasterData?.caseQuantity || 0, [ Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      pickFenceQuantity: [  this.getInvMasterData?.pickFenceQuantity || 0, [, Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      pickSequence: [  this.getInvMasterData?.pickSequence || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],

      dateSensitive: [  this.getInvMasterData?.dateSensitive || false],
      warehouseSensitive: [  this.getInvMasterData?.warehouseSensitive || false],
      splitCase: [  this.getInvMasterData?.splitCase || ''],
      active: [  this.getInvMasterData?.active || ''],
      fifo: [  this.getInvMasterData?.fifo || false],
      fifoDate: [  this.getInvMasterData?.fifoDate || ''],

      bulkCellSize: [  this.getInvMasterData?.bulkCellSize || "", [ Validators.maxLength(50)]],
      cellSize: [  this.getInvMasterData?.cellSize || "", [ Validators.maxLength(50)]],
      cfCellSize: [ this.getInvMasterData?.cfCellSize , [Validators.maxLength(50)]],

      goldenZone: [  this.getInvMasterData?.goldenZone || ""],
      bulkGoldZone: [  this.getInvMasterData?.bulkGoldZone || ""],
      CfGoldZone: [  this.getInvMasterData?.CfGoldZone || ""],
      
      bulkVelocity: [  this.getInvMasterData?.bulkVelocity ],
      cfVelocity: [  this.getInvMasterData?.cfVelocity ],

      minimumQuantity: [  this.getInvMasterData?.minimumQuantity || 0, [ Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      bulkMinimumQuantity: [  this.getInvMasterData?.bulkMinimumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      cfMinimumQuantity: [  this.getInvMasterData?.cfMinimumQuantity || 0, [ Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],

      maximumQuantity: [  this.getInvMasterData?.maximumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      bulkMaximumQuantity: [  this.getInvMasterData?.bulkMaximumQuantity || 0, [ Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      cfMaximumQuantity: [ this.getInvMasterData?.cfMaximumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],

      kitInventories: [  this.getInvMasterData?.kitInventories || '', [Validators.required]],



      includeInAutoRTSUpdate: [  this.getInvMasterData?.includeInAutoRTSUpdate || false, [Validators.required]],
      minimumRTSReelQuantity: [  this.getInvMasterData?.minimumRTSReelQuantity || 0, [Validators.required]],

    

      scanCode: [  this.getInvMasterData?.scanCode || '', [Validators.required]],


      avgPieceWeight: [  this.getInvMasterData?.avgPieceWeight || 0, [Validators.required, Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      sampleQuantity: [  this.getInvMasterData?.sampleQuantity || "0", [Validators.required, Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      minimumUseScaleQuantity: [  this.getInvMasterData?.minimumUseScaleQuantity || 0, [Validators.required, Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      useScale: [  this.getInvMasterData?.useScale || 0, [Validators.required]],
 


      unitCost: [ this.getInvMasterData?.unitCost  || 0, [Validators.required, Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
     // supplierItemID: [ '', [Validators.required]],
      manufacturer: [  this.getInvMasterData?.manufacturer || '', [Validators.required,  Validators.maxLength(11)]],
      specialFeatures: [  this.getInvMasterData?.specialFeatures || '', [Validators.required]],
    

      inventoryTable: [  this.invMasterLocations?.inventoryTable || '', [Validators.required]],
      count: [  this.invMasterLocations?.count || '', [Validators.required]],


      wsid: [  this.userData?.wsid || '', [Validators.required]],
      username: [  this.userData?.userName || '' , [Validators.required]],

      itemQuarantined:  [  this.getInvMasterData?.itemQuarantined || '', [Validators.required]],


      supplierName: ['']
    });


  }
  onSubmit(form: FormGroup){
    console.log(form.value);
  }
  public getInventory() {
    let paylaod = {
      "itemNumber": this.currentPageItemNo,
      "app": "",
      "newItem": false,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/GetInventory').subscribe((res: any) => {
      
      if(this.currentPageItemNo == ''){
        this.currentPageItemNo = res.data.firstItemNumber;
      }
      this.searchValue = this.currentPageItemNo;
      this.paginationData ={
        total: res.data.filterCount.total,
        position: res.data.filterCount.pos,
        itemNumber: res.data.filterCount.itemNumber,
      }

      this.getInvMasterDetail(this.currentPageItemNo);
      this.getInvMasterLocations(this.currentPageItemNo);
     //this.getInvMasterDetail('024768000010');
     //this.getInvMasterLocations('024768000010');
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
      // console.log(this.getInvMasterData);
      
      this.initialzeIMFeilds();
    })
  }

  private getChangedProperties(): string[] {
    let changedProperties:any = [];
  
    Object.keys(this.invMaster.controls).forEach((name) => {
      const currentControl = this.invMaster.controls[name];
  
      if (currentControl.dirty) {
        changedProperties.push(name);
      }
    });
  
    return changedProperties;
  }

  public getInvMasterLocations(itemNum: any , pageSize?, startIndex?, sortingColumnName?, sortingOrder?) {
    let paylaod = {
      "draw": 0,
      "itemNumber": itemNum,
      "start":  startIndex? startIndex: 0,
      "length": pageSize? pageSize : 5,
      "sortColumnNumber": sortingColumnName? sortingColumnName : 0,
      "sortOrder":  sortingOrder? sortingOrder : "asc",
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/GetInventoryMasterLocation').subscribe((res: any) => {
      this.invMasterLocations = res.data;

      console.log(this.getInvMasterData);

      this.initialzeIMFeilds();
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

  nextPage(){

    if(this.paginationData.position >= 1 && this.paginationData.position <= this.paginationData.total){
    let paylaod = {
      "itemNumber": this.currentPageItemNo,
      "filter": "1=1",
      "firstItem": 1,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/NextItemNumber').subscribe((res: any) => {
      this.currentPageItemNo = res.data;
      this.searchValue = this.currentPageItemNo;
      this.getInventory();
    })
  }

  }
  prevPage(){
    console.log(this.getChangedProperties());
    
    // const dialogRef = this.dialog.open(this.propertiesChanged, {
    //   width: '450px',
    //   autoFocus: '__non_existing_element__',
    // });
    this.searchValue = this.currentPageItemNo;
    if(this.paginationData.position >= 1 && this.paginationData.position <= this.paginationData.total){
      let paylaod = {
        "itemNumber": this.currentPageItemNo,
        "filter": "1=1",
        "firstItem": 1,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      this.invMasterService.get(paylaod, '/Admin/PreviousItemNumber').subscribe((res: any) => {
        this.currentPageItemNo = res.data;
        this.searchValue = this.currentPageItemNo;
        this.getInventory();
      })
    }

  }

  public updateInventoryMaster() {

    
    console.log(this.invMaster.value);
    
    this.invMasterService.update(this.invMaster.value, '/Admin/UpdateInventoryMaster').subscribe((res: any) => {
      if(res.isExecuted){
        this.getInventory();
        this.toastr.success(labels.alert.update, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      } else{
        this.toastr.error(res.responseMessage, 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    })
  }

  // public getItemNumber(itemNumber: any) {
  //   let paylaod = {
  //     "itemNumber": itemNumber,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid,
  //   }
  //   this.invMasterService.get(paylaod, '/Admin/GetItemNumber').subscribe((res: any) => {
  //     console.log(res.data);
  //     this.getItemNum = res.data;
  //   })
  // }
  // public addNewItem(form: NgForm) {
  //   let paylaod = {
  //     "itemNumber": form.value.itemNumber,
  //     "description": form.value.description,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid,
  //   }
  //   this.invMasterService.create(paylaod, '/Admin/AddNewItem').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }

  // public updateInvMastOTQuarantine(form: NgForm) {
  //   let paylaod = {
  //     "itemNumber": form.value.itemNumber,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid,
  //     "append": true
  //   }
  //   this.invMasterService.create(paylaod, '/Admin/UpdateInventoryMasterOTQuarantine').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public updateInvMastOTUnQuarantine(form: NgForm) {
  //   let paylaod = {
  //     "itemNumber": form.value.itemNumber,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid,
  //     "append": true
  //   }
  //   this.invMasterService.create(paylaod, '/Admin/UpdateInventoryMasterOTUnQuarantine').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public deleteItemNum(itemNumber: any) {
  //   let paylaod = {
  //     "itemNumber": itemNumber,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid,
  //     "append": true
  //   }
  //   this.invMasterService.delete(paylaod, '/Admin/DeleteItem').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public refreshKits(itemNumber: any) {
  //   let paylaod = {
  //     "itemNumber": itemNumber,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.get(paylaod, '/Admin/RefreshKits').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public insertKit(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "kitItem": form.kitItem,
  //     "kitQuantity": form.kitQuantity,
  //     "specialFeatures": form.specialFeatures,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.create(paylaod, '/Admin/InsertKit').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public updateKit(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "oldKitItem": form.oldKitItem,
  //     "newKitItem": form.newKitItem,
  //     "kitQuantity": form.kitQuantity,
  //     "specialFeatures": form.specialFeatures,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.update(paylaod, '/Admin/UpdateKit').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public deleteKit(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "kitItem": form.kitItem,
  //     "kitQuantity": form.kitQuantity,
  //     "specialFeatures": form.specialFeatures,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.delete(paylaod, '/Admin/DeleteKit').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public getDescriptionByItem(itemNum: any) {
  //   let paylaod = {
  //     "itemNumber": itemNum,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.delete(paylaod, '/Admin/DeleteKit').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public refreshScanCodes(itemNum: any) {
  //   let paylaod = {
  //     "itemNumber": itemNum,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.get(paylaod, '/Admin/RefreshScanCodes').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public insertScanCodes(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "scanCode": form.scanCode,
  //     "scanType": form.scanType,
  //     "scanRange": form.scanRange,
  //     "startPosition": form.startPosition,
  //     "codeLength": form.codeLength,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.create(paylaod, '/Admin/InsertScanCodes').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public updateScanCodes(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "scanCode": form.scanCode,
  //     "scanType": form.scanType,
  //     "scanRange": form.scanRange,
  //     "oldStartPosition": form.oldStartPosition,
  //     "newStartPosition": form.newStartPosition,
  //     "oldCodeLength": form.oldCodeLength,
  //     "newCodeLength": form.newCodeLength,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.update(paylaod, '/Admin/UpdateScanCodes').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public deleteScanCode(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "scanCode": form.scanCode,
  //     "scanType": form.scanType,
  //     "scanRange": form.scanRange,
  //     "startPosition": form.startPosition,
  //     "codeLength": form.codeLength,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.delete(paylaod, '/Admin/DeleteScanCode').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public updateInventoryMaster(form: NgForm) {
  //   form.value.username = this.userData.userName;
  //   form.value.wsid = this.userData.wsid;
  //   this.invMasterService.update(form.value, '/Admin/UpdateInventoryMaster').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public updateReelQuantity(form: NgForm) {

  //   let paylaod = {
  //     "itemNumber": form.value.itemNumber,
  //     "minimumRTS": form.value.minimumRTS,
  //     "includeAutoRTS": true,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.update(paylaod, '/Admin/UpdateReelQuantity').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public updateReelAll(form: NgForm) {

  //   let paylaod = {
  //     "rtsAmount": form.value.rtsAmount,
  //     "rtsQuantity": form.value.rtsAmount,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.update(paylaod, '/Admin/UpdateReelAll').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public refreshRTS(itemNumber: any) {
  //   let paylaod = {
  //     "itemNumber": itemNumber,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.update(paylaod, '/Admin/RefreshRTS').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public validateKit(form: any) {
  //   let paylaod = {
  //     "kit": form.value.kit,
  //     "itemNumber": form.value.itemNumber,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.update(paylaod, '/Admin/ValidateKit').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
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
  // public previousItemNumber(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "filter": form.filter,
  //     "firstItem": form.firstItem,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.get(paylaod, '/Admin/PreviousItemNumber').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public nextItemNumber(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "filter": form.filter,
  //     "firstItem": form.firstItem,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.get(paylaod, '/Admin/NextItemNumber').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }
  // public getItemNumberCount(form: any) {
  //   let paylaod = {
  //     "itemNumber": form.itemNumber,
  //     "filter": form.filter,
  //     "firstItem": form.firstItem,
  //     "username": this.userData.userName,
  //     "wsid": this.userData.wsid
  //   }
  //   this.invMasterService.get(paylaod, '/Admin/GetItemNumberCount').subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  // }

  public openAddItemDialog() {
    let dialogRef = this.dialog.open(ItemNumberComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        itemNumber: this.currentPageItemNo,
        description: this.getInvMasterData.description,
        newItemNumber : '',
        addItem : true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.itemNumber) {
        const { itemNumber, description } = result;
        let paylaod = {
          "itemNumber": itemNumber,
          "description": description,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.invMasterService.create(paylaod, '/Admin/AddNewItem').subscribe((res: any) => {
          if (res.isExecuted && res.data) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.currentPageItemNo = itemNumber;
            this.getInventory();
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      } else {
        // this.toastr.error('Enter Valid Item Number', 'Error!', {
        //   positionClass: 'toast-bottom-right',
        //   timeOut: 2000
        // });
      }

    });
  }

  deleteItem($event) {
    let itemToDelete = this.currentPageItemNo

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res=='Yes'){

        let paylaodNextItemNumber = {
          "itemNumber": this.currentPageItemNo,
          "filter": "1=1",
          "firstItem": 1,
          "username": this.userData.userName,
          "wsid": this.userData.wsid,
        }
        this.invMasterService.get(paylaodNextItemNumber, '/Admin/NextItemNumber').subscribe((res: any) => {
          this.currentPageItemNo = res.data;
          this.searchValue = this.currentPageItemNo;
          //this.getInventory();
        })

        let paylaod = {
          "itemNumber": itemToDelete,
          "append": true,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.invMasterService.delete(paylaod, '/Admin/DeleteItem').subscribe((res: any) => {
          if(res.isExecuted){
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.getInventory();
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      }
    });
  }

  quarantineDialog(): void {
    const dialogRef = this.dialog.open(this.quarantineTemp, {
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((x) => {
      if(x){
        let paylaod = {
          "itemNumber": this.currentPageItemNo,
          "append": true,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.invMasterService.get(paylaod, '/Admin/UpdateInventoryMasterOTQuarantine').subscribe((res: any) => {
          if(res.isExecuted){
            this.toastr.success(res.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.getInventory();
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
    }
  })
  }

  checkCheckBoxvalue(event){
    this.append = event.checked;
  }

  unquarantineDialog(): void {
    const dialogRef = this.dialog.open(this.unquarantineTemp, {
      width: '450px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((x) => {
      if(x){
        let paylaod = {
          "itemNumber": this.currentPageItemNo,
          "append": this.append,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.invMasterService.get(paylaod, '/Admin/UpdateInventoryMasterOTUnQuarantine').subscribe((res: any) => {
          if(res.isExecuted){
            this.toastr.success(res.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.getInventory();
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
    }
  })
  }


  viewLocations(){
    this.router.navigate(['/admin/inventoryMap'], { state: {colHeader: 'itemNumber', colDef: 'Item Number', searchValue: this.currentPageItemNo}})
  }

  getSearchList(e: any) {
    
    this.searchValue = e.currentTarget.value;
    console.log(e.currentTarget.value)
    let paylaod = {
      "stockCode": e.currentTarget.value,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/GetLocationTable').subscribe((res: any) => {
      if(res.data){
        this.searchList = res.data
      }
    });
  }

  onSearchSelect(e: any){
    this.searchValue = e.option.value;
    this.currentPageItemNo = e.option.value;
    this.getInventory();
    // this.getInvMasterDetail(e.option.value);
    // this.getInvMasterLocations(e.option.value);
  }

  clearSearchField(){

    this.searchValue = '';
  }
  getNotification(e: any ){
    
    if(e?.newItemNumber){
      this.currentPageItemNo = e.newItemNumber;
      this.getInventory();
    } else if(e?.refreshLocationGrid){
      this.getInvMasterLocations(this.currentPageItemNo);
    } else if(e?.locationPageSize && e?.startIndex){
      this.getInvMasterLocations(this.currentPageItemNo, e.locationPageSize, e.startIndex);
    } else if(e?.sortingColumn){
      this.getInvMasterLocations(this.currentPageItemNo, '', '', e.sortingColumn, e.sortingSeq );
    }else {
      this.getInventory();
    }

  }



}

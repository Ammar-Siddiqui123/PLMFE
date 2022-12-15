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


  public openItemNumDialog() {
    let dialogRef = this.dialog.open(ItemNumberComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }

  public opencategoryDialog() {
    let dialogRef = this.dialog.open(ItemCategoryComponent, {
      height: 'auto',
      width: '750px',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }

  public openUmDialog() {
    let dialogRef = this.dialog.open(UnitMeasureComponent, {
      height: 'auto',
      width: '750px',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }

  quarantineDialog(): void {
    const dialogRef = this.dialog.open(this.quarantineTemp, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
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
}

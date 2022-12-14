import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellSizeComponent } from '../cell-size/cell-size.component';
import { VelocityCodeComponent } from '../velocity-code/velocity-code.component';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { InvMapLocationService } from './inv-map-location.service';
import { ToastrService } from 'ngx-toastr';
import { ConditionalExpr } from '@angular/compiler';

export interface  InventoryMapDataStructure   {
  invMapID : string |  '',
  locationID :  string |  '',
  location :  string |  '',
  warehouse :  string |  '',
  zone:  string |  '',
  carousel :  string |  '',
  row :  string |  '',
  shelf :  string |  '',
  bin :  string |  '',
  itemNumber :  string |  '',
  revision:  string |  '',
  serialNumber: string |   '',
  lotNumber:  string |  '',
  expirationDate : string |   '',
  description :  string |   '',
  itemQuantity :  string |   '',
  unitOfMeasure:  string |  '',
  maximumQuantity: string |   '',
  cellSize:  string |  '',
  goldenZone:  string |  '',
  putAwayDate:  string |  '',
  userField1:  string |  '',
  userField2:  string |  '',
  masterLocation:  string |  '',
  dateSensitive:  boolean |  '',
  dedicated:  string |  '',
  masterInvMapID:  string |  '',
  minQuantity:  string |   '',
  quantityAllocatedPick:  string |  '',
  quantityAllocatedPutAway:  string |  '',
  laserX:  string |  '',
  laserY:  string |  '',
  locationNumber:  string |  '',
  rn :  string |  '',

  velocity:  string |   '' //additional field
}

@Component({
  selector: 'app-add-inv-map-location',
  templateUrl: './add-inv-map-location.component.html',
  styleUrls: ['./add-inv-map-location.component.scss']
})
export class AddInvMapLocationComponent implements OnInit {
  addInvMapLocation: FormGroup;
  locZoneList: any[] = [];
  itemNumberList: any[] = [];
  zoneList: any[] = [];
  filteredOptions: Observable<any[]>;
  filteredItemNum: Observable<any[]>;

  getDetailInventoryMapData  :    InventoryMapDataStructure = {
    invMapID : '',
    locationID :   '',
    location :   '',
    warehouse :   '',
    zone:   '',
    carousel :   '',
    row :   '',
    shelf :   '',
    bin :   '',
    itemNumber :   '',
    revision:   '',
    serialNumber:   '',
    lotNumber:   '',
    expirationDate :   '',
    description :    '',
    itemQuantity :    '',
    unitOfMeasure:   '',
    maximumQuantity:   '',
    cellSize:   '',
    goldenZone:   '',
    putAwayDate:   '',
    userField1:   '',
    userField2:   '',
    masterLocation:   '',
    dateSensitive:   false,
    dedicated:   '',
    masterInvMapID:   '',
    minQuantity:    '',
    quantityAllocatedPick:   '',
    quantityAllocatedPutAway:   '',
    laserX:   '',
    laserY:   '',
    locationNumber:   '',
    rn :   '',
  
    velocity:    '' //additional field
  } ;

 

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private invMapService: InvMapLocationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    if(this.data.detailData){
      this.getDetailInventoryMapData = this.data.detailData;
      this.initializeDataSet();
    } else {
      this.initializeDataSet();
    }
   this.itemNumberList = this.data.itemList;
   
   console.log(this.getDetailInventoryMapData)
    this.invMapService.getLocZTypeInvMap().subscribe((res) => {
      this.locZoneList = res.data;
      this.filteredOptions = this.addInvMapLocation.controls['location'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
      this.filteredItemNum = this.addInvMapLocation.controls['itemNumber'].valueChanges.pipe(
        startWith(''),
        map(value => this._filterItemNum(value || '')),
      );
      console.log(this.filteredItemNum)
    });

  }

  initializeDataSet(){
    this.addInvMapLocation = this.fb.group({
      location: [ this.getDetailInventoryMapData.location || '', [Validators.required]],
      zone: [this.getDetailInventoryMapData.zone || '', [Validators.required]],
      carousel: [this.getDetailInventoryMapData.carousel|| '', [Validators.required]],
      row: [this.getDetailInventoryMapData.row  || '', [Validators.required]],
      shelf: [this.getDetailInventoryMapData.shelf|| '', [Validators.required]],
      bin: [this.getDetailInventoryMapData.bin || '', [Validators.required]],
      itemNumber:  [this.getDetailInventoryMapData.itemNumber || ''],
      itemQuantity:  [this.getDetailInventoryMapData.itemQuantity || ''],
      description:  [this.getDetailInventoryMapData.description || ''],
      cell:[ this.getDetailInventoryMapData.cellSize || '', [Validators.required]],
      velocity: [this.getDetailInventoryMapData.velocity || '', [Validators.required]],
      maximumQuantity:  [this.getDetailInventoryMapData.maximumQuantity || ''],
      dedicated:  [this.getDetailInventoryMapData.dedicated || ''],
      //serialNumber: new FormControl(''),
     // lotNumber: new FormControl(''),
    //  expirationDate: new FormControl(''),
      unitOfMeasure:  [this.getDetailInventoryMapData.unitOfMeasure || ''],
      quantityAllocatedPick:  [this.getDetailInventoryMapData.quantityAllocatedPick || ''],
      quantityAllocatedPutAway:  [this.getDetailInventoryMapData.quantityAllocatedPutAway || ''],
      //putAwayDate: new FormControl(''),
      warehouse: [this.getDetailInventoryMapData.warehouse || '', [Validators.required]],
     // revision: new FormControl(''),
      invMapID:  [this.getDetailInventoryMapData.invMapID || ''],
      userField1:  [this.getDetailInventoryMapData.userField1 || ''],
      userField2:  [this.getDetailInventoryMapData.userField2 || ''],
      masterLocation:  [this.getDetailInventoryMapData.masterLocation || ''],
      dateSensitive: [this.getDetailInventoryMapData.dateSensitive || false],
      masterInvMapID:  [this.getDetailInventoryMapData.masterInvMapID || ''],
      minQuantity:  [this.getDetailInventoryMapData.minQuantity || ''],
      laserX: [this.getDetailInventoryMapData.laserX || '', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(13)]],
      laserY: [this.getDetailInventoryMapData.laserY || '', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(13)]],
      locationNumber: [this.getDetailInventoryMapData.locationNumber || ''],
      locationID:  [this.getDetailInventoryMapData.locationID || '']

      //velocity
    });
  }

  onSubmit(form: FormGroup) {
    
    console.log('create',form);
    if(this.data.detailData){
      this.invMapService.updateInventoryMap(form.value).subscribe((res) => {
        if(res.isExecuted){
          this.toastr.success(res.responseMessage, 'Success!',{
            positionClass: 'toast-bottom-right',
            timeOut:2000
         });
          console.log(res.responseMessage)
          this.dialog.closeAll()
        }
      });
    } else{
      this.invMapService.createInventoryMap(form.value).subscribe((res) => {
        if(res.isExecuted){
          this.toastr.success(res.responseMessage, 'Success!',{
            positionClass: 'toast-bottom-right',
            timeOut:2000
         });
          console.log(res.responseMessage)
          this.dialog.closeAll()
        }
      });
    }

  }

  get f() {
    return this.addInvMapLocation.controls;
  }
  hasError(fieldName: string, errorName: string) {
    return this.addInvMapLocation.get(fieldName)?.touched && this.addInvMapLocation.get(fieldName)?.hasError(errorName);
  }
  isValid() {
    return this.addInvMapLocation.valid;
  }

  loadWarehouse() {
    let dialogRef = this.dialog.open(WarehouseComponent, {
      height: '600px',
      width: '600px',
      data: {
        mode: 'addlocation',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.addInvMapLocation.controls['warehouse'].setValue(result);
    })
  }
  loadCellSize() {
    
    let dialogRef = this.dialog.open(CellSizeComponent, {
      height: '600px',
      width: '600px',
      data: {
        mode: 'cell-size',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      
      this.addInvMapLocation.controls['cell'].setValue(result);
    })
  }
  loadVelocityCode() {
    let dialogRef = this.dialog.open(VelocityCodeComponent, {
      height: '600px',
      width: '600px',
      data: {
        mode: 'cell-size',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.addInvMapLocation.controls['velocity'].setValue(result);
    })
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.locZoneList.filter(option => option.locationName.toLowerCase().includes(filterValue));
  }
  private _filterItemNum(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.itemNumberList.filter(option => option.itemNumber.toLowerCase().includes(filterValue));
  }
  loadZones(zone: any) {
    this.zoneList = this.locZoneList.filter(option => option.locationName.includes(zone.option.value));
    this.addInvMapLocation.controls['zone'].setValue(this.zoneList[0].zone);
    console.log(this.zoneList);
  }
  loadItemDetails(item:any){
      // console.log(item.option.value,this.addInvMapLocation.get('zone')?.value);
      let payload = {
        "itemNumber": item.option.value,
        "zone": this.addInvMapLocation.get('zone')?.value
      }
      this.invMapService.getItemNumDetail(payload).subscribe((res) => {
        console.log(res);
        this.addInvMapLocation.controls['description'].setValue(res.data.description);
        this.addInvMapLocation.controls['description'].setValue(res.data.maximumQuantity);
      });
  }



}

import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { AuthService } from '../../../../app/init/auth.service';

export interface InventoryMapDataStructure {
  invMapID: string | '',
  locationID: string | '',
  location: string | '',
  warehouse: string | '',
  zone: string | '',
  carousel: string | '',
  row: string | '',
  shelf: string | '',
  bin: string | '',
  itemNumber: string | '',
  revision: string | '',
  serialNumber: string | '',
  lotNumber: string | '',
  expirationDate: string | '',
  description: string | '',
  itemQuantity: string | '',
  unitOfMeasure: string | '',
  maxQuantity: string | '',
  cellSize: string | '',
  goldenZone: string | '',
  putAwayDate: string | '',
  userField1: string | '',
  userField2: string | '',
  masterLocation: string | '',
  dateSensitive: boolean | '',
  dedicated: string | '',
  masterInvMapID: string | '',
  minQuantity: string | '',
  quantityAllocatedPick: string | '',
  quantityAllocatedPutAway: string | '',
  laserX: string | '',
  laserY: string | '',
  locationNumber: string | '',
  rn: string | '',
  velocity: string | '' //additional field,
  altLight: string | ''
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
  itemDescription: any;
  autoFillLocNumber: any = '';
  zone = '';
  carousel = '';
  row = '';
  shelf = '';
  bin = '';
  setStorage;
  routeFromIM:boolean=false;


  getDetailInventoryMapData: InventoryMapDataStructure = {
    invMapID: '',
    locationID: '',
    location: '',
    warehouse: '',
    zone: '',
    carousel: '',
    row: '',
    shelf: '',
    bin: '',
    itemNumber: '',
    revision: '',
    serialNumber: '',
    lotNumber: '',
    expirationDate: '',
    description: '',
    itemQuantity: '',
    unitOfMeasure: '',
    maxQuantity: '',
    cellSize: '',
    goldenZone: '',
    putAwayDate: '',
    userField1: '',
    userField2: '',
    masterLocation: '',
    dateSensitive: false,
    dedicated: '',
    masterInvMapID: '',
    minQuantity: '',
    quantityAllocatedPick: '',
    quantityAllocatedPutAway: '',
    laserX: '',
    laserY: '',
    locationNumber: '',
    rn: '',
    altLight: '',
    velocity: '' //additional field
  };


  clickSubmit: boolean = true;
  headerLable: any;
  userData: any;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private invMapService: InvMapLocationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<any>
  ) {
    if (data.mode == "addInvMapLocation") {
      this.headerLable = 'Add Location';
    } else if (data.mode == "editInvMapLocation") {
      this.headerLable = 'Update Location';
    }

  }

  ngOnInit(): void {
    console.log(this.data);

    this.userData = this.authService.userData();
    if (this.data.detailData) {
      this.getDetailInventoryMapData = this.data.detailData;
      this.zone = this.getDetailInventoryMapData.zone
      this.carousel = this.getDetailInventoryMapData.carousel
      this.row = this.getDetailInventoryMapData.row
      this.shelf = this.getDetailInventoryMapData.shelf
      this.bin = this.getDetailInventoryMapData.bin
      this.itemDescription = this.getDetailInventoryMapData.description
      // console.log(this.getDetailInventoryMapData.masterInventoryMapID);

      this.updateItemNumber();
      this.initializeDataSet();
    } else {
      this.initializeDataSet();
    }
    // console.log(this.data.itemList);

    //  this.itemNumberList = this.data.itemList;

    this.invMapService.getLocZTypeInvMap().subscribe((res) => {
      this.locZoneList = res.data;
      console.log("ZONES===>");
      console.log(res.data);
      this.filteredOptions = this.addInvMapLocation.controls['location'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
      // this.filteredItemNum = this.addInvMapLocation.controls['item'].valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filterItemNum(value || '')),
      // );

    });


    this.setStorage =localStorage.getItem('routeFromInduction')
    this.routeFromIM=JSON.parse(this.setStorage)

  }

  clearFields()
  {
    this.addInvMapLocation.patchValue({
      'userField1':'',
      'userField2':'',
      'item':'',
      'maxQuantity':'',
      'minQuantity':'',
      'putAwayDate':'',
      'serialNumber':'',
      'lotNumber':'',
      'revision':'',
      'expirationDate':''
    });
    this.itemDescription = "";
  }

  searchItemNumber(itemNum: any) {
    let payload = {
      "itemNumber": itemNum.value.toString(),
      "beginItem": "---",
      "isEqual": false,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.invMapService.getSearchedItem(payload).subscribe(res => {
      if (res.data.length > 0) {
        this.itemNumberList = res.data;
      }
      else {
        this.addInvMapLocation.controls['item'].setValue('');
        this.itemNumberList = []
      }
    });
  }

  initializeDataSet() {
    this.addInvMapLocation = this.fb.group({
      location: [this.getDetailInventoryMapData.location || '', [Validators.required]],
      zone: [this.getDetailInventoryMapData.zone || '', [Validators.required, Validators.maxLength(2)]],
      carousel: [this.getDetailInventoryMapData.carousel || '', [Validators.pattern("^[0-9]*$"), Validators.maxLength(1)]],
      row: [this.getDetailInventoryMapData.row || '', [Validators.maxLength(5)]],
      shelf: [this.getDetailInventoryMapData.shelf || '', [Validators.maxLength(2)]],
      bin: [this.getDetailInventoryMapData.bin || '', [Validators.maxLength(3)]],
      item: [this.getDetailInventoryMapData.itemNumber || '', [Validators.maxLength(50)]],
      itemQuantity: [this.getDetailInventoryMapData.itemQuantity || ''],
      description: [this.getDetailInventoryMapData.description || ''],
      cell: [this.getDetailInventoryMapData.cellSize || '0'],
      velocity: [this.getDetailInventoryMapData.goldenZone || '0'],
      maxQuantity: [this.getDetailInventoryMapData.maxQuantity || 0, [Validators.maxLength(9)]],
      dedicated: [this.getDetailInventoryMapData.dedicated || ''],
      serialNumber: new FormControl({ value: this.getDetailInventoryMapData.serialNumber || 0, disabled: true }),
      lotNumber: new FormControl({ value: this.getDetailInventoryMapData.lotNumber || 0, disabled: true }),
      expirationDate: new FormControl({ value: this.getDetailInventoryMapData.expirationDate || '', disabled: true }),
      unitOfMeasure: [this.getDetailInventoryMapData.unitOfMeasure || ''],
      quantityAllocatedPick: new FormControl({ value: this.getDetailInventoryMapData.quantityAllocatedPick || 0, disabled: true }),
      quantityAllocatedPutAway: new FormControl({ value: this.getDetailInventoryMapData.quantityAllocatedPutAway || 0, disabled: true }),
      putAwayDate: new FormControl({ value: this.getDetailInventoryMapData.putAwayDate || '', disabled: true }),
      warehouse: [this.getDetailInventoryMapData.warehouse || ''],
      revision: new FormControl({ value: this.getDetailInventoryMapData.revision || '', disabled: true }),
      inventoryMapID: new FormControl({ value: this.getDetailInventoryMapData.invMapID || '', disabled: false }),
      userField1: [this.getDetailInventoryMapData.userField1 || '', [Validators.maxLength(255)]],
      userField2: [this.getDetailInventoryMapData.userField2 || '', [Validators.maxLength(255)]],
      masterLocation: [this.getDetailInventoryMapData.masterLocation || false],
      dateSensitive: [this.getDetailInventoryMapData.dateSensitive || false],
      masterInventoryMapID: new FormControl({ value: this.getDetailInventoryMapData.masterInvMapID || '', disabled: false }),
      minQuantity: [this.getDetailInventoryMapData.minQuantity || 0, [Validators.maxLength(9)]],
      laserX: [this.getDetailInventoryMapData.laserX || 0, [Validators.pattern("^[0-9]*$"), Validators.maxLength(9)]],
      laserY: [this.getDetailInventoryMapData.laserY || 0, [Validators.pattern("^[0-9]*$"), Validators.maxLength(9)]],
      locationNumber: [this.getDetailInventoryMapData.locationNumber || '',],
      locationID: [this.getDetailInventoryMapData.locationID || ''],
      altLight: [this.getDetailInventoryMapData.altLight || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]]

      //velocity
    });
  }

  onMinChange($event) {
    var max = this.addInvMapLocation.get("maxQuantity")?.value;
    var min = this.addInvMapLocation.get("minQuantity")?.value;
    if (max == "" || max == "0") {
      this.addInvMapLocation.get("minQuantity")?.setValue("0");
    }
    if (min > max) {
      this.addInvMapLocation.get("minQuantity")?.setValue(this.addInvMapLocation.get("maxQuantity")?.value.toString().charAt(0));
    }
  }

  onMaxChange($event) {
    this.addInvMapLocation.get("minQuantity")?.setValue("0");
  }

  onchangeItemNumber() {
    let value = this.addInvMapLocation.controls['zone'].value + this.addInvMapLocation.controls['carousel'].value + this.addInvMapLocation.controls['row'].value + this.addInvMapLocation.controls['shelf'].value + this.addInvMapLocation.controls['bin'].value;
    this.addInvMapLocation.controls['locationNumber'].setValue(value);
  }
  onSubmit(form: FormGroup) {

    console.log(form.value);

    this.invMapService.getItemNumDetail({"itemNumber":form.value.item,"zone":form.value.zone}).subscribe((res) => {
      this.clickSubmit = true;

      console.log(res.data.velocityCode);
      console.log(res.data.cellSize);

      if (res.isExecuted) {

        var match = '';
        var expected='';
        if (form.value.cell != res.data.cellSize && res.data.cellSize) {
        match += 'Cell Size';
        expected+=' Expecting Cell Size: ' + res.data.cellSize;
        };
        if (form.value.velocity != res.data.velocityCode && res.data.velocityCode) {
        if (match != '') { match += ', Velocity Code'; expected+=' and Velocity Code: ' + res.data.velocityCode } else { match += 'Velocity Code'; expected+='Velocity Code: ' + res.data.velocityCode };
        };
        if (match != '') 
        {
        this.toastr.error('Provided ' + match + ' do not match Inventory Master.'+expected+' for specified Item and Zone', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
        }
        else 
        {
    if (this.clickSubmit) {
      if (this.data.detailData) {
        this.clickSubmit = false;
        this.invMapService.updateInventoryMap(form.value).subscribe((res) => {
          this.clickSubmit = true;
          console.log(res);
          if (res.isExecuted) {
            this.toastr.success("Your details have been updated", 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });

            this.dialog.closeAll()
          }
        });
      } else {
        this.clickSubmit = false;
        this.invMapService.createInventoryMap(form.value).subscribe((res) => {
          this.clickSubmit = true;
          console.log(res);
          if (res.isExecuted) {
            this.toastr.success("Your details have been added", 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });

            this.dialog.closeAll()
          }
        });
      }
    }

        }






      }
    });


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
      height: 'auto',
      width: '640px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'addlocation',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      
      if (result != true && result != false) {
        this.addInvMapLocation.controls['warehouse'].setValue(result);
      }
      if(result == 'clear'){
        this.addInvMapLocation.controls['warehouse'].setValue('');
      }
    })
  }
  loadCellSize() {

    let dialogRef = this.dialog.open(CellSizeComponent, {
      height: 'auto',
      width: '660px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'cell-size',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != true && result != false) {
        this.addInvMapLocation.controls['cell'].setValue(result);
      }
    })
  }
  loadVelocityCode() {
    let dialogRef = this.dialog.open(VelocityCodeComponent, {
      height: 'auto',
      width: '660px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'cell-size',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != true && result != false) {
        this.addInvMapLocation.controls['velocity'].setValue(result);
      }

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
    this.updateItemNumber('zone', this.zoneList[0].zone);

  }
  loadItemDetails(item: any) {
    this.itemNumberList.map(val => {
      if (val.itemNumber === item) {
        this.itemDescription = val.description ?? '';
      }
    })
    // let payload = {
    //   "itemNumber": item.option.value,
    //   "zone": this.addInvMapLocation.get('zone')?.value
    // }
    // this.invMapService.getItemNumDetail(payload).subscribe((res) => {

    //  // this.addInvMapLocation.controls['description'].setValue(res.data.maxQuantity);
    // });
  }

  updateItemNumber(col?: string, val?: any) {

    if (col === 'zone') {
      this.zone = val.toString();
    }
    if (col === 'carousel') {
      this.carousel = val.toString();
    }
    if (col === 'row') {
      this.row = val.toString();
    }
    if (col === 'shelf') {
      this.shelf = val.toString();
    }
    if (col === 'bin') {
      this.bin = val.toString();
    }
    this.autoFillLocNumber = this.zone + this.carousel + this.row + this.shelf + this.bin;
  }



  dialogClose() {
    this.dialogRef.close('close');
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }

}

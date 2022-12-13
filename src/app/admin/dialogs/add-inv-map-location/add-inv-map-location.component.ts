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
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private invMapService: InvMapLocationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addInvMapLocation = fb.group({
      location: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      carousel: ['', [Validators.required]],
      row: ['', [Validators.required]],
      shelf: ['', [Validators.required]],
      bin: ['', [Validators.required]],
      itemNumber: new FormControl(''),
      itemQuantity: new FormControl(''),
      description: new FormControl(''),
      cellSize: new FormControl(''),
      goldenZone: new FormControl(''),
      maximumQuantity: new FormControl(''),
      dedicated: new FormControl(''),
      serialNumber: new FormControl(''),
      lotNumber: new FormControl(''),
      expirationDate: new FormControl(''),
      unitOfMeasure: new FormControl(''),
      quantityAllocatedPick: new FormControl(''),
      quantityAllocatedPutAway: new FormControl(''),
      putAwayDate: new FormControl(''),
      warehouse: ['', [Validators.required]],
      revision: new FormControl(''),
      invMapID: new FormControl(''),
      userField1: new FormControl(''),
      userField2: new FormControl(''),
      masterLocation: new FormControl(''),
      dateSensitive: new FormControl(''),
      masterInvMapID: new FormControl(''),
      minQuantity: new FormControl(''),
      laserX: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(13)]],
      laserY: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(13)]],
      locationNumber: new FormControl(''),
      locationID: new FormControl(''),
    });
  }

  ngOnInit(): void {
   this.itemNumberList = this.data.itemList;
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
    });

  }
  onSubmit(form: FormGroup) {
    console.log(form);

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
      this.addInvMapLocation.controls['cellSize'].setValue(result);
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

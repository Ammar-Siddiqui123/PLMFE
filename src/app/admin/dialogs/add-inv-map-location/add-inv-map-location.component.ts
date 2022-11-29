import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellSizeComponent } from '../cell-size/cell-size.component';
import { VelocityCodeComponent } from '../velocity-code/velocity-code.component';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  filteredOptions: Observable<any[]>;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private invMapService: InvMapLocationService 
    ) { }

  ngOnInit(): void {
    this.addInvMapLocation = new FormGroup({
      location: new FormControl(''),
      zone: new FormControl(''),
      carousel: new FormControl(''),
      row: new FormControl(''),
      shelf: new FormControl(''),
      bin: new FormControl(''),
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
      warehouse: new FormControl(''),
      revision: new FormControl(''),
      invMapID: new FormControl(''),
      userField1: new FormControl(''),
      userField2: new FormControl(''),
      masterLocation: new FormControl(''),
      dateSensitive: new FormControl(''),
      masterInvMapID: new FormControl(''),
      minQuantity: new FormControl(''),
      laserX: new FormControl(''),
      laserY: new FormControl(''),
      locationNumber: new FormControl(''),
      locationID: new FormControl(''),
    });

    this.invMapService.getLocZTypeInvMap().subscribe((res) => {
      this.locZoneList = res.data;
      this.filteredOptions = this.addInvMapLocation.controls['location'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
    
  }
  onSubmit(form: FormGroup) {
    console.log(form);
    
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
      console.log(result);
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
      console.log(result);
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
}

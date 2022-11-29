import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../init/auth.service';
import { AddInvMapLocationComponent } from '../dialogs/add-inv-map-location/add-inv-map-location.component';
import { SetColumnSeqComponent } from '../dialogs/set-column-seq/set-column-seq.component';
import { SetColumnSeqService } from '../dialogs/set-column-seq/set-column-seq.service';
import { InventoryMapService } from './inventory-map.service';


const INVMAP_DATA = [
  { colHeader: "location", colDef: "Location" },
  { colHeader: "zone", colDef: "Zone" },
  { colHeader: "carousel", colDef: "Carousel" },
  { colHeader: "row", colDef: "Row" },
  { colHeader: "shelf", colDef: "Shelf" },
  { colHeader: "bin", colDef: "Bin" },
  { colHeader: "itemNumber", colDef: "Item Number" },
  { colHeader: "itemQuantity", colDef: "Item Quantity" },
  { colHeader: "description", colDef: "Description" },
  { colHeader: "cellSize", colDef: "Cell Size" },
  { colHeader: "goldenZone", colDef: "Velocity Code" },
  { colHeader: "maximumQuantity", colDef: "Maximum Quantity" },
  { colHeader: "dedicated", colDef: "Dedicated" },
  { colHeader: "serialNumber", colDef: "Serial Number" },
  { colHeader: "lotNumber", colDef: "Lot Number" },
  { colHeader: "expirationDate", colDef: "Expiration Date" },
  { colHeader: "unitOfMeasure", colDef: "Unit of Measure" },
  { colHeader: "quantityAllocatedPick", colDef: "Quantity Allocated Pick" },
  { colHeader: "quantityAllocatedPutAway", colDef: "Quantity Allocated Put Awa" },
  { colHeader: "putAwayDate", colDef: "Put Away Date" },
  { colHeader: "warehouse", colDef: "Warehouse" },
  { colHeader: "revision", colDef: "Revision" },
  { colHeader: "invMapID", colDef: "Inv Map ID" },
  { colHeader: "userField1", colDef: "User Field1" },
  { colHeader: "userField2", colDef: "User Field2" },
  { colHeader: "masterLocation", colDef: "Master Location" },
  { colHeader: "dateSensitive", colDef: "Date Sensitive" },
  { colHeader: "masterInvMapID", colDef: "Master Inv Map ID" },
  { colHeader: "minQuantity", colDef: "Min Quantity" },
  { colHeader: "laserX", colDef: "Laser X" },
  { colHeader: "laserY", colDef: "Laser Y" },
  { colHeader: "locationNumber", colDef: "Location Number" },
  { colHeader: "locationID", colDef: "Alternate Light" }
];

@Component({
  selector: 'app-inventory-map',
  templateUrl: './inventory-map.component.html',
  styleUrls: ['./inventory-map.component.scss']
})
export class InventoryMapComponent implements OnInit {
  public displayedColumns: any;
  public dataSource: any;
  public columnValues: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private dialog: MatDialog,
    private seqColumn: SetColumnSeqService,
    private authService: AuthService,
    private invMapService: InventoryMapService
  ) {
  }

  ngOnInit(): void {
    let userData = this.authService.userData();
    let paylaod = {
      "username": userData.userName,
      "wsid": userData.wsid,
      "oqa": "Nothing",
      "searchString": "",
      "searchColumn": "",
      "sortColumnIndex": 32,
      "sRow": 1,
      "eRow": 20,
      "sortOrder": "asc",
      "filter": "1 = 1"
    }
    this.seqColumn.getSetColumnSeq().subscribe((res) => {
      // INVMAP_DATA.map((colHeader => {return colHeader.colHeader}))
      this.displayedColumns = INVMAP_DATA;
      this.columnValues = INVMAP_DATA.map((colDef => { return colDef.colDef }));
      
    });

    this.invMapService.getInventoryMap(paylaod).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data.inventoryMaps);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
  }
  addLocDialog() {
    let dialogRef = this.dialog.open(AddInvMapLocationComponent, {
      height: '750px',
      width: '100%',
      data: {
        mode: 'addlocation',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }
  inventoryMapAction(actionEvent: any) {
    // console.log(actionEvent.value);
    if (actionEvent.value === 'set_column_sq') {
      let dialogRef = this.dialog.open(SetColumnSeqComponent, {
        height: 'auto',
        width: '600px',
        data: {
          mode: actionEvent.value,
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

      })
    }
  }

}

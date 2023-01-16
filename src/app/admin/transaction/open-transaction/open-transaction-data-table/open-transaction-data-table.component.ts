import { Component, OnInit, TemplateRef, ViewChild ,AfterViewInit, Input, SimpleChanges} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';

import { SetColumnSeqService } from 'src/app/admin/dialogs/set-column-seq/set-column-seq.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
const INVMAP_DATA = [
  { colHeader: 'location', colDef: 'Location' },
  { colHeader: 'zone', colDef: 'Zone' },
  { colHeader: 'carousel', colDef: 'Carousel' },
  { colHeader: 'row', colDef: 'Row' },
  { colHeader: 'shelf', colDef: 'Shelf' },
  { colHeader: 'bin', colDef: 'Bin' },
  { colHeader: 'itemNumber', colDef: 'Item Number' },
  { colHeader: 'itemQuantity', colDef: 'Item Quantity' },
  { colHeader: 'description', colDef: 'Description' },
  { colHeader: 'cellSize', colDef: 'Cell Size' },
  { colHeader: 'goldenZone', colDef: 'Velocity Code' },
  { colHeader: 'maximumQuantity', colDef: 'Maximum Quantity' },
  { colHeader: 'dedicated', colDef: 'Dedicated' },
  { colHeader: 'serialNumber', colDef: 'Serial Number' },
  { colHeader: 'lotNumber', colDef: 'Lot Number' },
  { colHeader: 'expirationDate', colDef: 'Expiration Date' },
  { colHeader: 'unitOfMeasure', colDef: 'Unit of Measure' },
  { colHeader: 'quantityAllocatedPick', colDef: 'Quantity Allocated Pick' },
  {
    colHeader: 'quantityAllocatedPutAway',
    colDef: 'Quantity Allocated Put Awa',
  },
  { colHeader: 'putAwayDate', colDef: 'Put Away Date' },
  { colHeader: 'warehouse', colDef: 'Warehouse' },
  { colHeader: 'revision', colDef: 'Revision' },
  { colHeader: 'invMapID', colDef: 'Inv Map ID' },
  { colHeader: 'userField1', colDef: 'User Field1' },
  { colHeader: 'userField2', colDef: 'User Field2' },
  { colHeader: 'masterLocation', colDef: 'Master Location' },
  { colHeader: 'dateSensitive', colDef: 'Date Sensitive' },
  { colHeader: 'masterInvMapID', colDef: 'Master Inv Map ID' },
  { colHeader: 'minQuantity', colDef: 'Min Quantity' },
  { colHeader: 'laserX', colDef: 'Laser X' },
  { colHeader: 'laserY', colDef: 'Laser Y' },
  { colHeader: 'locationNumber', colDef: 'Location Number' },
  { colHeader: 'locationID', colDef: 'Alternate Light' },
  { colHeader: 'qtyAlcPutAway', colDef: 'Quantity Allocated Put Away' },
];

@Component({
  selector: 'app-open-transaction-data-table',
  templateUrl: './open-transaction-data-table.component.html',
  styleUrls: ['./open-transaction-data-table.component.scss'],
})
export class OpenTransactionDataTableComponent implements OnInit,AfterViewInit {
  public columnValues: any = [];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  @Input() displayedColumns : any;
  
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  customPagination: any = {
    total: '',
    recordsPerPage: 20,
    startIndex: '',
    endIndex: '',
  };
  columnSearch: any = {
    searchColumn: {
      colHeader: '',
      colDef: '',
    },
    searchValue: '',
  };

  sortColumn: any = {
    columnName: 32,
    sortOrder: 'asc',
  };
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('viewAllLocation') customTemplate: TemplateRef<any>;

  constructor(private router: Router,private seqColumn: SetColumnSeqService,) {
    if (this.router.getCurrentNavigation()?.extras?.state?.['searchValue']) {
      this.columnSearch.searchValue =
        this.router.getCurrentNavigation()?.extras?.state?.['searchValue'];
      this.columnSearch.searchColumn = {
        colDef: this.router.getCurrentNavigation()?.extras?.state?.['colDef'],
        colHeader:
          this.router.getCurrentNavigation()?.extras?.state?.['colHeader'],
      };
    }
  }

  ngOnInit(): void {
    this.customPagination = {
      total: '',
      recordsPerPage: 20,
      startIndex: 0,
      endIndex: 20,
    };

    // this.initializeApi();
    //  this.getContentData();
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger
    console.log(changes)
    // this.displayedColumns=changes['displayedColumns']['currentValue'].map(item=>{
    //   return item
    // })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }

    checkboxLabel(row?: PeriodicElement): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }


}

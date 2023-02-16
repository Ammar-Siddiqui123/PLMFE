import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { ProcessPicksService } from '../../../app/induction-manager/process-picks/process-picks.service';
import { AuthService } from '../../../app/init/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  // { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  // { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  // { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  // { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  // { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  // { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  // { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-pick-tote-manager',
  templateUrl: './pick-tote-manager.component.html',
  styleUrls: ['./pick-tote-manager.component.scss']
})
export class PickToteManagerComponent implements OnInit {
  isFilter: string = 'filter'
  savedFilterList: any[] = [];
  filteredOptions: Observable<any[]>;
  savedFilter = new FormControl('');
  userData: any;
  // FILTER_DATA: any[] = [];

  /** Whether the number of selected elements matches the total number of rows. */
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  displayedColumns: string[] = ['position', 'toteid', 'orderno', 'priority', 'options', 'other'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.savedFilterList);
  selection = new SelectionModel<PeriodicElement>(true, []);

  displayedColumns1: string[] = ['position', 'toteid', 'orderno', 'other'];
  dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  displayedColumns2: string[] = ['orderno', 'requireddate', 'priority'];

  displayedColumns3: string[] = ['orderno', 'itemno', 'transaction', 'location'];

  displayedColumns4: string[] = ['select', 'zone', 'batchtype', 'totalorders', 'totallocations', 'other'];

  constructor(
    private dialog: MatDialog,
    private pPickService: ProcessPicksService,
    private toastr: ToastrService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getSavedFilters();
  }


  getSavedFilters(){
    let paylaod = {
      "filter": "",
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/PickBatchFilterTypeAhead').subscribe((res) => {
      if (res.data) {
        console.log(res.data);
        this.savedFilterList = res.data;
        this.filteredOptions = this.savedFilter.valueChanges.pipe(
          startWith(""),
          map(value => (typeof value === "string" ? value : value)),
          map(name => (name ? this._filter(name) : this.savedFilterList.slice()))
        );
      }
      // console.log(this.allZones);
    });
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.savedFilterList.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

}

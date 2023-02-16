import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ProcessPicksService } from '../../../app/induction-manager/process-picks/process-picks.service';
import { AuthService } from '../../../app/init/auth.service';
import { AddFilterFunction } from '../add-filter-function/add-filter-function.component';
import labels from '../../labels/labels.json';
import { DeleteConfirmationComponent } from '../../../app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { MatSelect, MatSelectChange } from '@angular/material/select';

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
  FILTER_DATA: any[] = [];
  ORDER_BY_DATA: any[] = [];

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

  dataSource: any;
  orderBydataSource: any;
  pickBatchFilter: any;
  pickBatchOrder: any;
  filterSeq: any = '0';
  orderBySeq: any = '0';
  isFilterAdd: boolean = false;
  isOrderByAdd: boolean = false;
  onDestroy$: Subject<boolean> = new Subject();
  selection = new SelectionModel<PeriodicElement>(true, []);
  disFilterColumns: string[] = ['sequence', 'field', 'criteria', 'value', 'andOr', 'actions'];
  disOrderColumns: string[] = ['sequence', 'field', 'sortOrder', 'actions', 'id'];

  displayedColumns1: string[] = ['position', 'toteid', 'orderno', 'other'];
  dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  displayedColumns2: string[] = ['orderno', 'requireddate', 'priority'];

  displayedColumns3: string[] = ['orderno', 'itemno', 'transaction', 'location'];

  displayedColumns4: string[] = ['select', 'zone', 'batchtype', 'totalorders', 'totallocations', 'other'];

  constructor(
    private dialog: MatDialog,
    private pPickService: ProcessPicksService,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.savedFilterList = [];
    this.userData = this.authService.userData();
    this.getSavedFilters();
    this.dataSource = new MatTableDataSource<any>(this.FILTER_DATA);
    this.orderBydataSource = new MatTableDataSource<any>(this.ORDER_BY_DATA);
  }


  getSavedFilters() {
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

  onAddFilter(filterData?: any) {
    console.log(filterData);
    if (filterData) {
      filterData.map(obj => {
        this.FILTER_DATA.push({ sequence: obj.sequence, field: obj.field, criteria: obj.criteria, value: obj.value, andOr: obj.andOr });
        this.filterSeq = obj.sequence
      });
      this.dataSource = new MatTableDataSource<any>(this.FILTER_DATA);
    }
    else {
      this.FILTER_DATA.push({ sequence: this.filterSeq + 1, field: 'Emergency', criteria: 'Equals', value: '', andOr: 'And' });

      this.dataSource = new MatTableDataSource<any>(this.FILTER_DATA);
      this.isFilterAdd = false;
    }
  }
  onAddOrderBy(filterData?: any) {
    console.log(filterData);
    if (filterData) {
      filterData.map(obj => {
        this.ORDER_BY_DATA.push({ id: obj.id, sequence: obj.sequence, field: obj.field, sortOrder: obj.order });
        this.orderBySeq = obj.sequence
      });
      this.orderBydataSource = new MatTableDataSource<any>(this.ORDER_BY_DATA);
    }
    else {
      this.ORDER_BY_DATA.push({ sequence: this.orderBySeq + 1, field: 'Emergency', sortOrder: 'DESC' });
      this.orderBydataSource = new MatTableDataSource<any>(this.ORDER_BY_DATA);
      this.isOrderByAdd = false;
    }
  }
  onFilterAction(option: any) {
    if (option.value === 'add_new_filter') {
      const dialogRef = this.dialog.open(AddFilterFunction, {
        height: 'auto',
        width: '500px',
        autoFocus: '__non_existing_element__'
      })
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
        this.savedFilterList.push(result);
        this.savedFilter.setValue(result);
        this.isFilterAdd = true;
        this.isOrderByAdd = true;
        this.filterSeq = '0';
        this.orderBySeq = '0';
        this.pickBatchFilterOrderData(result);
      });
    }
    if (option.value === 'rename') {
      const dialogRef = this.dialog.open(AddFilterFunction, {
        height: 'auto',
        width: '500px',
        data: {
          savedFilter: this.savedFilter.value
        },
        autoFocus: '__non_existing_element__'
      });
      dialogRef.afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(result => {
        this.savedFilterList = this.savedFilterList.filter(item => item !== result.oldFilter);
        this.savedFilterList.push(result.newFilter);
        this.savedFilter.setValue(result.newFilter);
        const matSelect: MatSelect = option.source;
        matSelect.writeValue(null);
      });
    }
    if (option.value === 'set_default') {
      let paylaod = {
        "Description": this.savedFilter.value,
        "wsid": this.userData.wsid
      }
      this.pPickService.get(paylaod, '/Induction/PickBatchDefaultFilterMark').subscribe(res => {
        if (res.isExecuted) {
          this.toastr.success(labels.alert.update, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          const matSelect: MatSelect = option.source;
          matSelect.writeValue(null);
        }

      });
    }
    if (option.value === 'clear_default') {
      let paylaod = {
        "wsid": this.userData.wsid
      }
      this.pPickService.get(paylaod, '/Induction/PickBatchDefaultFilterClear').subscribe(res => {
        if (res.isExecuted) {
          this.toastr.success(labels.alert.update, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          const matSelect: MatSelect = option.source;
          matSelect.writeValue(null);
        }
      });
    }
    if (option.value === 'view_default') {
      let paylaod = {
        "wsid": this.userData.wsid
      }
      this.pPickService.get(paylaod, '/Induction/PickBatchDefaultFilterSelect').subscribe(res => {
        if (res.data) {
          console.log(res.data);
          this.savedFilter.setValue(res.data);
          this.isFilterAdd = true;
          this.isOrderByAdd = true;
          this.filterSeq = '0';
          this.orderBySeq = '0';
          this.pickBatchFilterOrderData(res.data);
        }
        else {
          this.toastr.error('No filter is marked as default.', 'Warning!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
        const matSelect: MatSelect = option.source;
        matSelect.writeValue(null);
      });

    }
    if (option.value === 'delete_selected_filter') {
      const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        height: 'auto',
        width: '480px',
        autoFocus: '__non_existing_element__',
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'Yes') {
          let paylaod = {
            "Description": this.savedFilter.value,
            "wsid": this.userData.wsid
          }
          this.pPickService.get(paylaod, '/Induction/PickBatchFilterBatchDelete').subscribe(res => {
            if (res.isExecuted) {
              this.toastr.success(labels.alert.delete, 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000
              });
              this.savedFilterList = this.savedFilterList.filter(item => item !== this.savedFilter.value);
              this.savedFilter.setValue('');
              this.savedFilClosed();
              const matSelect: MatSelect = option.source;
              matSelect.writeValue(null);
            }

          });
        }
      })

    }
  }
  onSavedFilterChange(val: any) {
    if (val.option.value) {
      this.isFilterAdd = true;
      this.isOrderByAdd = true;
      this.filterSeq = '0';
      this.orderBySeq = '0';
      this.pickBatchFilterOrderData(val.option.value);
    }
  }

  pickBatchFilterOrderData(filter: string | null) {
    let paylaod = {
      "filter": filter,
      "wsid": this.userData.wsid,
    }
    this.pPickService.get(paylaod, '/Induction/PickBatchFilterOrderData').subscribe(res => {
      if (res.data) {
        this.FILTER_DATA = [];
        this.ORDER_BY_DATA = [];
        this.pickBatchFilter = res.data.pickBatchFilter
        this.pickBatchOrder = res.data.pickBatchOrder
        if (!this.pickBatchFilter) {
          this.onAddFilter();
        } else {
          this.onAddFilter(this.pickBatchFilter);
        }

        if (!this.pickBatchOrder) {
          // this.onAddOrderBy();
        } else {
          this.onAddOrderBy(this.pickBatchOrder);
        }
      }
    });
  }
  savedFilClosed() {
    if (!this.savedFilter.value) {
      this.isFilterAdd = false;
      this.isOrderByAdd = false;
      this.FILTER_DATA = [];
      this.ORDER_BY_DATA = [];
      this.orderBydataSource = new MatTableDataSource<any>(this.ORDER_BY_DATA);
      this.dataSource = new MatTableDataSource<any>(this.FILTER_DATA);
    }

  }

  onSaveSingleFilter(element: any) {
    console.log(element);
    if (element.value === '') {
      this.toastr.error('Some of the inputs are missing values. Cannot add row to filter.', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
    else {
      let payload = {
        "Sequence": element.sequence,
        "Field": element.field,
        "Criteria": element.criteria,
        "Value": element.value,
        "AndOr": element.andOr,
        "Description": this.savedFilter.value,
        "wsid": this.userData.wsid,
      }
      this.pPickService.create(payload, '/Induction/PickBatchFilterInsert').subscribe(res => {
        if (res.isExecuted) {
          this.isFilterAdd = true;
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
  }
  onSaveSingleOrder(element: any) {
    console.log(element);
    let payload = {
      "Sequence": element.sequence,
      "Field": element.field,
      "Order": "DESC",
      "Description": this.savedFilter.value,
      "wsid": this.userData.wsid,
    }
    console.log(payload);

    this.pPickService.create(payload, '/Induction/PickBatchOrderInsert').subscribe(res => {
      if (res.isExecuted) {
        this.isOrderByAdd = true;
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    });
  }
  onDeleteSingleFilter(element: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        let payload = {
          "Sequence": element.sequence,
          "Description": this.savedFilter.value,
          "wsid": this.userData.wsid,
        }
        this.pPickService.delete(payload, '/Induction/PickBatchFilterDelete').subscribe(res => {
          if (res.isExecuted) {
            this.isFilterAdd = true;
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.pickBatchFilterOrderData(this.savedFilter.value);
          }
        });
      }
    });
  }
  onDeleteSingleOrder(element: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        // console.log(element);

        let payload = {
          "id": element.id,
          "wsid": this.userData.wsid,
        }
        this.pPickService.delete(payload, '/Induction/PickBatchOrderDelete').subscribe(res => {
          if (res.isExecuted) {
            this.isFilterAdd = true;
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.pickBatchFilterOrderData(this.savedFilter.value);
          }
        });
      }
    });
  }

}



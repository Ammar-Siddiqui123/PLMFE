import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AdminService } from 'src/app/admin/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-ccb-create-counts',
  templateUrl: './create-counts.component.html',
  styleUrls: ['./create-counts.component.scss'],
})
export class CCBCreateCountsComponent implements OnInit {
  public userData: any;
  selectedTabIndex: number = 0;

  countType: string = '';
  warehouse: string = '';
  warehouses: any = [];

  filtersForm: FormGroup;
  searchByItem: any = new Subject<string>();
  searchAutocompleteItemNumber: any = [];
  searchAutocompleteDescription: any = [];

  dataSource: any;
  time = new Date();

  locRangeDiv: boolean = false;
  itemNumDiv: boolean = false;
  desDiv: boolean = false;
  catDiv: boolean = false;
  
  notCouSinDiv: boolean = false;
  pickDateRanDiv: boolean = false;
  putDateRanDiv: boolean = false;
  costRanDiv: boolean = false;
  curCountOrders: any = [];
  searchField = new Subject<string>();
  // variables for mat-sort and mat-paginator with viewChild
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection: any = 'location';
  sdate: any = new Date();
  edate: any = new Date();
  notCountSince: any = new Date();
  ELEMENT_DATA: any[] = [
    {
      item_no: '30022',
      qty_location: '12',
      warehouse: 'Work 2141',
      lot_no: 'Main 52',
      expiration_date: 'Jan-25-2023',
      serial_no: '854120',
    },
    {
      item_no: '40022',
      qty_location: 'loc 1212',
      warehouse: 'Work 2141',
      lot_no: '30',
      expiration_date: 'Jan-25-2023',
      serial_no: '854120',
    },
    {
      item_no: '50022',
      qty_location: 'loc 1212',
      warehouse: 'Work 2141',
      lot_no: '100',
      expiration_date: 'Jan-25-2023',
      serial_no: '854120',
    },
    {
      item_no: '60022',
      qty_location: 'loc 1212',
      warehouse: 'Work 2141',
      lot_no: 'Main 600',
      expiration_date: 'Jan-25-2023',
      serial_no: '854120',
    },
    {
      item_no: '70022',
      qty_location: 'loc 1212',
      warehouse: 'Work 2141',
      lot_no: 'Main 600',
      expiration_date: 'Jan-25-2023',
      serial_no: '854120',
    },
    {
      item_no: '10022',
      qty_location: 'loc 1212',
      warehouse: 'Work 2141',
      lot_no: 'Main 600',
      expiration_date: 'Jan-25-2023',
      serial_no: '854120',
    },
    {
      item_no: '20022',
      qty_location: 'loc 1212',
      warehouse: 'Work 2141',
      lot_no: 'Main 600',
      expiration_date: 'Jan-25-2023',
      serial_no: '854120',
    },
  ];

  displayedColumns: string[] = [
   
    'itemNumber',
    'description',
    'itemQuantity',
    'unitofMeasure',
    'warehouse',
    'location',
    'goldenZone',
    'cellSize',
    'serialNumber',
    'lotNumber',
    'expirationDate',
    'actions',
  ];
  tableData = this.ELEMENT_DATA;
  dataSourceList: any;
  constructor(
    private adminService: AdminService,
    private toastService: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.filtersForm = new FormGroup({
      countType: new FormControl(''),
      fromLocation: new FormControl(''),
      toLocation: new FormControl(''),
      includeEmpty: new FormControl(false),
      includeOther: new FormControl(false),
      fromItem: new FormControl(''),
      toItem: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      // subCategory: new FormControl({ value: '', disabled: true }),
      subCategory: new FormControl(''),
      notCounted: new FormControl(''),
      pickedStart: new FormControl(''),
      pickedEnd: new FormControl(''),
      putStart: new FormControl(''),
      putEnd: new FormControl(''),
      costStart: new FormControl(0),
      costEnd: new FormControl(0),
      warehouse: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.dataSourceList = new MatTableDataSource(this.tableData);
    this.getWareAndCurOrd();


    this.searchField
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((value) => {
      console.log( this.filtersForm.value.fromLocation);
      console.log( this.filtersForm.value.toLocation);
      console.log( this.filtersForm.value.includeEmpty);
      console.log( this.filtersForm.value.includeOther);
      console.log( this.filtersForm.value.fromItem);
      console.log( this.filtersForm.value.toItem);
      console.log( this.filtersForm.value.description);
      console.log( this.filtersForm.value.category);
      console.log( this.filtersForm.value.subCategory);
      console.log( this.filtersForm.value.notCounted);
      console.log( this.filtersForm.value.sdate);
      console.log( this.filtersForm.value.pickedEnd);
      // this.columnSearch.searchValue = value;
      // if (!this.columnSearch.searchColumn.colDef) return;

      // this.autocompleteSearchColumn();
      // if (!this.searchAutocompleteList.length) {
        // this.getContentData();
      // }
    });
  }

  // function to get warehouses and current orders
  // This function gets the list of warehouses and the list of current count orders.
  getWareAndCurOrd() {
    // Try to run this code
    try {
      // Create a payload to send to the server
      var payLoad = {
        username: this.userData.username,
        wsid: this.userData.wsid,
      };
      // Run the service to get the list of warehouses and the list of current count orders.
      this.adminService.create(payLoad, '/Admin/GetCountBatches').subscribe(
        // If the request is successful, get the data
        (res: any) => {
          // If the data is returned, set the list of warehouses and the list of current count orders
          if (res.data && res.isExecuted) {
            this.warehouses = res.data.warehouses ? res.data.warehouses : [];
            this.curCountOrders = res.data.countOrders
              ? res.data.countOrders
              : [];
          }
          // If the data is not returned, show an error message
          else {
            this.toastService.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        // If the request is not successful, show an error message
        (error) => {
          this.toastService.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      );
    } catch (error) {
      // If the code cannot be run, show an error message
      this.toastService.error('Something went wrong', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000,
      });
    }
  }

  // function returns an object with 18 values
  getPayload() {
    return {
      fromLocation: this.filtersForm.value.fromLocation,
      toLocation: this.filtersForm.value.toLocation,
      includeEmpty: this.filtersForm.value.includeEmpty,
      includeOther: this.filtersForm.value.includeOther,
      fromItem: this.filtersForm.value.fromItem,
      toItem: this.filtersForm.value.toItem,
      description: this.filtersForm.value.description,
      category: this.filtersForm.value.category,
      subCategory: this.filtersForm.value.subCategory,
      notCounted:
        this.filtersForm.value.notCounted === '1/11/1111'
          ? true
          : this.filtersForm.value.notCounted,
      pickedStart:
        this.filtersForm.value.pickedStart === ''
          ? '1/11/1111'
          : this.filtersForm.value.pickedStart,
      pickedEnd:
        this.filtersForm.value.pickedEnd === ''
          ? '1/11/1111'
          : this.filtersForm.value.pickedEnd,
      putStart:
        this.filtersForm.value.putStart === ''
          ? '1/11/1111'
          : this.filtersForm.value.putStart,
      putEnd:
        this.filtersForm.value.putEnd === ''
          ? '1/11/1111'
          : this.filtersForm.value.putEnd,
      costStart: this.filtersForm.value.costStart,
      costEnd: this.filtersForm.value.costEnd,
      warehouseFilter: this.filtersForm.value.warehouse,
    };
  }

  // function to fill data to the data table with mattabledata by calling API with payload using admin services with get method
  // and then assign the response to the dataSource variable with check type of response and if there is response.data and isExecuted is true else add error toast
  // handle with try catch
  fillData() {
    const payload = this.getPayload();
    this.adminService.get(payload, '/Admin/BatchResultTable').subscribe(
      (res: any) => {
        if (res && res.data && res.isExecuted) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
        } else {
          this.toastService.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (err) => {
        this.toastService.error('Something went wrong', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });
      }
    );
  }
  ngAfterViewInit() {
    this.dataSourceList.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    //   if (sortState.direction) {
    //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    //   } else {
    //     this._liveAnnouncer.announce('Sorting cleared');
    //   }
  }
}

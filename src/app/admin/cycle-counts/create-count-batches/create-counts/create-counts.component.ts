import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AdminService } from 'src/app/admin/admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-ccb-create-counts',
  templateUrl: './create-counts.component.html',
  styleUrls: ['./create-counts.component.scss'],
})
export class CCBCreateCountsComponent implements OnInit {
  public userData: any;
  selectedTabIndex: number = 0;
  orderNumber;
  countType: string = '';
  warehouse: string = '';
  warehouses: any = [];
  customPagination: any = {
    total: '',
    recordsPerPage: 10,
    startIndex: 1,
    endIndex: 10,
  };
  filtersForm: FormGroup;
  searchByItem: any = new Subject<string>();
  searchAutocompleteItemNumber: any = [];
  searchAutocompleteDescription: any = [];
  searchAutocompletCategory: any = [];
  searchAutocompletBeginCost: any = [];

  dataSource: any;
  time = new Date();

  locRangeDiv: boolean = false;
  itemNumDiv: boolean = false;
  desDiv: boolean = false;
  catDiv: boolean = false;
  pageEvent: PageEvent;
  hideRequiredControl = new FormControl(false);
  notCouSinDiv: boolean = false;
  pickDateRanDiv: boolean = false;
  putDateRanDiv: boolean = false;
  costRanDiv: boolean = false;
  curCountOrders: any = [];
  searchField = new Subject<string>();
  descriptionTA = new Subject<string>();
  categoryTA = new Subject<string>();
  beginCostTA = new Subject<string>();
  endCostTA = new Subject<string>();
  @Output() countsUpdated = new EventEmitter<string>();
  // variables for mat-sort and mat-paginator with viewChild
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  searchAutocompleteListDescription = [];
  selection: any = 'LocationRange';
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
      notCounted: new FormControl(new Date()),
      pickedStart: new FormControl(new Date()),
      pickedEnd: new FormControl(new Date()),
      putStart: new FormControl(new Date()),
      putEnd: new FormControl(new Date()),
      costStart: new FormControl(''),
      costEnd: new FormControl(''),
      warehouse: new FormControl(''),
    });
  }
  nextStep() {
    this.countsUpdated.emit('next');
  }
  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.dataSourceList = new MatTableDataSource(this.tableData);
    this.getWareAndCurOrd();

    this.searchField
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.fillData();

        // this.columnSearch.searchValue = value;
        // if (!this.columnSearch.searchColumn.colDef) return;

        // this.autocompleteSearchColumn();
        // if (!this.searchAutocompleteList.length) {
        // this.getContentData();
        // }
      });

    this.descriptionTA
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.getTypeAheads('Description');
      });

    this.categoryTA
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.getTypeAheads('Category');
      });

    this.beginCostTA
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.getTypeAheads('BeginCost');
      });

    this.endCostTA
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.getTypeAheads('EndCost');
      });
  }
  searchData() {}
  getTypeAheads(type) {
    if (type === 'Description') {
      let paylaod = {
        description: this.filtersForm.value.description,
        userName: this.userData.userName,
        wsid: this.userData.wsid,
      };
      this.adminService
        .create(paylaod, '/Admin/GetCCDescriptionTypeAhead')
        .subscribe((res: any) => {
          this.searchAutocompleteDescription = res.data;
        });
      this.fillData();
    } else if (type === 'Category') {
      let paylaod = {
        category: this.filtersForm.value.category,
        userName: this.userData.userName,
        wsid: this.userData.wsid,
      };
      this.adminService
        .create(paylaod, '/Admin/GetCCCategoryTypeAhead')
        .subscribe((res: any) => {
          this.searchAutocompletCategory = res.data;
        });
    } else if (type === 'BeginCost' || type === 'EndCost') {
      let payload = {
        beginCost: this.filtersForm.value.costStart
          ? this.filtersForm.value.costStart
          : '',
        endCost: this.filtersForm.value.endCost
          ? this.filtersForm.value.endCost
          : '',
        userName: this.userData.userName,
        wsid: this.userData.wsId,
      };
      this.adminService
        .create(payload, '/Admin/GetCCCountToCostTypeAhead')
        .subscribe((res: any) => {
          this.searchAutocompletBeginCost = res.data;
        });
    }
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
      // "fromLocation": "",
      // "toLocation": "",
      // "includeEmpty": true,
      // "includeOther": true,
      // "countType": "Description",
      // "fromItem": "",
      // "toItem": "",
      // "description": "Kit Item",
      // "category": "",
      // "subCategory": "",
      // "notCounted": "2023-04-12T10:54:05.127Z",
      // "pickedStart": "2023-04-12T10:54:05.127Z",
      // "pickedEnd": "2023-04-12T10:54:05.127Z",
      // "putStart": "2023-04-12T10:54:05.127Z",
      // "putEnd": "2023-04-12T10:54:05.127Z",
      // "costStart": "",
      // "costEnd": "",
      // "warehouseFilter": ""

      fromLocation: this.filtersForm.value.fromLocation
        ? this.filtersForm.value.fromLocation
        : '',
      toLocation: this.filtersForm.value.toLocation
        ? this.filtersForm.value.toLocation
        : '',
      includeEmpty: this.filtersForm.value.includeEmpty,
      includeOther: this.filtersForm.value.includeOther,
      countType: this.selection ? this.selection : 'Description',
      fromItem: this.filtersForm.value.fromItem
        ? this.filtersForm.value.fromItem
        : '',
      toItem: this.filtersForm.value.toItem
        ? this.filtersForm.value.toItem
        : '',
      description: this.filtersForm.value.description
        ? this.filtersForm.value.description
        : '',
      category: this.filtersForm.value.category
        ? this.filtersForm.value.category
        : '',
      subCategory: this.filtersForm.value.subCategory
        ? this.filtersForm.value.subCategory
        : '',
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
      // warehouseFilter: this.filtersForm.value.warehouse,
      warehouseFilter: this.warehouse,
    };
  }

  // function to fill data to the data table with mattabledata by calling API with payload using admin services with get method
  // and then assign the response to the dataSource variable with check type of response and if there is response.data and isExecuted is true else add error toast
  // handle with try catch
  fillData() {
    const payload = {
      queryData: {
        fromLocation: this.filtersForm.value.fromLocation
          ? this.filtersForm.value.fromLocation
          : '',
        toLocation: this.filtersForm.value.toLocation
          ? this.filtersForm.value.toLocation
          : '',
        includeEmpty: this.filtersForm.value.includeEmpty,
        includeOther: this.filtersForm.value.includeOther,
        countType: this.selection ? this.selection : 'Description',
        fromItem: this.filtersForm.value.fromItem
          ? this.filtersForm.value.fromItem
          : '',
        toItem: this.filtersForm.value.toItem
          ? this.filtersForm.value.toItem
          : '',
        description: this.filtersForm.value.description,
        category: this.filtersForm.value.category
          ? this.filtersForm.value.category
          : '',
        subCategory: this.filtersForm.value.subCategory
          ? this.filtersForm.value.subCategory
          : '',
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
        // warehouseFilter: this.filtersForm.value.warehouse,
        warehouseFilter: this.warehouse,
      },
      userName: 'Umeraslam123',
      wsid: 'TESTWSID',
    };
    this.adminService.get(payload, '/Admin/BatchResultTable').subscribe(
      (res: any) => {
        if (res && res.data && res.isExecuted) {
          this.dataSource = new MatTableDataSource(res.data);
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
  changeCountOrder(e) {
    this.orderNumber = e;
  }
  deleteCycleCount(ident: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '600px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: 'delete-create-count',
        actionMessage: ` all Incomplete count transactions for ${this.orderNumber}`,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);

      if (res == 'Yes') {
        var payLoad = {
          ordNum: this.orderNumber,
          ident: ident,
          username: this.userData.username,
          wsid: this.userData.wsid,
        };
        // Call the API
        this.adminService.delete(payLoad, '/Admin/CountOrdersDelete').subscribe(
          (res: any) => {
            // Check if the response is a success
            if (res.data && res.isExecuted) {
              // Display a success message
              this.toastService.success('Order Deleted', 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
              // Get the orders again
              // this.getOrders();
            } else {
              // Display an error message
              this.toastService.error('Something went wrong', 'Error!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
            }
          },
          // This function will be called if there is an error
          (error: any) => {
            // Display an error message
            this.toastService.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        );
      }
    });
  }
  ngAfterViewInit() {
    this.dataSourceList.sort = this.sort;
  }
  insertCCQueue(ids: any) {
    var payLoad = {
      InvMapIDs: ids,
      username: this.userData.username,
      wsid: this.userData.wsid,
    };
    this.adminService.create(payLoad, '/Admin/CycleCountQueueInsert').subscribe(
      (res: any) => {
        if (res.data && res.isExecuted) {
          this.dataSource = [];
          this.selectedTabIndex = 1;
          this.nextStep();
        } else {
          this.toastService.error('Something went wrong', 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          });
        }
      },
      (error) => {}
    );
  }

  insertQueue() {
    try {
      let invMapIDs = new Array();
      let finaliter = Math.floor(this.dataSource.data.length / 1000);
      let curriter = 0;

      if (finaliter == 0) {
        this.dataSource.data.forEach((element) => {
          console.log(element);

          invMapIDs.push(element.invMapID);
        });

        this.insertCCQueue(invMapIDs);
      } else {
        this.dataSource.data.forEach((element) => {
          invMapIDs.push(element.invMapID);

          if (invMapIDs.length == 1000) {
            var payLoad = {
              InvMapIDs: invMapIDs,
              username: this.userData.username,
              wsid: this.userData.wsid,
            };
            this.adminService
              .create(payLoad, '/Admin/CycleCountQueueInsert')
              .subscribe(
                (res: any) => {
                  if (res.data && res.isExecuted) {
                    curriter++;
                    if (curriter == finaliter) {
                      if (invMapIDs.length > 0) {
                        this.insertCCQueue(invMapIDs);
                      } else {
                        this.dataSource = [];
                        this.selectedTabIndex = 1;
                      }
                    }
                  } else {
                    this.toastService.error('Something went wrong', 'Error!', {
                      positionClass: 'toast-bottom-right',
                      timeOut: 2000,
                    });
                  }
                },
                (error) => {}
              );
            invMapIDs = [];
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.customPagination.startIndex = e.pageSize * e.pageIndex;
    this.customPagination.endIndex = e.pageSize * e.pageIndex + e.pageSize;
    this.customPagination.recordsPerPage = e.pageSize;
    this.fillData();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}

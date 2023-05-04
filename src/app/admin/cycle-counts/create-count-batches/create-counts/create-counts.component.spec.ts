import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CCBCreateCountsComponent } from './create-counts.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { of, throwError } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteConfirmationComponent } from 'src/app/admin/dialogs/delete-confirmation/delete-confirmation.component';
import { AdminService } from 'src/app/admin/admin.service';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';

describe('CCBCreateCountsComponent', () => {
  let component: CCBCreateCountsComponent;
  let fixture: ComponentFixture<CCBCreateCountsComponent>;
  let dialog: MatDialog;
  let dialogRef: any;
  let adminService: AdminService;

  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CCBCreateCountsComponent],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
      providers: [ToastrService, FormBuilder, MatDialog, PageEvent],
    }).compileComponents();

    fixture = TestBed.createComponent(CCBCreateCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialog = TestBed.inject(MatDialog);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialog.open = jasmine.createSpy('open').and.returnValue(dialogRef);
    adminService = TestBed.inject(AdminService);

    // spyOn(dialog, 'open').and.returnValue(dialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //FillData()

  it('should fill data', () => {
    // Arrange
    const expectedData = [
      {
        cellSize: '',
        description: 'Test',
        expirationDate: '',
        goldenZone: '',
        invMapID: '',
        itemNumber: '',
        itemQuantity: '',
        location: '',
        lotNumber: '',
        serialNumber: '',
        unitofMeasure: '',
        warehouse: '',
      },
    ];
    const mockResponse = { data: expectedData, isExecuted: true };
    spyOn(component.adminService, 'get').and.returnValue(
      of(mockResponse) // Assuming adminService.get() returns an Observable
    );

    // Act
    component.fillData();

    // Assert
    expect(component.dataSource).toBeDefined();
    expect(component.dataSource.data).toEqual(expectedData);
    expect(component.dataSource.paginator).toBeDefined();
    expect(component.dataSource.sort).toBeDefined();
    expect(component.isDataAvailable).toBeTrue();
  });

  it('should emit "next" when nextStep() is called', () => {
    spyOn(component.countsUpdated, 'emit');
    component.nextStep();
    expect(component.countsUpdated.emit).toHaveBeenCalledWith('next');
  });

  it('should emit the provided object when updateQueCountEvent() is called', () => {
    spyOn(component.eventChange, 'emit');
    const testObject: any = { count: 5 };
    component.updateQueCountEvent(testObject);
    expect(component.eventChange.emit).toHaveBeenCalledWith(testObject);
  });

  //Onchange()

  it('should set the value of includeEmpty control when type is "empty"', () => {
    const mockEvent = { checked: true };
    // component.filtersForm = {
    //   controls: {
    //     includeEmpty: new FormControl(false),
    //     includeOther: new FormControl(false),
    //   },
    // };

    component.onChangeDemo(mockEvent, 'empty');

    expect(component.filtersForm.controls['includeEmpty'].value).toBe(true);
    expect(component.filtersForm.controls['includeOther'].value).toBe(false);
  });

  it('should call the fillData() method', () => {
    spyOn(component, 'fillData');
    const mockEvent = { checked: true };

    component.onChangeDemo(mockEvent, 'empty');

    expect(component.fillData).toHaveBeenCalled();
  });

  // it('should call the fillData() method', () => {
  //   spyOn(component, 'fillData');
  //   component.searchData();
  //   expect(component.fillData).toHaveBeenCalled();
  // });

  // it('should update subCategory and call fillData()', () => {
  //   const item = { subCategory: 'testSubCategory' };
  //   component.onSelFunc(item,event);
  //   expect(component.subCategory).toBe('testSubCategory');
  // });

  it('should reset form values', () => {
    // Set initial form values
    component.filtersForm.controls['fromLocation'].setValue('Test');
    component.filtersForm.controls['toLocation'].setValue('Test');
    component.filtersForm.controls['description'].setValue('Test');
    component.filtersForm.controls['category'].setValue('Test');
    component.filtersForm.controls['subCategory'].setValue('Test');
    component.filtersForm.controls['fromItem'].setValue('Test');
    component.filtersForm.controls['toItem'].setValue('Test');
    component.filtersForm.controls['notCounted'].setValue(new Date());
    component.filtersForm.controls['pickedStart'].setValue(new Date());
    component.filtersForm.controls['pickedEnd'].setValue(new Date());
    component.filtersForm.controls['putStart'].setValue(new Date());
    component.filtersForm.controls['putEnd'].setValue(new Date());
    component.filtersForm.controls['costStart'].setValue('Test');
    component.filtersForm.controls['costEnd'].setValue('Test');
    component.filtersForm.controls['warehouse'].setValue('Test');

    // Call the method to reset form values
    component.resetVal();

    // Expect form values to be reset to initial state
    expect(component.filtersForm.controls['fromLocation'].value).toBe('');
    expect(component.filtersForm.controls['toLocation'].value).toBe('');
    expect(component.filtersForm.controls['description'].value).toBe('');
    expect(component.filtersForm.controls['category'].value).toBe('');
    expect(component.filtersForm.controls['subCategory'].value).toBe('');
    expect(component.filtersForm.controls['fromItem'].value).toBe('');
    expect(component.filtersForm.controls['toItem'].value).toBe('');
    expect(component.filtersForm.controls['notCounted'].value).toEqual(
      new Date(1 / 1 / 1970)
    );
    expect(component.filtersForm.controls['pickedStart'].value).toEqual(
      new Date(1 / 1 / 1970)
    );
    expect(component.filtersForm.controls['pickedEnd'].value).toEqual(
      new Date(1 / 1 / 1970)
    );
    expect(component.filtersForm.controls['putStart'].value).toEqual(
      new Date(1 / 1 / 1970)
    );
    expect(component.filtersForm.controls['putEnd'].value).toEqual(
      new Date(1 / 1 / 1970)
    );
    expect(component.filtersForm.controls['costStart'].value).toBe('');
    expect(component.filtersForm.controls['costEnd'].value).toBe('');
    expect(component.filtersForm.controls['warehouse'].value).toBe('');
  });

  // handlePageEvent()  cases
  it('should set pagination values correctly when handlePageEvent is called', () => {
    const pageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: 10,
      length: 100,
      previousPageIndex: 0,
    };

    component.handlePageEvent(pageEvent); // handlePageEvent is called

    expect(component.pageEvent).toEqual(pageEvent);
    expect(component.customPagination.startIndex).toEqual(
      pageEvent.pageSize * pageEvent.pageIndex
    );
    expect(component.customPagination.endIndex).toEqual(
      pageEvent.pageSize * pageEvent.pageIndex + pageEvent.pageSize
    );
    expect(component.customPagination.recordsPerPage).toEqual(
      pageEvent.pageSize
    );
  });

  //getTypeAheads method cases
  // description
  it('should call adminService to get description typeahead', () => {
    spyOn(component.adminService, 'get').and.returnValue(
      of({ data: ['description1', 'description2'] })
    );
    const expectedPayload = {
      description: 'Test desc',
      username: 'umar',
      wsid: 'TESTWSID',
    };
    component.getTypeAheads('Description');

    expect(component.adminService.get).toHaveBeenCalledWith(
      {
        description: component.filtersForm.controls['description'].value,
        userName: component.userData.userName,
        wsid: component.userData.wsid,
      },
      '/Admin/GetCCDescriptionTypeAhead',
      true
    );
    expect(component.searchAutocompleteDescription).toEqual([
      'description1',
      'description2',
    ]);
  });

  // category
  it('should call adminService to get category typeahead', () => {
    spyOn(component.adminService, 'get').and.returnValue(
      of({ data: ['category1', 'category2'] })
    );

    component.getTypeAheads('Category');

    expect(component.adminService.get).toHaveBeenCalledWith(
      {
        category: component.filtersForm.value.category,
        userName: component.userData.userName,
        wsid: component.userData.wsid,
      },
      '/Admin/GetCCCategoryTypeAhead',
      true
    );
    expect(component.searchAutocompletCategory).toEqual([
      'category1',
      'category2',
    ]);
  });

  it('should call adminService to get begin cost typeahead', () => {
    spyOn(component.adminService, 'get').and.returnValue(
      of({ data: ['beginCost1', 'beginCost2'] })
    );

    component.getTypeAheads('BeginCost');

    expect(component.adminService.get).toHaveBeenCalledWith(
      {
        beginCost: component.filtersForm.value.costStart,
        endCost: component.filtersForm.value.costEnd,
        userName: component.userData.userName,
        wsid: component.userData.wsid,
      },
      '/Admin/GetCCCountToCostTypeAhead',
      true
    );
    expect(component.searchAutocompletBeginCost).toEqual([
      'beginCost1',
      'beginCost2',
    ]);
  });

  it('should call adminService to get end cost typeahead', () => {
    spyOn(component.adminService, 'get').and.returnValue(
      of({ data: ['endCost1', 'endCost2'] })
    );

    component.getTypeAheads('EndCost');

    expect(component.adminService.get).toHaveBeenCalledWith(
      {
        beginCost: component.filtersForm.value.costStart,
        endCost: component.filtersForm.value.costEnd,
        userName: component.userData.userName,
        wsid: component.userData.wsid,
      },
      '/Admin/GetCCCountToCostTypeAhead',
      true
    );
    expect(component.searchAutocompletEndCost).toEqual([
      'endCost1',
      'endCost2',
    ]);
  });

  it('should call getLocationBegin and update searchAutocompleteFromLocation', () => {
    spyOn(component.adminService, 'get').and.returnValue(
      of({ data: 'mocked data' })
    );
    component.filtersForm.controls['fromLocation'].setValue('Test Location');
    component.userData = { userName: 'Test User', wsid: 'Test WSID' };
    component.getTypeAheads('FromLocation');
    expect(component.adminService.get).toHaveBeenCalledWith(
      {
        query: 'Test Location',
        unique: true,
        username: 'Test User',
        wsid: 'Test WSID',
      },
      '/Common/LocationBegin',
      true
    );
    expect(component.searchAutocompleteFromLocation).toBe('mocked data');
  });

  it('should call getLocationEnd and update searchAutocompleteToLocation', () => {
    spyOn(component.adminService, 'get').and.returnValue(
      of({ data: 'mocked data' })
    );
    component.filtersForm.controls['toLocation'].setValue('Test Location');
    component.filtersForm.controls['fromLocation'].setValue('Test Location');
    component.userData = { userName: 'Test User', wsid: 'Test WSID' };
    component.getTypeAheads('ToLocation');
    expect(component.adminService.get).toHaveBeenCalledWith(
      {
        query: 'Test Location',
        beginLocation: 'Test Location',
        unique: true,
        username: 'Test User',
        wsid: 'Test WSID',
      },
      '/Common/LocationEnd',
      true
    );
    expect(component.searchAutocompleteToLocation).toBe('mocked data');
  });

  it('should call getLocationEnd and update searchAutocompleteFromItem', () => {
    spyOn(component.adminService, 'get').and.returnValue(
      of({ data: 'mocked data' })
    );
    component.filtersForm.controls['fromItem'].setValue('Test Item');
    component.filtersForm.controls['toItem'].setValue('Test Item');
    component.userData = { userName: 'Test User', wsid: 'Test WSID' };
    component.getTypeAheads('FromItem');
    expect(component.adminService.get).toHaveBeenCalledWith(
      {
        itemNumber: 'Test Item',
        beginItem: '---',
        isEqual: false,

        username: 'Test User',
        wsid: 'Test WSID',
      },
      '/Common/SearchItem',
      true
    );
    expect(component.searchAutocompleteFromItem).toBe('mocked data');
  });

  //getWareAndCurOrd cases
  it('should fetch warehouses and count orders on successful request', fakeAsync(() => {
    const warehouses = ['Warehouse 1', 'Warehouse 2'];
    const countOrders = ['Order 1', 'Order 2'];
    const response = {
      data: {
        warehouses: warehouses,
        countOrders: countOrders,
      },
      isExecuted: true,
    };

    spyOn(component.adminService, 'create').and.returnValue(of(response));
    spyOn(component.toastService, 'error');

    component.getWareAndCurOrd();

    tick();

    expect(component.adminService.create).toHaveBeenCalledWith(
      { username: component.userData.username, wsid: component.userData.wsid },
      '/Admin/GetCountBatches'
    );

    expect(component.warehouses).toEqual(warehouses);
    expect(component.curCountOrders).toEqual(countOrders);
    expect(component.toastService.error).not.toHaveBeenCalled();
  }));

  it('should show error message on unsuccessful request', fakeAsync(() => {
    const errorMessage = 'Something went wrong';

    spyOn(component.adminService, 'create').and.returnValue(
      throwError(errorMessage)
    );
    spyOn(component.toastService, 'error');

    component.getWareAndCurOrd();

    tick();

    expect(component.adminService.create).toHaveBeenCalled();
    expect(component.warehouses).toEqual([]);
    expect(component.curCountOrders).toEqual([]);
    expect(component.toastService.error).toHaveBeenCalledWith(
      errorMessage,
      'Error!',
      {
        positionClass: 'toast-bottom-right',
        timeOut: 2000,
      }
    );
  }));

  it('should show error message on exception', fakeAsync(() => {
    const errorMessage = 'Something went wrong';
    spyOn(component.adminService, 'create').and.throwError(errorMessage);
    spyOn(component.toastService, 'error');

    component.getWareAndCurOrd();

    tick();

    expect(component.adminService.create).toHaveBeenCalled();
    expect(component.warehouses).toEqual([]);
    expect(component.curCountOrders).toEqual([]);
    expect(component.toastService.error).toHaveBeenCalledWith(
      errorMessage,
      'Error!',
      {
        positionClass: 'toast-bottom-right',
        timeOut: 2000,
      }
    );
  }));


 it('should call the adminService create method with the correct payload', () => {
    spyOn(component.adminService, 'create').and.callThrough();

    const ids = [1, 2, 3];
    const expectedPayload = {
      InvMapIDs: ids,
      username: component.userData.username,
      wsid: component.userData.wsid,
    };

    component.insertCCQueue(ids);

    expect(component.adminService.create).toHaveBeenCalledWith(
      expectedPayload,
      '/Admin/CycleCountQueueInsert'
    );
  });

  
  
  it('should open confirmation dialog and insert into queue when user selects "Yes"', () => {
    dialogRef.afterClosed.and.returnValue(of('yes')); // Mock the dialog.open method
    // Create a spy for the adminService's 'create' method to return a mock response
    const adminServiceSpy = spyOn(component.adminService, 'create').and.returnValue(of({ data: {}, isExecuted: true }));

    // Set up test data
    // component.dataSource.data = [ 1 , 2, 3];
    component.userData = { username: 'umar', wsid: 'TESTWSID' };

    // Trigger the method
    component.insertQueue();

    // Expectations
    expect(dialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      height: 'auto',
      width: '786px',
      autoFocus: jasmine.any(String),
      data: {
        message: 'Would you like to Insert into Queue ?',
        heading: 'Insert Into Queue',
      },
    });

    // expect(adminServiceSpy).toHaveBeenCalledWith(
    //   {
    //     InvMapIDs: [1, 2, 3],
    //     username: 'test',
    //     wsid: '123',
    //   },
    //   '/Admin/CycleCountQueueInsert'
    // );
    // expect(component.insertCCQueue).toHaveBeenCalledWith([1, 2, 3]);
  });
});

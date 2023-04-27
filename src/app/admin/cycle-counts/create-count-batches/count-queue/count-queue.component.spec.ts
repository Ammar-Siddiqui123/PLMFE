import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CCBCountQueueComponent } from './count-queue.component';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AdminService } from 'src/app/admin/admin.service';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';



fdescribe('CCBCountQueueComponent', () => {
  let component: CCBCountQueueComponent;
  let fixture: ComponentFixture<CCBCountQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CCBCountQueueComponent],
      imports: [HttpClientTestingModule,OverlayModule,MatDialogModule, MatIconModule,ToastrModule.forRoot()],
      providers: [AdminService, MatDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CCBCountQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should update dataSource, customPagination.total, noData, and call getCount() when there is at least one record in invCycleCount array', () => {
//   // Arrange
//   const mockResponse = {
//     isExecuted: true,
//     data: {
//       invCycleCount: [{
//         id: 1,
//         name: 'Record 1',
//         // ...
//       }],
//       recordsFiltered: 1,
//       recordsTotal: 2,
//     },
//   };
//   const adminServiceSpy = spyOn(component.adminService, 'get').and.returnValue(of(mockResponse));
  
//   // Act
//   component.getCountQue();
  
//   // Assert
//   expect(adminServiceSpy).toHaveBeenCalledWith({
//     userName: component.userData.userName,
//     wsid: component.userData.wsid,
//     draw: 1,
//     sRow: component.customPagination.startIndex,
//     eRow: component.customPagination.endIndex,
//     sortColumnIndex: component.sortColumn.columnIndex,
//     sortOrder: component.sortColumn.sortOrder,
//   }, '/Admin/GetCCQueue');
  
//   expect(component.dataSource.data).toEqual(mockResponse.data.invCycleCount);
//   expect(component.customPagination.total).toBe(mockResponse.data.recordsFiltered);
//   expect(component.noData).toBeTrue();
//   expect(component.getCount).toHaveBeenCalledWith(mockResponse.data.recordsTotal);
// });
});

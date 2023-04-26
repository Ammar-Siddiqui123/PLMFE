import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CCBCountQueueComponent } from './count-queue.component';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AdminService } from 'src/app/admin/admin.service';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

describe('CCBCountQueueComponent', () => {
  let component: CCBCountQueueComponent;
  let fixture: ComponentFixture<CCBCountQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCBCountQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCBCountQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// fdescribe('AdminComponent', () => {
//   let component: AdminComponent;
//   let fixture: ComponentFixture<AdminComponent>;
//   let adminService: AdminService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AdminComponent],
//       providers: [AdminService],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AdminComponent);
//     component = fixture.componentInstance;
//     adminService = TestBed.inject(AdminService);
//     fixture.detectChanges();
//   });

//   it('should set dataSource and pagination data if response data is present', fakeAsync(() => {
//     // arrange
//     spyOn(adminService, 'get').and.returnValue(
//       of({ isExecuted: true, data: { invCycleCount: [{}] }, recordsFiltered: 5, recordsTotal: 5 })
//     );



//     // assert
//     expect(adminService.get).toHaveBeenCalled();
//     expect(component.dataSource).toEqual(jasmine.any(MatTableDataSource));
//     expect(component.customPagination.total).toEqual(5);
   
//   }));

//   it('should set pagination data if response data is empty', fakeAsync(() => {
//     // arrange
//     spyOn(adminService, 'get').and.returnValue(
//       of({ isExecuted: true, data: { invCycleCount: [] }, recordsFiltered: 0, recordsTotal: 0 })
//     );


//     // assert
//     expect(adminService.get).toHaveBeenCalled();
//     expect(component.dataSource).toBeUndefined();
//     expect(component.customPagination.total).toEqual(0);
//   }));
// });

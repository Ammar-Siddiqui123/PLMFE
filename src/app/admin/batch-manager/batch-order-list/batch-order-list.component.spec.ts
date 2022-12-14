import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchOrderListComponent } from './batch-order-list.component';

describe('BatchOrderListComponent', () => {
  let component: BatchOrderListComponent;
  let fixture: ComponentFixture<BatchOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

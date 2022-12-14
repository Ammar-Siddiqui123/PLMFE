import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSelectedOrdersComponent } from './batch-selected-orders.component';

describe('BatchSelectedOrdersComponent', () => {
  let component: BatchSelectedOrdersComponent;
  let fixture: ComponentFixture<BatchSelectedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchSelectedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchSelectedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeAllocateOrdersComponent } from './de-allocate-orders.component';

describe('DeAllocateOrdersComponent', () => {
  let component: DeAllocateOrdersComponent;
  let fixture: ComponentFixture<DeAllocateOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeAllocateOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeAllocateOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

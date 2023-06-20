import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeallocateOrderComponent } from './deallocate-order.component';

describe('DeallocateOrderComponent', () => {
  let component: DeallocateOrderComponent;
  let fixture: ComponentFixture<DeallocateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeallocateOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeallocateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

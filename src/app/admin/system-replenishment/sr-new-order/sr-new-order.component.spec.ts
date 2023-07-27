import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrNewOrderComponent } from './sr-new-order.component';

describe('SrNewOrderComponent', () => {
  let component: SrNewOrderComponent;
  let fixture: ComponentFixture<SrNewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrNewOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

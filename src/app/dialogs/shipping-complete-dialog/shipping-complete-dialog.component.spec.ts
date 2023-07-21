import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCompleteDialogComponent } from './shipping-complete-dialog.component';

describe('ShippingCompleteDialogComponent', () => {
  let component: ShippingCompleteDialogComponent;
  let fixture: ComponentFixture<ShippingCompleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingCompleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingCompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

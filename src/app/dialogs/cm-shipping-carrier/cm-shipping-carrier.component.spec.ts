import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmShippingCarrierComponent } from './cm-shipping-carrier.component';

describe('CmShippingCarrierComponent', () => {
  let component: CmShippingCarrierComponent;
  let fixture: ComponentFixture<CmShippingCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmShippingCarrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmShippingCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmShippingTransactionComponent } from './cm-shipping-transaction.component';

describe('CmShippingTransactionComponent', () => {
  let component: CmShippingTransactionComponent;
  let fixture: ComponentFixture<CmShippingTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmShippingTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmShippingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

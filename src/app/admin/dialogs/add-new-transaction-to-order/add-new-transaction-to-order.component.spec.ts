import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTransactionToOrderComponent } from './add-new-transaction-to-order.component';

describe('AddNewTransactionToOrderComponent', () => {
  let component: AddNewTransactionToOrderComponent;
  let fixture: ComponentFixture<AddNewTransactionToOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTransactionToOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTransactionToOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

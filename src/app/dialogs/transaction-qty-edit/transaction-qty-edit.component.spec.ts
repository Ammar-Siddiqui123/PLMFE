import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionQtyEditComponent } from './transaction-qty-edit.component';

describe('TransactionQtyEditComponent', () => {
  let component: TransactionQtyEditComponent;
  let fixture: ComponentFixture<TransactionQtyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionQtyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionQtyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

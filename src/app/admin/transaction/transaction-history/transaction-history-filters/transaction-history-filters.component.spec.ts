import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryFiltersComponent } from './transaction-history-filters.component';

describe('TransactionHistoryFiltersComponent', () => {
  let component: TransactionHistoryFiltersComponent;
  let fixture: ComponentFixture<TransactionHistoryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

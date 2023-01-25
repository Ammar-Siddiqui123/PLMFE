import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryListComponent } from './transaction-history-list.component';

describe('TransactionHistoryListComponent', () => {
  let component: TransactionHistoryListComponent;
  let fixture: ComponentFixture<TransactionHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

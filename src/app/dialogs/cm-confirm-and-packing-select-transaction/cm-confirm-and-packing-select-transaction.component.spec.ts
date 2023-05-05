import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmConfirmAndPackingSelectTransactionComponent } from './cm-confirm-and-packing-select-transaction.component';

describe('CmConfirmAndPackingSelectTransactionComponent', () => {
  let component: CmConfirmAndPackingSelectTransactionComponent;
  let fixture: ComponentFixture<CmConfirmAndPackingSelectTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmConfirmAndPackingSelectTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmConfirmAndPackingSelectTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

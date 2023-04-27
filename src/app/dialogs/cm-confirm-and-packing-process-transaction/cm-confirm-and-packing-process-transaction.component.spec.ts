import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmConfirmAndPackingProcessTransactionComponent } from './cm-confirm-and-packing-process-transaction.component';

describe('CmConfirmAndPackingProcessTransactionComponent', () => {
  let component: CmConfirmAndPackingProcessTransactionComponent;
  let fixture: ComponentFixture<CmConfirmAndPackingProcessTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmConfirmAndPackingProcessTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmConfirmAndPackingProcessTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

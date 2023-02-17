import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionTransactionForToteExtendComponent } from './selection-transaction-for-tote-extend.component';

describe('SelectionTransactionForToteExtendComponent', () => {
  let component: SelectionTransactionForToteExtendComponent;
  let fixture: ComponentFixture<SelectionTransactionForToteExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionTransactionForToteExtendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionTransactionForToteExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionTransactionForToteComponent } from './selection-transaction-for-tote.component';

describe('SelectionTransactionForToteComponent', () => {
  let component: SelectionTransactionForToteComponent;
  let fixture: ComponentFixture<SelectionTransactionForToteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionTransactionForToteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionTransactionForToteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

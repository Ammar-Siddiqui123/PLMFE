import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualTransactionsComponent } from './manual-transactions.component';

describe('ManualTransactionsComponent', () => {
  let component: ManualTransactionsComponent;
  let fixture: ComponentFixture<ManualTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

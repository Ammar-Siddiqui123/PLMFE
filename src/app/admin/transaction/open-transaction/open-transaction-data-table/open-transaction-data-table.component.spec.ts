import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTransactionDataTableComponent } from './open-transaction-data-table.component';

describe('OpenTransactionDataTableComponent', () => {
  let component: OpenTransactionDataTableComponent;
  let fixture: ComponentFixture<OpenTransactionDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTransactionDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTransactionDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

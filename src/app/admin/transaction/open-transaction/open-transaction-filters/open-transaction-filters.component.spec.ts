import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTransactionFiltersComponent } from './open-transaction-filters.component';

describe('OpenTransactionFiltersComponent', () => {
  let component: OpenTransactionFiltersComponent;
  let fixture: ComponentFixture<OpenTransactionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTransactionFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTransactionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocessTransactionDetailComponent } from './reprocess-transaction-detail.component';

describe('ReprocessTransactionDetailComponent', () => {
  let component: ReprocessTransactionDetailComponent;
  let fixture: ComponentFixture<ReprocessTransactionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocessTransactionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReprocessTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

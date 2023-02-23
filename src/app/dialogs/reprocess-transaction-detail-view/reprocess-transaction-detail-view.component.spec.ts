import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocessTransactionDetailViewComponent } from './reprocess-transaction-detail-view.component';

describe('ReprocessTransactionDetailViewComponent', () => {
  let component: ReprocessTransactionDetailViewComponent;
  let fixture: ComponentFixture<ReprocessTransactionDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocessTransactionDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReprocessTransactionDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocessedTransactionComponent } from './reprocessed-transaction.component';

describe('ReprocessedTransactionComponent', () => {
  let component: ReprocessedTransactionComponent;
  let fixture: ComponentFixture<ReprocessedTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocessedTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReprocessedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

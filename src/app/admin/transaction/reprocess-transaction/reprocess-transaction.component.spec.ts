import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocessTransactionComponent } from './reprocess-transaction.component';

describe('ReprocessTransactionComponent', () => {
  let component: ReprocessTransactionComponent;
  let fixture: ComponentFixture<ReprocessTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocessTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReprocessTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

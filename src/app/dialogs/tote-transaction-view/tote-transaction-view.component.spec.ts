import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToteTransactionViewComponent } from './tote-transaction-view.component';

describe('ToteTransactionViewComponent', () => {
  let component: ToteTransactionViewComponent;
  let fixture: ComponentFixture<ToteTransactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToteTransactionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToteTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

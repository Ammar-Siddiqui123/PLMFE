import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelTransactionsComponent } from './reel-transactions.component';

describe('ReelTransactionsComponent', () => {
  let component: ReelTransactionsComponent;
  let fixture: ComponentFixture<ReelTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReelTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReelTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

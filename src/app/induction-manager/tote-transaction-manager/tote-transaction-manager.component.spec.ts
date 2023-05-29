import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToteTransactionManagerComponent } from './tote-transaction-manager.component';

describe('ToteTransactionManagerComponent', () => {
  let component: ToteTransactionManagerComponent;
  let fixture: ComponentFixture<ToteTransactionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToteTransactionManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToteTransactionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

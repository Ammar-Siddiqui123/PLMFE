import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTransactionOnHoldComponent } from './open-transaction-on-hold.component';

describe('OpenTransactionOnHoldComponent', () => {
  let component: OpenTransactionOnHoldComponent;
  let fixture: ComponentFixture<OpenTransactionOnHoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTransactionOnHoldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTransactionOnHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

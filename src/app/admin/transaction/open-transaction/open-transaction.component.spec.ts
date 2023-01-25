import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTransactionComponent } from './open-transaction.component';

describe('OpenTransactionComponent', () => {
  let component: OpenTransactionComponent;
  let fixture: ComponentFixture<OpenTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

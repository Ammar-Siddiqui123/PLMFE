import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmEditTransactionComponent } from './om-edit-transaction.component';

describe('OmEditTransactionComponent', () => {
  let component: OmEditTransactionComponent;
  let fixture: ComponentFixture<OmEditTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmEditTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmEditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmAddTransactionComponent } from './om-add-transaction.component';

describe('OmAddTransactionComponent', () => {
  let component: OmAddTransactionComponent;
  let fixture: ComponentFixture<OmAddTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmAddTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmAddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

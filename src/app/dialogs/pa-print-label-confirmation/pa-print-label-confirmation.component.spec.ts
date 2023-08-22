import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaPrintLabelConfirmationComponent } from './pa-print-label-confirmation.component';

describe('PaPrintLabelConfirmationComponent', () => {
  let component: PaPrintLabelConfirmationComponent;
  let fixture: ComponentFixture<PaPrintLabelConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaPrintLabelConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaPrintLabelConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

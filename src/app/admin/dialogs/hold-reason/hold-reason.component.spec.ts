import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldReasonComponent } from './hold-reason.component';

describe('HoldReasonComponent', () => {
  let component: HoldReasonComponent;
  let fixture: ComponentFixture<HoldReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

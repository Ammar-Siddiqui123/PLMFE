import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrChooseReportTypeComponent } from './br-choose-report-type.component';

describe('BrChooseReportTypeComponent', () => {
  let component: BrChooseReportTypeComponent;
  let fixture: ComponentFixture<BrChooseReportTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrChooseReportTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrChooseReportTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

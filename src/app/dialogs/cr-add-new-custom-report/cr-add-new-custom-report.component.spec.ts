import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrAddNewCustomReportComponent } from './cr-add-new-custom-report.component';

describe('CrAddNewCustomReportComponent', () => {
  let component: CrAddNewCustomReportComponent;
  let fixture: ComponentFixture<CrAddNewCustomReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrAddNewCustomReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrAddNewCustomReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

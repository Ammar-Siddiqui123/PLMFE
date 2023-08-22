import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPrinterSetupComponent } from './d-printer-setup.component';

describe('DPrinterSetupComponent', () => {
  let component: DPrinterSetupComponent;
  let fixture: ComponentFixture<DPrinterSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DPrinterSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DPrinterSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

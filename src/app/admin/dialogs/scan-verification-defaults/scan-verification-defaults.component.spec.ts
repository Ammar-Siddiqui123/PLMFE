import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanVerificationDefaultsComponent } from './scan-verification-defaults.component';

describe('ScanVerificationDefaultsComponent', () => {
  let component: ScanVerificationDefaultsComponent;
  let fixture: ComponentFixture<ScanVerificationDefaultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanVerificationDefaultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanVerificationDefaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

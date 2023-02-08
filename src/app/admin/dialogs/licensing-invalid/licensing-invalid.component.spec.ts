import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingInvalidComponent } from './licensing-invalid.component';

describe('LicensingInvalidComponent', () => {
  let component: LicensingInvalidComponent;
  let fixture: ComponentFixture<LicensingInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensingInvalidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicensingInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

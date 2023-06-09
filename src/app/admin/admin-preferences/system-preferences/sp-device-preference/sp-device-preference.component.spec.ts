import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDevicePreferenceComponent } from './sp-device-preference.component';

describe('SpDevicePreferenceComponent', () => {
  let component: SpDevicePreferenceComponent;
  let fixture: ComponentFixture<SpDevicePreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpDevicePreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpDevicePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

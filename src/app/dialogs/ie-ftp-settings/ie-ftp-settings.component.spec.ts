import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeFtpSettingsComponent } from './ie-ftp-settings.component';

describe('IeFtpSettingsComponent', () => {
  let component: IeFtpSettingsComponent;
  let fixture: ComponentFixture<IeFtpSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeFtpSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeFtpSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

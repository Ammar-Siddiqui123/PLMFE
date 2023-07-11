import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeSystemSettingsComponent } from './ie-system-settings.component';

describe('IeSystemSettingsComponent', () => {
  let component: IeSystemSettingsComponent;
  let fixture: ComponentFixture<IeSystemSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeSystemSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeSystemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

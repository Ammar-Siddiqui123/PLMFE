import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeTransferSettingsComponent } from './ie-transfer-settings.component';

describe('IeTransferSettingsComponent', () => {
  let component: IeTransferSettingsComponent;
  let fixture: ComponentFixture<IeTransferSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeTransferSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeTransferSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

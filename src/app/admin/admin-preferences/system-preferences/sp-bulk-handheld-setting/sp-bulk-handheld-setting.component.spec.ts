import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBulkHandheldSettingComponent } from './sp-bulk-handheld-setting.component';

describe('SpBulkHandheldSettingComponent', () => {
  let component: SpBulkHandheldSettingComponent;
  let fixture: ComponentFixture<SpBulkHandheldSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpBulkHandheldSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpBulkHandheldSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

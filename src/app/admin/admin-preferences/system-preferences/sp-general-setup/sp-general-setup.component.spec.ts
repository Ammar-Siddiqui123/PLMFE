import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpGeneralSetupComponent } from './sp-general-setup.component';

describe('SpGeneralSetupComponent', () => {
  let component: SpGeneralSetupComponent;
  let fixture: ComponentFixture<SpGeneralSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpGeneralSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpGeneralSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpLightTreeSetupComponent } from './sp-light-tree-setup.component';

describe('SpLightTreeSetupComponent', () => {
  let component: SpLightTreeSetupComponent;
  let fixture: ComponentFixture<SpLightTreeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpLightTreeSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpLightTreeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

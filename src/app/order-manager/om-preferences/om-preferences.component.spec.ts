import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmPreferencesComponent } from './om-preferences.component';

describe('OmPreferencesComponent', () => {
  let component: OmPreferencesComponent;
  let fixture: ComponentFixture<OmPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmPreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

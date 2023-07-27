import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrPreferencesComponent } from './fr-preferences.component';

describe('FrPreferencesComponent', () => {
  let component: FrPreferencesComponent;
  let fixture: ComponentFixture<FrPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrPreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

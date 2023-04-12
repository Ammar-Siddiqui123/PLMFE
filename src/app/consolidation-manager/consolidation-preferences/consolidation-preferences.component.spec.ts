import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationPreferencesComponent } from './consolidation-preferences.component';

describe('ConsolidationPreferencesComponent', () => {
  let component: ConsolidationPreferencesComponent;
  let fixture: ComponentFixture<ConsolidationPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidationPreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidationPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

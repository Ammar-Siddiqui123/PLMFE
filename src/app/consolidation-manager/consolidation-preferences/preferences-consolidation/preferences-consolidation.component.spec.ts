import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesConsolidationComponent } from './preferences-consolidation.component';

describe('PreferencesConsolidationComponent', () => {
  let component: PreferencesConsolidationComponent;
  let fixture: ComponentFixture<PreferencesConsolidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesConsolidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

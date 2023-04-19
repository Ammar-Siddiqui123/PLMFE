import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesShippingComponent } from './preferences-shipping.component';

describe('PreferencesShippingComponent', () => {
  let component: PreferencesShippingComponent;
  let fixture: ComponentFixture<PreferencesShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

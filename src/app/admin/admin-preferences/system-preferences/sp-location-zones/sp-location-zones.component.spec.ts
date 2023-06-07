import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpLocationZonesComponent } from './sp-location-zones.component';

describe('SpLocationZonesComponent', () => {
  let component: SpLocationZonesComponent;
  let fixture: ComponentFixture<SpLocationZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpLocationZonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpLocationZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

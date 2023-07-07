import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeAssignLocationsComponent } from './ie-assign-locations.component';

describe('IeAssignLocationsComponent', () => {
  let component: IeAssignLocationsComponent;
  let fixture: ComponentFixture<IeAssignLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeAssignLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeAssignLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

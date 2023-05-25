import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaLocationAssignmentQuantitiesComponent } from './la-location-assignment-quantities.component';

describe('LaLocationAssignmentQuantitiesComponent', () => {
  let component: LaLocationAssignmentQuantitiesComponent;
  let fixture: ComponentFixture<LaLocationAssignmentQuantitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaLocationAssignmentQuantitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaLocationAssignmentQuantitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

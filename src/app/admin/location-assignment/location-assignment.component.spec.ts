import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAssignmentComponent } from './location-assignment.component';

describe('LocationAssignmentComponent', () => {
  let component: LocationAssignmentComponent;
  let fixture: ComponentFixture<LocationAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

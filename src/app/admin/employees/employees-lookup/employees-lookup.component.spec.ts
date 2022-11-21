import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesLookupComponent } from './employees-lookup.component';

describe('EmployeesLookupComponent', () => {
  let component: EmployeesLookupComponent;
  let fixture: ComponentFixture<EmployeesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

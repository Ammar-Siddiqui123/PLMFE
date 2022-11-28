import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePickupLevelComponent } from './employee-pickup-level.component';

describe('EmployeePickupLevelComponent', () => {
  let component: EmployeePickupLevelComponent;
  let fixture: ComponentFixture<EmployeePickupLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePickupLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePickupLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

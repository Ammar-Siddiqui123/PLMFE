import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedFunctionsComponent } from './assigned-functions.component';

describe('AssignedFunctionsComponent', () => {
  let component: AssignedFunctionsComponent;
  let fixture: ComponentFixture<AssignedFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedFunctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

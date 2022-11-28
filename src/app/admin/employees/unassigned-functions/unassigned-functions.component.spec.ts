import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedFunctionsComponent } from './unassigned-functions.component';

describe('UnassignedFunctionsComponent', () => {
  let component: UnassignedFunctionsComponent;
  let fixture: ComponentFixture<UnassignedFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignedFunctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnassignedFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

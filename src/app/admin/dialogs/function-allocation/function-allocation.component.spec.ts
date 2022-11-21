import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionAllocationComponent } from './function-allocation.component';

describe('FunctionAllocationComponent', () => {
  let component: FunctionAllocationComponent;
  let fixture: ComponentFixture<FunctionAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

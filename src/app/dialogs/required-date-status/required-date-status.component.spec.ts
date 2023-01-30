import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredDateStatusComponent } from './required-date-status.component';

describe('RequiredDateStatusComponent', () => {
  let component: RequiredDateStatusComponent;
  let fixture: ComponentFixture<RequiredDateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredDateStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredDateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

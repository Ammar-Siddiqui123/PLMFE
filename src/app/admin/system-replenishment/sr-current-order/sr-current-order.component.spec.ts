import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrCurrentOrderComponent } from './sr-current-order.component';

describe('SrCurrentOrderComponent', () => {
  let component: SrCurrentOrderComponent;
  let fixture: ComponentFixture<SrCurrentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrCurrentOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrCurrentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

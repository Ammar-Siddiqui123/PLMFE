import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrDeleteOrderComponent } from './sr-delete-order.component';

describe('SrDeleteOrderComponent', () => {
  let component: SrDeleteOrderComponent;
  let fixture: ComponentFixture<SrDeleteOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrDeleteOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrDeleteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

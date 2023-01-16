import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranSelectOrderComponent } from './tran-select-order.component';

describe('TranSelectOrderComponent', () => {
  let component: TranSelectOrderComponent;
  let fixture: ComponentFixture<TranSelectOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranSelectOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranSelectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

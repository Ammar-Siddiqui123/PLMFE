import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmShippingComponent } from './cm-shipping.component';

describe('CmShippingComponent', () => {
  let component: CmShippingComponent;
  let fixture: ComponentFixture<CmShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

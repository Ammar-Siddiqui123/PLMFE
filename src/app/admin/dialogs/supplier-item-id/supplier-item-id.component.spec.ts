import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierItemIdComponent } from './supplier-item-id.component';

describe('SupplierItemIdComponent', () => {
  let component: SupplierItemIdComponent;
  let fixture: ComponentFixture<SupplierItemIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierItemIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierItemIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

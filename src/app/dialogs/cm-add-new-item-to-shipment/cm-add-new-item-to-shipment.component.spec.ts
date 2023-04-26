import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmAddNewItemToShipmentComponent } from './cm-add-new-item-to-shipment.component';

describe('CmAddNewItemToShipmentComponent', () => {
  let component: CmAddNewItemToShipmentComponent;
  let fixture: ComponentFixture<CmAddNewItemToShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmAddNewItemToShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmAddNewItemToShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmShipEditQtyComponent } from './cm-ship-edit-qty.component';

describe('CmShipEditQtyComponent', () => {
  let component: CmShipEditQtyComponent;
  let fixture: ComponentFixture<CmShipEditQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmShipEditQtyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmShipEditQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

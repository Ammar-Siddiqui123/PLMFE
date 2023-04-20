import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmShipEditConIdComponent } from './cm-ship-edit-con-id.component';

describe('CmShipEditConIdComponent', () => {
  let component: CmShipEditConIdComponent;
  let fixture: ComponentFixture<CmShipEditConIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmShipEditConIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmShipEditConIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

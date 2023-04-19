import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmShipSplitLineComponent } from './cm-ship-split-line.component';

describe('CmShipSplitLineComponent', () => {
  let component: CmShipSplitLineComponent;
  let fixture: ComponentFixture<CmShipSplitLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmShipSplitLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmShipSplitLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

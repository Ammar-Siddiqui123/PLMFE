import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmConfirmAndPackingComponent } from './cm-confirm-and-packing.component';

describe('CmConfirmAndPackingComponent', () => {
  let component: CmConfirmAndPackingComponent;
  let fixture: ComponentFixture<CmConfirmAndPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmConfirmAndPackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmConfirmAndPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

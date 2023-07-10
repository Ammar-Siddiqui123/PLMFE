import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrFlowrackReplenishmentComponent } from './fr-flowrack-replenishment.component';

describe('FrFlowrackReplenishmentComponent', () => {
  let component: FrFlowrackReplenishmentComponent;
  let fixture: ComponentFixture<FrFlowrackReplenishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrFlowrackReplenishmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrFlowrackReplenishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

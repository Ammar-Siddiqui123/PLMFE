import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowrackReplenishmentComponent } from './flowrack-replenishment.component';

describe('FlowrackReplenishmentComponent', () => {
  let component: FlowrackReplenishmentComponent;
  let fixture: ComponentFixture<FlowrackReplenishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowrackReplenishmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowrackReplenishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

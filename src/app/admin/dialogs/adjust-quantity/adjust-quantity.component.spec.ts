import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustQuantityComponent } from './adjust-quantity.component';

describe('AddInvMapLocationComponent', () => {
  let component: AdjustQuantityComponent;
  let fixture: ComponentFixture<AdjustQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

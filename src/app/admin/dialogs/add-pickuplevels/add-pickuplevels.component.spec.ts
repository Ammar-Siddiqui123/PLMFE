import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPickuplevelsComponent } from './add-pickuplevels.component';

describe('AddPickuplevelsComponent', () => {
  let component: AddPickuplevelsComponent;
  let fixture: ComponentFixture<AddPickuplevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPickuplevelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPickuplevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

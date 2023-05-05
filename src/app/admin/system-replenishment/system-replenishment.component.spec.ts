import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemReplenishmentComponent } from './system-replenishment.component';

describe('SystemReplenishmentComponent', () => {
  let component: SystemReplenishmentComponent;
  let fixture: ComponentFixture<SystemReplenishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemReplenishmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemReplenishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

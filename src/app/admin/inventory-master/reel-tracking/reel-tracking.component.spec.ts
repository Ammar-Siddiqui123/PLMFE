import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelTrackingComponent } from './reel-tracking.component';

describe('ReelTrackingComponent', () => {
  let component: ReelTrackingComponent;
  let fixture: ComponentFixture<ReelTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReelTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReelTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

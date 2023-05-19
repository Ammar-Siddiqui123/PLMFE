import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagingLocationOrderComponent } from './staging-location-order.component';

describe('StagingLocationOrderComponent', () => {
  let component: StagingLocationOrderComponent;
  let fixture: ComponentFixture<StagingLocationOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagingLocationOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagingLocationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

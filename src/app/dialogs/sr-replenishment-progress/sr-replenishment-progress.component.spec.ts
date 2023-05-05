import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrReplenishmentProgressComponent } from './sr-replenishment-progress.component';

describe('SrReplenishmentProgressComponent', () => {
  let component: SrReplenishmentProgressComponent;
  let fixture: ComponentFixture<SrReplenishmentProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrReplenishmentProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrReplenishmentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

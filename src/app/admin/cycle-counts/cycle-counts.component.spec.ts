import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleCountsComponent } from './cycle-counts.component';

describe('CycleCountsComponent', () => {
  let component: CycleCountsComponent;
  let fixture: ComponentFixture<CycleCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleCountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

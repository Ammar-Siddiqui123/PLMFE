import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsLookupComponent } from './statistics-lookup.component';

describe('StatisticsLookupComponent', () => {
  let component: StatisticsLookupComponent;
  let fixture: ComponentFixture<StatisticsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterItemNumbersComponent } from './filter-item-numbers.component';

describe('FilterItemNumbersComponent', () => {
  let component: FilterItemNumbersComponent;
  let fixture: ComponentFixture<FilterItemNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterItemNumbersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterItemNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

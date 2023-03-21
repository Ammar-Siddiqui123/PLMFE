import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCBCreateCountsComponent } from './create-counts.component';

describe('CCBCreateCountsComponent', () => {
  let component: CCBCreateCountsComponent;
  let fixture: ComponentFixture<CCBCreateCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCBCreateCountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCBCreateCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

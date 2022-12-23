import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCountsComponent } from './create-counts.component';

describe('CreateCountsComponent', () => {
  let component: CreateCountsComponent;
  let fixture: ComponentFixture<CreateCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

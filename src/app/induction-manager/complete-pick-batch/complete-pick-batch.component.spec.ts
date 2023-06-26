import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePickBatchComponent } from './complete-pick-batch.component';

describe('CompletePickBatchComponent', () => {
  let component: CompletePickBatchComponent;
  let fixture: ComponentFixture<CompletePickBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletePickBatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletePickBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

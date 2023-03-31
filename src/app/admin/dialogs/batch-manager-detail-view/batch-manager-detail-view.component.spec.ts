import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchManagerDetailViewComponent } from './batch-manager-detail-view.component';

describe('BatchManagerDetailViewComponent', () => {
  let component: BatchManagerDetailViewComponent;
  let fixture: ComponentFixture<BatchManagerDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchManagerDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchManagerDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

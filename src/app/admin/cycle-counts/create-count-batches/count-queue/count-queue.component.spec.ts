import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCBCountQueueComponent } from './count-queue.component';

describe('CCBCountQueueComponent', () => {
  let component: CCBCountQueueComponent;
  let fixture: ComponentFixture<CCBCountQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCBCountQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCBCountQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCCountQueueComponent } from './cccount-queue.component';

describe('CCCountQueueComponent', () => {
  let component: CCCountQueueComponent;
  let fixture: ComponentFixture<CCCountQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCCountQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCCountQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

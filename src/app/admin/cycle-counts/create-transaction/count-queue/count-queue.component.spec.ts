import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountQueueComponent } from './count-queue.component';

describe('CountQueueComponent', () => {
  let component: CountQueueComponent;
  let fixture: ComponentFixture<CountQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

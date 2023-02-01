import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPicksComponent } from './process-picks.component';

describe('ProcessPicksComponent', () => {
  let component: ProcessPicksComponent;
  let fixture: ComponentFixture<ProcessPicksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessPicksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

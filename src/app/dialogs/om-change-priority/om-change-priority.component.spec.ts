import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmChangePriorityComponent } from './om-change-priority.component';

describe('OmChangePriorityComponent', () => {
  let component: OmChangePriorityComponent;
  let fixture: ComponentFixture<OmChangePriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmChangePriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmChangePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

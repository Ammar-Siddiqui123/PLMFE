import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanZoneAllocationConflictComponent } from './kanban-zone-allocation-conflict.component';

describe('KanbanZoneAllocationConflictComponent', () => {
  let component: KanbanZoneAllocationConflictComponent;
  let fixture: ComponentFixture<KanbanZoneAllocationConflictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanZoneAllocationConflictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanZoneAllocationConflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

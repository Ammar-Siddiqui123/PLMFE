import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseConnectionsComponent } from './database-connections.component';

describe('DatabaseConnectionsComponent', () => {
  let component: DatabaseConnectionsComponent;
  let fixture: ComponentFixture<DatabaseConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseConnectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

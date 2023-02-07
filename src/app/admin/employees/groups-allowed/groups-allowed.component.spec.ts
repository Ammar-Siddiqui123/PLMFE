import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAllowedComponent } from './groups-allowed.component';

describe('GroupsAllowedComponent', () => {
  let component: GroupsAllowedComponent;
  let fixture: ComponentFixture<GroupsAllowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsAllowedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsLookupComponent } from './groups-lookup.component';

describe('GroupsLookupComponent', () => {
  let component: GroupsLookupComponent;
  let fixture: ComponentFixture<GroupsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

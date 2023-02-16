import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFieldsEditComponent } from './user-fields-edit.component';

describe('UserFieldsEditComponent', () => {
  let component: UserFieldsEditComponent;
  let fixture: ComponentFixture<UserFieldsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFieldsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFieldsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

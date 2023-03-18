import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetItemLocationComponent } from './set-item-location.component';

describe('SetItemLocationComponent', () => {
  let component: SetItemLocationComponent;
  let fixture: ComponentFixture<SetItemLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetItemLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetItemLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

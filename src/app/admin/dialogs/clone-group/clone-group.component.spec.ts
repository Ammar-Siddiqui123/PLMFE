import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneGroupComponent } from './clone-group.component';

describe('CloneGroupComponent', () => {
  let component: CloneGroupComponent;
  let fixture: ComponentFixture<CloneGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloneGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloneGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

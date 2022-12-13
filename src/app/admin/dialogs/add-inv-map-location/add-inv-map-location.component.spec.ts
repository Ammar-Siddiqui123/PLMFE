import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvMapLocationComponent } from './add-inv-map-location.component';

describe('AddInvMapLocationComponent', () => {
  let component: AddInvMapLocationComponent;
  let fixture: ComponentFixture<AddInvMapLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvMapLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvMapLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

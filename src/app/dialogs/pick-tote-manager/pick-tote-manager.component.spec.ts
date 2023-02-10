import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickToteManagerComponent } from './pick-tote-manager.component';

describe('PickToteManagerComponent', () => {
  let component: PickToteManagerComponent;
  let fixture: ComponentFixture<PickToteManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickToteManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickToteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

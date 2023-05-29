import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImToteManagerComponent } from './im-tote-manager.component';

describe('ImToteManagerComponent', () => {
  let component: ImToteManagerComponent;
  let fixture: ComponentFixture<ImToteManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImToteManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImToteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

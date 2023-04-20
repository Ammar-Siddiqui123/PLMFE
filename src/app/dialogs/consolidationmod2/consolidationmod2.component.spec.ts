import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consolidationmod2Component } from './consolidationmod2.component';

describe('Consolidationmod2Component', () => {
  let component: Consolidationmod2Component;
  let fixture: ComponentFixture<Consolidationmod2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Consolidationmod2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consolidationmod2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

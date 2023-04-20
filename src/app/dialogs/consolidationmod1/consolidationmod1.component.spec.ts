import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consolidationmod1Component } from './consolidationmod1.component';

describe('Consolidationmod1Component', () => {
  let component: Consolidationmod1Component;
  let fixture: ComponentFixture<Consolidationmod1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Consolidationmod1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consolidationmod1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocityCodeComponent } from './velocity-code.component';

describe('VelocityCodeComponent', () => {
  let component: VelocityCodeComponent;
  let fixture: ComponentFixture<VelocityCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VelocityCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VelocityCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

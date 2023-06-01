import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrNumpadComponent } from './fr-numpad.component';

describe('FrNumpadComponent', () => {
  let component: FrNumpadComponent;
  let fixture: ComponentFixture<FrNumpadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrNumpadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrNumpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrvComponent } from './wrv.component';

describe('WrvComponent', () => {
  let component: WrvComponent;
  let fixture: ComponentFixture<WrvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrdComponent } from './wrd.component';

describe('WrdComponent', () => {
  let component: WrdComponent;
  let fixture: ComponentFixture<WrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

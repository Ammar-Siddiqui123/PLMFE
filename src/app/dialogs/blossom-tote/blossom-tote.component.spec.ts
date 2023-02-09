import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlossomToteComponent } from './blossom-tote.component';

describe('BlossomToteComponent', () => {
  let component: BlossomToteComponent;
  let fixture: ComponentFixture<BlossomToteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlossomToteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlossomToteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrvFrontendComponent } from './wrv-frontend.component';

describe('WrvFrontendComponent', () => {
  let component: WrvFrontendComponent;
  let fixture: ComponentFixture<WrvFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrvFrontendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrvFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

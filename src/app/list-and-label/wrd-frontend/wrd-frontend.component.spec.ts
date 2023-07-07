import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrdFrontendComponent } from './wrd-frontend.component';

describe('WrdFrontendComponent', () => {
  let component: WrdFrontendComponent;
  let fixture: ComponentFixture<WrdFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrdFrontendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrdFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

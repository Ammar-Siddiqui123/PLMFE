import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcPrintServiceTestBeginComponent } from './gc-print-service-test-begin.component';

describe('GcPrintServiceTestBeginComponent', () => {
  let component: GcPrintServiceTestBeginComponent;
  let fixture: ComponentFixture<GcPrintServiceTestBeginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcPrintServiceTestBeginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GcPrintServiceTestBeginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

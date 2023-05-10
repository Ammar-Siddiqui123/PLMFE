import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcPrintServiceTestComponent } from './gc-print-service-test.component';

describe('GcPrintServiceTestComponent', () => {
  let component: GcPrintServiceTestComponent;
  let fixture: ComponentFixture<GcPrintServiceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcPrintServiceTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GcPrintServiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

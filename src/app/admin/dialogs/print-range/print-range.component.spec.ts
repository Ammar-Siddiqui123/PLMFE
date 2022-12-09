import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRangeComponent } from './print-range.component';

describe('PrintRangeComponent', () => {
  let component: PrintRangeComponent;
  let fixture: ComponentFixture<PrintRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

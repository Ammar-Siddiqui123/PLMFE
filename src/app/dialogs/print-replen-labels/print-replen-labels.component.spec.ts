import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReplenLabelsComponent } from './print-replen-labels.component';

describe('PrintReplenLabelsComponent', () => {
  let component: PrintReplenLabelsComponent;
  let fixture: ComponentFixture<PrintReplenLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintReplenLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintReplenLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

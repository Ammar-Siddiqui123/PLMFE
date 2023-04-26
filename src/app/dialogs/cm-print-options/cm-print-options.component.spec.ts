import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPrintOptionsComponent } from './cm-print-options.component';

describe('CmPrintOptionsComponent', () => {
  let component: CmPrintOptionsComponent;
  let fixture: ComponentFixture<CmPrintOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmPrintOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmPrintOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

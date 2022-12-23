import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCDiscrepanciesComponent } from './ccdiscrepancies.component';

describe('CCDiscrepanciesComponent', () => {
  let component: CCDiscrepanciesComponent;
  let fixture: ComponentFixture<CCDiscrepanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCDiscrepanciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCDiscrepanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanCodesComponent } from './scan-codes.component';

describe('ScanCodesComponent', () => {
  let component: ScanCodesComponent;
  let fixture: ComponentFixture<ScanCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanCodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

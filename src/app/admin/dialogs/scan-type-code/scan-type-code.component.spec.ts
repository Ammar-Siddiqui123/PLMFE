import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanTypeCodeComponent } from './scan-type-code.component';

describe('ScanTypeCodeComponent', () => {
  let component: ScanTypeCodeComponent;
  let fixture: ComponentFixture<ScanTypeCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanTypeCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanTypeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

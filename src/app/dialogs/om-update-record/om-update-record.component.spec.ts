import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmUpdateRecordComponent } from './om-update-record.component';

describe('OmUpdateRecordComponent', () => {
  let component: OmUpdateRecordComponent;
  let fixture: ComponentFixture<OmUpdateRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmUpdateRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmUpdateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

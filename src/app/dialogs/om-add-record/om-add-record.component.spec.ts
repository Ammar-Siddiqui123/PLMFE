import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmAddRecordComponent } from './om-add-record.component';

describe('OmAddRecordComponent', () => {
  let component: OmAddRecordComponent;
  let fixture: ComponentFixture<OmAddRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmAddRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmAddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

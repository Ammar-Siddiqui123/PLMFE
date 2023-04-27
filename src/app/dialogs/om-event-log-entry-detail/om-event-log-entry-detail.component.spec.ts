import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmEventLogEntryDetailComponent } from './om-event-log-entry-detail.component';

describe('OmEventLogEntryDetailComponent', () => {
  let component: OmEventLogEntryDetailComponent;
  let fixture: ComponentFixture<OmEventLogEntryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmEventLogEntryDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmEventLogEntryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

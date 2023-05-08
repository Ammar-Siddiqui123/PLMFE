import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmChangesConfirmationComponent } from './om-changes-confirmation.component';

describe('OmChangesConfirmationComponent', () => {
  let component: OmChangesConfirmationComponent;
  let fixture: ComponentFixture<OmChangesConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmChangesConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmChangesConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

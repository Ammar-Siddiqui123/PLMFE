import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrDeleteConfirmationComponent } from './cr-delete-confirmation.component';

describe('CrDeleteConfirmationComponent', () => {
  let component: CrDeleteConfirmationComponent;
  let fixture: ComponentFixture<CrDeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrDeleteConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

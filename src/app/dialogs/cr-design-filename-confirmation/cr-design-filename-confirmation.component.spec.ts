import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrDesignFilenameConfirmationComponent } from './cr-design-filename-confirmation.component';

describe('CrDesignFilenameConfirmationComponent', () => {
  let component: CrDesignFilenameConfirmationComponent;
  let fixture: ComponentFixture<CrDesignFilenameConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrDesignFilenameConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrDesignFilenameConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

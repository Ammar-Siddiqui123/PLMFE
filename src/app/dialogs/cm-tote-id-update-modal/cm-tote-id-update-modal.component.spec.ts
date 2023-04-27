import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmToteIdUpdateModalComponent } from './cm-tote-id-update-modal.component';

describe('CmToteIdUpdateModalComponent', () => {
  let component: CmToteIdUpdateModalComponent;
  let fixture: ComponentFixture<CmToteIdUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmToteIdUpdateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmToteIdUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

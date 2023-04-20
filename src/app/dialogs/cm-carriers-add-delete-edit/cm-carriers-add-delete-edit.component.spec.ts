import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCarriersAddDeleteEditComponent } from './cm-carriers-add-delete-edit.component';

describe('CmCarriersAddDeleteEditComponent', () => {
  let component: CmCarriersAddDeleteEditComponent;
  let fixture: ComponentFixture<CmCarriersAddDeleteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmCarriersAddDeleteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmCarriersAddDeleteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

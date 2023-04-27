import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmOrderToteConflictComponent } from './cm-order-tote-conflict.component';

describe('CmOrderToteConflictComponent', () => {
  let component: CmOrderToteConflictComponent;
  let fixture: ComponentFixture<CmOrderToteConflictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmOrderToteConflictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmOrderToteConflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

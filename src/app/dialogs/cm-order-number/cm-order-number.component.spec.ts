import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmOrderNumberComponent } from './cm-order-number.component';

describe('CmOrderNumberComponent', () => {
  let component: CmOrderNumberComponent;
  let fixture: ComponentFixture<CmOrderNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmOrderNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmOrderNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

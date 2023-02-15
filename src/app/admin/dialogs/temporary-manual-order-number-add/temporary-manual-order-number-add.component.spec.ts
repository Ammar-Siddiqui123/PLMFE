import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryManualOrderNumberAddComponent } from './temporary-manual-order-number-add.component';

describe('TemporaryManualOrderNumberAddComponent', () => {
  let component: TemporaryManualOrderNumberAddComponent;
  let fixture: ComponentFixture<TemporaryManualOrderNumberAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporaryManualOrderNumberAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporaryManualOrderNumberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

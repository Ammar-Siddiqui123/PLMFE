import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranInReprocessComponent } from './tran-in-reprocess.component';

describe('TranInReprocessComponent', () => {
  let component: TranInReprocessComponent;
  let fixture: ComponentFixture<TranInReprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranInReprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranInReprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

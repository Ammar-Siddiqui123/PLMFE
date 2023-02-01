import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendTranHistoryComponent } from './send-tran-history.component';

describe('SendTranHistoryComponent', () => {
  let component: SendTranHistoryComponent;
  let fixture: ComponentFixture<SendTranHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendTranHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendTranHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

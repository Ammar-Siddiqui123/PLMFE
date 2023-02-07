import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranOrderListComponent } from './tran-order-list.component';

describe('TranOrderListComponent', () => {
  let component: TranOrderListComponent;
  let fixture: ComponentFixture<TranOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

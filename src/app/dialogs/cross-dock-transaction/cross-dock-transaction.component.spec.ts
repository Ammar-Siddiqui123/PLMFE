import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossDockTransactionComponent } from './cross-dock-transaction.component';

describe('CrossDockTransactionComponent', () => {
  let component: CrossDockTransactionComponent;
  let fixture: ComponentFixture<CrossDockTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossDockTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossDockTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

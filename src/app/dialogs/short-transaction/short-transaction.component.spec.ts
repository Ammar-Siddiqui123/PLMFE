import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTransactionComponent } from './short-transaction.component';

describe('ShortTransactionComponent', () => {
  let component: ShortTransactionComponent;
  let fixture: ComponentFixture<ShortTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

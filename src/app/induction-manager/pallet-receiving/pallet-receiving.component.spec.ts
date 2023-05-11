import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletReceivingComponent } from './pallet-receiving.component';

describe('PalletReceivingComponent', () => {
  let component: PalletReceivingComponent;
  let fixture: ComponentFixture<PalletReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalletReceivingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

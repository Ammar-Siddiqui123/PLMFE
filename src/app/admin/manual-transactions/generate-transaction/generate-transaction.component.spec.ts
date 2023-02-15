import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTransactionComponent } from './generate-transaction.component';

describe('GenerateTransactionComponent', () => {
  let component: GenerateTransactionComponent;
  let fixture: ComponentFixture<GenerateTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationTransactionComponent } from './delete-confirmation-transaction.component';

describe('DeleteConfirmationTransactionComponent', () => {
  let component: DeleteConfirmationTransactionComponent;
  let fixture: ComponentFixture<DeleteConfirmationTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

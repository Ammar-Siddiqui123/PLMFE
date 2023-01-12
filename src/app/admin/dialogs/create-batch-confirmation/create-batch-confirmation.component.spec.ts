import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchConfirmationComponent } from './create-batch-confirmation.component';

describe('CreateBatchConfirmationComponent', () => {
  let component: CreateBatchConfirmationComponent;
  let fixture: ComponentFixture<CreateBatchConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBatchConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBatchConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

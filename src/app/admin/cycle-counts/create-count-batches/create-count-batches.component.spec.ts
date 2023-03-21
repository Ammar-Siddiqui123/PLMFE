import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCountBatchesComponent } from './create-count-batches.component';

describe('CreateCountBatchesComponent', () => {
  let component: CreateCountBatchesComponent;
  let fixture: ComponentFixture<CreateCountBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCountBatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCountBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

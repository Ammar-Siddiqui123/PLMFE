import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperBatchComponent } from './super-batch.component';

describe('SuperBatchComponent', () => {
  let component: SuperBatchComponent;
  let fixture: ComponentFixture<SuperBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperBatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

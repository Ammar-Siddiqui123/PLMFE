import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InductionManagerComponent } from './induction-manager.component';

describe('InductionManagerComponent', () => {
  let component: InductionManagerComponent;
  let fixture: ComponentFixture<InductionManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InductionManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InductionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

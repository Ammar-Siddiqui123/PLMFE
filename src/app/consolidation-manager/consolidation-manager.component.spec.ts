import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationManagerComponent } from './consolidation-manager.component';

describe('ConsolidationManagerComponent', () => {
  let component: ConsolidationManagerComponent;
  let fixture: ComponentFixture<ConsolidationManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidationManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

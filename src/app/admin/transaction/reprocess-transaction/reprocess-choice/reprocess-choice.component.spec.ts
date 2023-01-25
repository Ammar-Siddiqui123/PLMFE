import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocessChoiceComponent } from './reprocess-choice.component';

describe('ReprocessChoiceComponent', () => {
  let component: ReprocessChoiceComponent;
  let fixture: ComponentFixture<ReprocessChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocessChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReprocessChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEmptyReelsComponent } from './mark-empty-reels.component';

describe('MarkEmptyReelsComponent', () => {
  let component: MarkEmptyReelsComponent;
  let fixture: ComponentFixture<MarkEmptyReelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkEmptyReelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkEmptyReelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

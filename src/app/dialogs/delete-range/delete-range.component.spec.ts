import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRangeComponent } from './delete-range.component';

describe('DeleteRangeComponent', () => {
  let component: DeleteRangeComponent;
  let fixture: ComponentFixture<DeleteRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

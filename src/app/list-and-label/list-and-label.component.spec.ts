import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAndLabelComponent } from './list-and-label.component';

describe('ListAndLabelComponent', () => {
  let component: ListAndLabelComponent;
  let fixture: ComponentFixture<ListAndLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAndLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAndLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

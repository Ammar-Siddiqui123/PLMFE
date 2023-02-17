import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFieldsComponent } from './empty-fields.component';

describe('EmptyFieldsComponent', () => {
  let component: EmptyFieldsComponent;
  let fixture: ComponentFixture<EmptyFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

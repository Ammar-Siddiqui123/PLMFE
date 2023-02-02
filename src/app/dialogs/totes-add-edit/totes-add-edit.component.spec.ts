import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotesAddEditComponent } from './totes-add-edit.component';

describe('TotesAddEditComponent', () => {
  let component: TotesAddEditComponent;
  let fixture: ComponentFixture<TotesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotesAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

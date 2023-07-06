import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicReportsAndLabelsComponent } from './basic-reports-and-labels.component';

describe('BasicReportsAndLabelsComponent', () => {
  let component: BasicReportsAndLabelsComponent;
  let fixture: ComponentFixture<BasicReportsAndLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicReportsAndLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicReportsAndLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeStatusComponent } from './ie-status.component';

describe('IeStatusComponent', () => {
  let component: IeStatusComponent;
  let fixture: ComponentFixture<IeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

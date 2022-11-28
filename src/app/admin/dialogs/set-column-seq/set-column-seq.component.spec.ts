import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetColumnSeqComponent } from './set-column-seq.component';

describe('SetColumnSeqComponent', () => {
  let component: SetColumnSeqComponent;
  let fixture: ComponentFixture<SetColumnSeqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetColumnSeqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetColumnSeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

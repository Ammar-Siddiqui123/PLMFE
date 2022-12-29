import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutAwayComponent } from './put-away.component';

describe('PutAwayComponent', () => {
  let component: PutAwayComponent;
  let fixture: ComponentFixture<PutAwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutAwayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutAwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

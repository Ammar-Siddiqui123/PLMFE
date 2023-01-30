import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPutAwaysComponent } from './process-put-aways.component';

describe('ProcessPutAwaysComponent', () => {
  let component: ProcessPutAwaysComponent;
  let fixture: ComponentFixture<ProcessPutAwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessPutAwaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessPutAwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

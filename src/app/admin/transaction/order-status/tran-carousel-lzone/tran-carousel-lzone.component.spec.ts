import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranCarouselLzoneComponent } from './tran-carousel-lzone.component';

describe('TranCarouselLzoneComponent', () => {
  let component: TranCarouselLzoneComponent;
  let fixture: ComponentFixture<TranCarouselLzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranCarouselLzoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranCarouselLzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

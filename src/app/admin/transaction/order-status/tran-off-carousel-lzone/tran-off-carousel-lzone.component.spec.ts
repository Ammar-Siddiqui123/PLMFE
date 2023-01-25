import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranOffCarouselLzoneComponent } from './tran-off-carousel-lzone.component';

describe('TranOffCarouselLzoneComponent', () => {
  let component: TranOffCarouselLzoneComponent;
  let fixture: ComponentFixture<TranOffCarouselLzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranOffCarouselLzoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranOffCarouselLzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

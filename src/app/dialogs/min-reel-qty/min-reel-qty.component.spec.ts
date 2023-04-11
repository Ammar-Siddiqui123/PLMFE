import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinReelQtyComponent } from './min-reel-qty.component';

describe('MinReelQtyComponent', () => {
  let component: MinReelQtyComponent;
  let fixture: ComponentFixture<MinReelQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinReelQtyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinReelQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

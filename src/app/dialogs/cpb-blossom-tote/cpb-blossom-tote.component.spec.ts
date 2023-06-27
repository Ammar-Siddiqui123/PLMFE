import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpbBlossomToteComponent } from './cpb-blossom-tote.component';

describe('CpbBlossomToteComponent', () => {
  let component: CpbBlossomToteComponent;
  let fixture: ComponentFixture<CpbBlossomToteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpbBlossomToteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpbBlossomToteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

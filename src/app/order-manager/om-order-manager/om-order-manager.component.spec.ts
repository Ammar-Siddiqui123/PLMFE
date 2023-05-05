import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmOrderManagerComponent } from './om-order-manager.component';

describe('OmOrderManagerComponent', () => {
  let component: OmOrderManagerComponent;
  let fixture: ComponentFixture<OmOrderManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmOrderManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

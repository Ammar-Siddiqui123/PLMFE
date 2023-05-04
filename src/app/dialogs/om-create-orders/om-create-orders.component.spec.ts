import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmCreateOrdersComponent } from './om-create-orders.component';

describe('OmCreateOrdersComponent', () => {
  let component: OmCreateOrdersComponent;
  let fixture: ComponentFixture<OmCreateOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmCreateOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmCreateOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

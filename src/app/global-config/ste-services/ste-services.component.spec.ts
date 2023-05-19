import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteServicesComponent } from './ste-services.component';

describe('SteServicesComponent', () => {
  let component: SteServicesComponent;
  let fixture: ComponentFixture<SteServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

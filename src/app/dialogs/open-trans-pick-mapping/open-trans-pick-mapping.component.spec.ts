import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTransPickMappingComponent } from './open-trans-pick-mapping.component';

describe('OpenTransPickMappingComponent', () => {
  let component: OpenTransPickMappingComponent;
  let fixture: ComponentFixture<OpenTransPickMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTransPickMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTransPickMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

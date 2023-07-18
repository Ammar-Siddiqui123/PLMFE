import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeTransFieldMappingComponent } from './ie-trans-field-mapping.component';

describe('IeTransFieldMappingComponent', () => {
  let component: IeTransFieldMappingComponent;
  let fixture: ComponentFixture<IeTransFieldMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeTransFieldMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeTransFieldMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpFieldNameMappingComponent } from './sp-field-name-mapping.component';

describe('SpFieldNameMappingComponent', () => {
  let component: SpFieldNameMappingComponent;
  let fixture: ComponentFixture<SpFieldNameMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpFieldNameMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpFieldNameMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

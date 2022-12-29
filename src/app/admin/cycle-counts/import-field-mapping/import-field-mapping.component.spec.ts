import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFieldMappingComponent } from './import-field-mapping.component';

describe('ImportFieldMappingComponent', () => {
  let component: ImportFieldMappingComponent;
  let fixture: ComponentFixture<ImportFieldMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportFieldMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportFieldMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

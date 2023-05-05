import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmUserFieldDataComponent } from './om-user-field-data.component';

describe('OmUserFieldDataComponent', () => {
  let component: OmUserFieldDataComponent;
  let fixture: ComponentFixture<OmUserFieldDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmUserFieldDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmUserFieldDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

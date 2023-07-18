import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeInventMapExportComponent } from './ie-invent-map-export.component';

describe('IeInventMapExportComponent', () => {
  let component: IeInventMapExportComponent;
  let fixture: ComponentFixture<IeInventMapExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeInventMapExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeInventMapExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

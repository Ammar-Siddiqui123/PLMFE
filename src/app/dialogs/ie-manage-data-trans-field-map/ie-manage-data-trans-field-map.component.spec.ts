import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeManageDataTransFieldMapComponent } from './ie-manage-data-trans-field-map.component';

describe('IeManageDataTransFieldMapComponent', () => {
  let component: IeManageDataTransFieldMapComponent;
  let fixture: ComponentFixture<IeManageDataTransFieldMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeManageDataTransFieldMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeManageDataTransFieldMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

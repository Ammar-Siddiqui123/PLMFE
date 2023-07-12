import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeManageDataInvenMapTablesComponent } from './ie-manage-data-inven-map-tables.component';

describe('IeManageDataInvenMapTablesComponent', () => {
  let component: IeManageDataInvenMapTablesComponent;
  let fixture: ComponentFixture<IeManageDataInvenMapTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeManageDataInvenMapTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeManageDataInvenMapTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

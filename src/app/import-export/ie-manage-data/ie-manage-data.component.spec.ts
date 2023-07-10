import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeManageDataComponent } from './ie-manage-data.component';

describe('IeManageDataComponent', () => {
  let component: IeManageDataComponent;
  let fixture: ComponentFixture<IeManageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeManageDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeManageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

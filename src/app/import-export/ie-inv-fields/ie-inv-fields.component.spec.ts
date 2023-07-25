import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeInvFieldsComponent } from './ie-inv-fields.component';

describe('IeInvFieldsComponent', () => {
  let component: IeInvFieldsComponent;
  let fixture: ComponentFixture<IeInvFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeInvFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeInvFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

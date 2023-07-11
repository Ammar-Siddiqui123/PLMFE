import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeInventoryComponent } from './ie-inventory.component';

describe('IeInventoryComponent', () => {
  let component: IeInventoryComponent;
  let fixture: ComponentFixture<IeInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

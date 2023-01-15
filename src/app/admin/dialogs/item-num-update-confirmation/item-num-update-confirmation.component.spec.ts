import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNumUpdateConfirmationComponent } from './item-num-update-confirmation.component';

describe('ItemNumUpdateConfirmationComponent', () => {
  let component: ItemNumUpdateConfirmationComponent;
  let fixture: ComponentFixture<ItemNumUpdateConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemNumUpdateConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemNumUpdateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

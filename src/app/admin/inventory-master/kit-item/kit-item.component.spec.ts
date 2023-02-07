import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitItemComponent } from './kit-item.component';

describe('KitItemComponent', () => {
  let component: KitItemComponent;
  let fixture: ComponentFixture<KitItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

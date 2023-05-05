import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmItemSelectedComponent } from './cm-item-selected.component';

describe('CmItemSelectedComponent', () => {
  let component: CmItemSelectedComponent;
  let fixture: ComponentFixture<CmItemSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmItemSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmItemSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

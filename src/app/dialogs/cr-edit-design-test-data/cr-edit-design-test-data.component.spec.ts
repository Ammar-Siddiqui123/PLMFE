import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrEditDesignTestDataComponent } from './cr-edit-design-test-data.component';

describe('CrEditDesignTestDataComponent', () => {
  let component: CrEditDesignTestDataComponent;
  let fixture: ComponentFixture<CrEditDesignTestDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrEditDesignTestDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrEditDesignTestDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

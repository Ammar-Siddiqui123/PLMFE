import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmSplitLineComponent } from './cm-split-line.component';

describe('CmSplitLineComponent', () => {
  let component: CmSplitLineComponent;
  let fixture: ComponentFixture<CmSplitLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmSplitLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmSplitLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmStagingLocationComponent } from './cm-staging-location.component';

describe('CmStagingLocationComponent', () => {
  let component: CmStagingLocationComponent;
  let fixture: ComponentFixture<CmStagingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmStagingLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmStagingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

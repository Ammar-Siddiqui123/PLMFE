import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeArchivePurgeComponent } from './ie-archive-purge.component';

describe('IeArchivePurgeComponent', () => {
  let component: IeArchivePurgeComponent;
  let fixture: ComponentFixture<IeArchivePurgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeArchivePurgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeArchivePurgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

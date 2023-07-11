import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeFileBackupComponent } from './ie-file-backup.component';

describe('IeFileBackupComponent', () => {
  let component: IeFileBackupComponent;
  let fixture: ComponentFixture<IeFileBackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeFileBackupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeFileBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

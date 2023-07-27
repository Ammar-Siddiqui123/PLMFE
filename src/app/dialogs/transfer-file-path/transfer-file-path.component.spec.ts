import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFilePathComponent } from './transfer-file-path.component';

describe('TransferFilePathComponent', () => {
  let component: TransferFilePathComponent;
  let fixture: ComponentFixture<TransferFilePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferFilePathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferFilePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeFtpComponent } from './ie-ftp.component';

describe('IeFtpComponent', () => {
  let component: IeFtpComponent;
  let fixture: ComponentFixture<IeFtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeFtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeFtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

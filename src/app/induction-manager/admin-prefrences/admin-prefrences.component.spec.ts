import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrefrencesComponent } from './admin-prefrences.component';


describe('AdminPrefrencesComponent', () => {
  let component: AdminPrefrencesComponent;
  let fixture: ComponentFixture<AdminPrefrencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPrefrencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPrefrencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

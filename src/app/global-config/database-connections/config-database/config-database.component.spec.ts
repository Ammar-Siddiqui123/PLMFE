import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDatabaseComponent } from './config-database.component';

describe('ConfigDatabaseComponent', () => {
  let component: ConfigDatabaseComponent;
  let fixture: ComponentFixture<ConfigDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

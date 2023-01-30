import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalConfigSetSqlComponent } from './global-config-set-sql.component';

describe('GlobalConfigSetSqlComponent', () => {
  let component: GlobalConfigSetSqlComponent;
  let fixture: ComponentFixture<GlobalConfigSetSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalConfigSetSqlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalConfigSetSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

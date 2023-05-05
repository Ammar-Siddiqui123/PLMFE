import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ConsolidationPreferencesComponent } from './consolidation-preferences.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConsolidationManagerService } from '../consolidation-manager.service';
import { of } from 'rxjs';

describe('ConsolidationPreferencesComponent', () => {
  let component: ConsolidationPreferencesComponent;
  let fixture: ComponentFixture<ConsolidationPreferencesComponent>;
  let cmService: ConsolidationManagerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsolidationPreferencesComponent],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule,
      ],
      providers: [MatDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsolidationPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cmService = TestBed.inject(ConsolidationManagerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPreferences', () => {
    spyOn(component, 'getPreferences').and.callThrough();
    component.getPreferences();
    expect(component.getPreferences).toHaveBeenCalled();
  });

  it('should fetch preferences data successfully', () => {
    const mockResponse = {
      isExecuted: true,
      data: {
        cmPreferences: 'mockPreferencesData',
      },
    };
    spyOn(cmService, 'get').and.returnValue(of(mockResponse));

    component.getPreferences();

    expect(cmService.get).toHaveBeenCalledWith(
      {
        type: '',
        value: '',
        username: component.userData.userName,
        wsid: component.userData.wsid,
      },
      '/Consolidation/ConsoleDataSB'
    );

    expect(component.preferencesData).toEqual('mockPreferencesData');
  });

  it('should not update preferences data if execution fails', () => {
    const mockResponse = {
      isExecuted: false,
    };
    spyOn(cmService, 'get').and.returnValue(of(mockResponse));

    component.getPreferences();

    expect(cmService.get).toHaveBeenCalledWith(
      {
        type: '',
        value: '',
        username: component.userData.userName,
        wsid: component.userData.wsid,
      },
      '/Consolidation/ConsoleDataSB'
    );

    expect(component.preferencesData).toBeUndefined();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsolidationManagerService } from '../../consolidation-manager.service';

import { PreferencesConsolidationComponent } from './preferences-consolidation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('PreferencesConsolidationComponent', () => {
  let component: PreferencesConsolidationComponent;
  let fixture: ComponentFixture<PreferencesConsolidationComponent>;
  let cmService: ConsolidationManagerService;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencesConsolidationComponent ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule,
      ],
      providers: [MatDialog,FormBuilder],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cmService = TestBed.inject(ConsolidationManagerService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form controls with item values', () => {
    const item = {
      defaultPackingList: 'test',
      blindVerifyItems: true,
      verifyItems: false,
      packingListSort: 'test',
      printUnVerified: true,
      printVerified: false,
      defaultLookupType: 'test',
      autoCompBOShipComplete: true,
      stageNonPickProOrders: false,
      emailPickingSlip: true,
      validateStagingLocations: false,
    };

    component.setPreferences(item);

    expect(component.filtersForm.controls['defPackList'].value).toEqual(
      item.defaultPackingList
    );
    expect(component.filtersForm.controls['blindVerify'].value).toEqual(
      item.blindVerifyItems
    );
    expect(component.filtersForm.controls['verifyEach'].value).toEqual(
      item.verifyItems
    );
    expect(component.filtersForm.controls['packingList'].value).toEqual(
      item.packingListSort
    );
    expect(component.filtersForm.controls['printUnVerified'].value).toEqual(
      item.printUnVerified
    );
    expect(component.filtersForm.controls['printVerified'].value).toEqual(
      item.printVerified
    );
    expect(component.filtersForm.controls['defLookType'].value).toEqual(
      item.defaultLookupType
    );
    expect(component.filtersForm.controls['backOrders'].value).toEqual(
      item.autoCompBOShipComplete
    );
    expect(component.filtersForm.controls['nonPickpro'].value).toEqual(
      item.stageNonPickProOrders
    );
    expect(component.filtersForm.controls['emailPackSlip'].value).toEqual(
      item.emailPickingSlip
    );
    expect(component.filtersForm.controls['validateStaingLocs'].value).toEqual(
      item.validateStagingLocations
    );
  });



  it('should update preferences values successfully', () => {
    const mockPayload = {
      autoCompleteShip: true,
      defPackList: 'some value',
      deffLookType: 'some value',
      verifyItems: false,
      blindVerify: true,
      printVerified: true,
      printUnVerified: false,
      packingListSort: 'some value',
      nonPickpro: 'true',
      validateStaingLocs: 'true',
      username: 'some username',
      wsid: 'some wsid',
    };
    const mockResponse = { isExecuted: true };
    spyOn(cmService, 'get').and.returnValue(of(mockResponse));
    spyOn(component.consolidationEvnt, 'emit');

    // Set form control values
    component.filtersForm.controls['backOrders'].setValue(mockPayload.autoCompleteShip);
    component.filtersForm.controls['defPackList'].setValue(mockPayload.defPackList);
    component.filtersForm.controls['defLookType'].setValue(mockPayload.deffLookType);
    component.filtersForm.controls['verifyEach'].setValue(mockPayload.verifyItems);
    component.filtersForm.controls['blindVerify'].setValue(mockPayload.blindVerify);
    component.filtersForm.controls['printVerified'].setValue(mockPayload.printVerified);
    component.filtersForm.controls['printUnVerified'].setValue(mockPayload.printUnVerified);
    component.filtersForm.controls['packingList'].setValue(mockPayload.packingListSort);
    component.filtersForm.controls['nonPickpro'].setValue(mockPayload.nonPickpro);
    component.filtersForm.controls['validateStaingLocs'].setValue(mockPayload.validateStaingLocs);
    
    // Set user data
    component.userData = {
      userName: mockPayload.username,
      wsid: mockPayload.wsid,
    };

    // Trigger the method
    component.updatePreferencesValues();

    expect(cmService.get).toHaveBeenCalledWith(
      mockPayload,
      '/Consolidation/ConsolidationPreferenceUpdate'
    );
    expect(component.consolidationEvnt.emit).toHaveBeenCalled();
  });


});

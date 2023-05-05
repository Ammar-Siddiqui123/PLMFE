import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesShippingComponent } from './preferences-shipping.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConsolidationManagerService } from '../../consolidation-manager.service';
import { of } from 'rxjs';

describe('PreferencesShippingComponent', () => {
  let component: PreferencesShippingComponent;
  let fixture: ComponentFixture<PreferencesShippingComponent>;
  let cmService: ConsolidationManagerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferencesShippingComponent],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule,
      ],
      providers: [MatDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PreferencesShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cmService = TestBed.inject(ConsolidationManagerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all form controls', () => {
    const mockItem = {
      shipping: true,
      packing: true,
      autoPrintContPL: true,
      autoPrintOrderPL: true,
      autoPrintContLabel: true,
      containerIDDefault: 'default',
      enterContainerID: true,
      confirmAndPacking: true,
      confirmAndPackingConfirmQuantity: true,
      freight: 'freight',
      freight1: 'freight1',
      freight2: 'freight2',
      weight: 'weight',
      length: 'length',
      width: 'width',
      height: 'height',
      cube: 'cube',
    };
    component.setPreferences(mockItem);
    expect(component.shippingForm.controls['allowShip'].value).toBe(true);
    expect(component.shippingForm.controls['allowPack'].value).toBe(true);
    expect(component.shippingForm.controls['printCont'].value).toBe(true);
    expect(component.shippingForm.controls['printOrd'].value).toBe(true);
    expect(component.shippingForm.controls['printContLabel'].value).toBe(true);
    expect(component.shippingForm.controls['contIDText'].value).toBe('default');
    expect(component.shippingForm.controls['contID'].value).toBe(true);
    expect(component.shippingForm.controls['confirmPack'].value).toBe(true);
    expect(component.shippingForm.controls['confirmQTY'].value).toBe(true);
    expect(component.shippingForm.controls['freight'].value).toBe('freight');
    expect(component.shippingForm.controls['freight1'].value).toBe('freight1');
    expect(component.shippingForm.controls['freight2'].value).toBe('freight2');
    expect(component.shippingForm.controls['weight'].value).toBe('weight');
    expect(component.shippingForm.controls['length'].value).toBe('length');
    expect(component.shippingForm.controls['width'].value).toBe('width');
    expect(component.shippingForm.controls['height'].value).toBe('height');
    expect(component.shippingForm.controls['cube'].value).toBe('cube');
  });

  it('should set selectionPacking and selectionConfirmPacking when packing and confirmAndPacking are true', () => {
    const mockItem = {
      shipping: false,
      packing: true,
      autoPrintContPL: false,
      autoPrintOrderPL: false,
      autoPrintContLabel: false,
      containerIDDefault: '',
      enterContainerID: false,
      confirmAndPacking: true,
      confirmAndPackingConfirmQuantity: false,
      freight: '',
      freight1: '',
      freight2: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      cube: ''
    };
    component.setPreferences(mockItem);
    expect(component.selectionPacking).toBe(true);
    expect(component.selectionConfirmPacking).toBe(true);
  });


  // generate unit test for saveShippingPreferences method

  
  

});

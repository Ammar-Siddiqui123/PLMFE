import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../app/init/auth.service'; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { ItemCategoryComponent } from '../dialogs/item-category/item-category.component';
import { ItemNumberComponent } from '../dialogs/item-number/item-number.component';
import { UnitMeasureComponent } from '../dialogs/unit-measure/unit-measure.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import labels from '../../labels/labels.json'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { SpinnerService } from 'src/app/init/spinner.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { KitItemComponent } from './kit-item/kit-item.component';
import { ConfirmationGuard } from 'src/app/guard/confirmation-guard.guard';
import { ScanCodesComponent } from './scan-codes/scan-codes.component';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { ApiFuntions } from 'src/app/services/ApiFuntions';



@Component({
  selector: 'app-inventory-master',
  templateUrl: './inventory-master.component.html',
  styleUrls: ['./inventory-master.component.scss']
})
export class InventoryMasterComponent implements OnInit {
  public textLabel: any = 'Details';
  tabIndex: any = 0;
  ifAllowed: boolean = false;
  PrevtabIndex: any = 0;
  public userData: any;
  public invData: any;
  public getInvMasterData: any;
  public invMasterLocations: any;
  public isDialogOpen = false;
  public paginationData: {
    total: 0,
    position: 0,
    itemNumber: 0
  }
  public currentPageItemNo: any = '';
  searchList: any;
  searchValue: any = '';
  isDataFound = false;
  isDataFoundCounter = 0;
  saveDisabled = true;
  count;


  public locationTable: any;
  public getItemNum: any;
  public openCount: any;
  public histCount: any;
  public procCount: any;
  public totalQuantity: any;
  public totalPicks: any;
  public totalPuts: any;
  public wipCount: any;
  public append: any;
  itemNumberParam$: Observable<any>;
  hasChanged: any;
  initialFormValue: any
  isDisabledSubmit: boolean = false;
  kitAttempts: number = 0;
  scanAttempts: number = 0;
  IstabChange: boolean = false; 
  columns:any={};
  constructor(
    private api: ApiFuntions,
    private authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private confirmationGuard: ConfirmationGuard,
    private sharedService: SharedService,
    // public quarantineDialogRef: MatDialogRef<'quarantineAction'>,
  ) {
  }
  @ViewChild('quarantineAction') quarantineTemp: TemplateRef<any>;
  @ViewChild('UNquarantineAction') unquarantineTemp: TemplateRef<any>;
  @ViewChild('propertiesChanged') propertiesChanged: TemplateRef<any>;
  @ViewChild(KitItemComponent) kititemcom: KitItemComponent;
  @ViewChild(ScanCodesComponent) ScanCodesCom: ScanCodesComponent;
  OldinvMaster: any = {};
  invMaster: FormGroup;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  eventsSubject: Subject<String> = new Subject<String>();
  reelSubject: Subject<String> = new Subject<String>();

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    alert();
  }
  @HostListener('document:keydown', ['$event'])

  //  SHORTCUT KEYS
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (!this.isInputField(target) && event.key === 'a') {
      event.preventDefault();
      if (this.isDialogOpen) return
      this.openAddItemDialog();
    }

    if (!this.isInputField(target) && event.key === 'c') {
      event.preventDefault();
      this.clearSearchField();
    }
    if (!this.isInputField(target) && event.key === 'd') {
      event.preventDefault();
      if (this.isDialogOpen || this.searchValue === '') return
      this.deleteItem(null);
    }

    if (!this.isInputField(target) && event.key === 'e') {
      event.preventDefault();

      this.tabGroup.selectedIndex = 0;
    }
    if (!this.isInputField(target) && event.key === 'k') {
      event.preventDefault();

      this.tabGroup.selectedIndex = 2;
    }

    if (!this.isInputField(target) && event.key === 'l') {
      event.preventDefault();

      this.tabGroup.selectedIndex = 3;
    }

    if (!this.isInputField(target) && event.key === 'o') {
      event.preventDefault();

      this.tabGroup.selectedIndex = 7;
    }
    if (!this.isInputField(target) && event.key === 'q') {
      event.preventDefault();
      if (this.isDialogOpen || this.searchValue === '') return
      this.quarantineDialog();
    }

    if (!this.isInputField(target) && event.key === 'g') {
      event.preventDefault();
      this.tabGroup.selectedIndex = 4;
    }
    if (!this.isInputField(target) && event.key === 's') {
      event.preventDefault();
      this.tabGroup.selectedIndex = 5;
    }
    if (!this.isInputField(target) && event.key === 'i') {
      event.preventDefault();
      this.tabGroup.selectedIndex = 1;
    }
    if (!this.isInputField(target) && event.key === 'w') {
      event.preventDefault();
      this.tabGroup.selectedIndex = 6;
    }
    if (!this.isInputField(target) && event.key === 'h') {
      event.preventDefault();
      if (this.tabGroup.selectedIndex != 0) return
      this.eventsSubject.next('h');
    }

    if (!this.isInputField(target) && event.key === 'v') {
      event.preventDefault();
      if (this.tabGroup.selectedIndex != 0) return
      this.eventsSubject.next('v');
    }
    if (!this.isInputField(target) && event.key === 'r') {
      event.preventDefault();
      if (this.tabGroup.selectedIndex != 0) return
      this.eventsSubject.next('r');
    }
    if (!this.isInputField(target) && event.key === 'r') {
      event.preventDefault();
      if (this.tabGroup.selectedIndex != 0) return
      this.eventsSubject.next('r');
    }
    if (!this.isInputField(target) && event.key === 'u') {
      event.preventDefault();
      if (this.tabGroup.selectedIndex != 4) return
      this.reelSubject.next('reel')
    }
  }

  isInputField(element: HTMLElement): boolean {
    return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.isContentEditable;
  }

  @ViewChild('alertInput', { read: MatAutocompleteTrigger })
  autoComplete: MatAutocompleteTrigger;

  @ViewChild("searchauto", { static: false }) autocompleteOpened: MatAutocomplete;
  @ViewChild('autoFocusField') searchBoxField: ElementRef;

  public setVal: boolean = false;
  ngOnInit(): void {
    // window.addEventListener('scroll', this.scrollEvent, true);
    this.userData = this.authService.userData();
    this.initialzeIMFeilds();
    this.getInventory();
    this.OSFieldFilterNames();
    this.route
      .paramMap
      .subscribe(params => { 
      });
  }

  // onOutsideSearchBox(e?:any) {
  //   console.log('working');
  //    window.addEventListener('scroll', this.scrollEvent, true);

  //   // if(this.autoComplete.panelOpen){
  //   //   this.autoComplete.closePanel();
  //   // }
  // }

  // openMatAutoComplete(){
  //   console.log(this.autocompleteOpened.panel);
  //   if(this.autocompleteOpened._isOpen){
  //     this.autocompleteOpened.panel.nativeElement.addEventListener('mouseleave', () => {
  //       this.autoComplete.closePanel();
  //     })
  //   }
  // }
  // closeMatAutoComplete(){
  //  console.log('closed');

  // }
  // focusinmethod(){
  //   let b = document.body;
  //   console.log(b);
  // }
  // focusoutmethod(){
  //   let b = document.body;
  //   b.style.overflow = "auto";
  // }

  scrollEvent = (event: any): void => {
    // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    //   if (this.autoComplete.panelOpen) {
    //     this.autoComplete.closePanel();
    //   }
    // }
    if (this.autoComplete.panelOpen) this.autoComplete.updatePosition();
  }
  ngAfterViewInit() {
    this.setVal = localStorage.getItem('routeFromOrderStatus') == 'true' ? true : false;
    this.itemNumberParam$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('itemNumber')),
    );
    this.searchBoxField.nativeElement.focus();

    this.itemNumberParam$.subscribe((param) => { 
      if (param) {
        this.searchValue = param;
        this.currentPageItemNo = param;
        this.getInvMasterDetail(this.searchValue)
      }
    });



    this.sharedService.invMasterParentObserver.subscribe(evt => {

      if (evt.isEnable) {
        this.saveDisabled = false;
      } else {
        this.saveDisabled = true;
      }



    })
  }

  async initialzeIMFeilds() {
    this.invMaster = this.fb.group({

      itemNumber: [this.getInvMasterData?.itemNumber || '', [Validators.required, Validators.maxLength(50)]],
      supplierItemID: [this.getInvMasterData?.supplierItemID || '', [Validators.maxLength(50)]],
      description: [this.getInvMasterData?.description || '', [Validators.maxLength(255)]],
      reorderPoint: [this.getInvMasterData?.reorderPoint || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      replenishmentPoint: [this.getInvMasterData?.replenishmentPoint || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      category: [this.getInvMasterData?.category || '', [Validators.maxLength(50)]],
      reorderQuantity: [this.getInvMasterData?.reorderQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      replenishmentLevel: [this.getInvMasterData?.replenishmentLevel || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      subCategory: [this.getInvMasterData?.subCategory || '', [Validators.maxLength(50)]],
      unitOfMeasure: [this.getInvMasterData?.unitOfMeasure || '', [Validators.maxLength(50)]],
      kanbanReplenishmentPoint: [this.getInvMasterData?.kanbanReplenishmentPoint || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      kanbanReplenishmentLevel: [this.getInvMasterData?.kanbanReplenishmentLevel || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],

      totalQuantity: [this.getInvMasterData?.totalQuantity || 0, [Validators.required]],
      wipCount: [this.getInvMasterData?.wipCount || 0, [Validators.required]],
      totalPicks: [this.getInvMasterData?.totalPicks || 0, [Validators.required]],
      totalPuts: [this.getInvMasterData?.totalPuts || 0, [Validators.required]],
      openCount: [this.getInvMasterData?.openCount || 0, [Validators.required]],
      histCount: [this.getInvMasterData?.histCount || 0, [Validators.required]],
      procCount: [this.getInvMasterData?.procCount || 0, [Validators.required]],


      primaryPickZone: [this.getInvMasterData?.primaryPickZone.toLowerCase() || ''],
      secondaryPickZone: [this.getInvMasterData?.secondaryPickZone.toLowerCase() || ''],
      caseQuantity: [this.getInvMasterData?.caseQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      pickFenceQuantity: [this.getInvMasterData?.pickFenceQuantity || 0, [, Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      pickSequence: [this.getInvMasterData?.pickSequence || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],

      dateSensitive: [this.getInvMasterData?.dateSensitive || false],
      warehouseSensitive: [this.getInvMasterData?.warehouseSensitive || false],
      splitCase: [this.getInvMasterData?.splitCase || ''],
      active: [this.getInvMasterData?.active || ''],
      fifo: [this.getInvMasterData?.fifo || false],
      fifoDate: [this.getInvMasterData?.fifoDate || ''],

      bulkCellSize: [this.getInvMasterData?.bulkCellSize || "", [Validators.maxLength(50)]],
      cellSize: [this.getInvMasterData?.cellSize || "", [Validators.maxLength(50)]],
      cfCellSize: [this.getInvMasterData?.cfCellSize, [Validators.maxLength(50)]],

      goldenZone: [this.getInvMasterData?.goldenZone || ""],
      bulkGoldZone: [this.getInvMasterData?.bulkGoldZone || ""],
      CfGoldZone: [this.getInvMasterData?.CfGoldZone || ""],

      bulkVelocity: [this.getInvMasterData?.bulkVelocity],
      cfVelocity: [this.getInvMasterData?.cfVelocity],

      minimumQuantity: [this.getInvMasterData?.minimumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      bulkMinimumQuantity: [this.getInvMasterData?.bulkMinimumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      cfMinimumQuantity: [this.getInvMasterData?.cfMinimumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],

      maximumQuantity: [this.getInvMasterData?.maximumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      bulkMaximumQuantity: [this.getInvMasterData?.bulkMaximumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
      cfMaximumQuantity: [this.getInvMasterData?.cfMaximumQuantity || 0, [Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],

      kitInventories: [this.getInvMasterData?.kitInventories || '', [Validators.required]],



      includeInAutoRTSUpdate: [this.getInvMasterData?.includeInAutoRTSUpdate || false, [Validators.required]],
      minimumRTSReelQuantity: [this.getInvMasterData?.minimumRTSReelQuantity || 0, [Validators.maxLength(9), Validators.required]],



      scanCode: [this.getInvMasterData?.scanCode || '', [Validators.required]],


      avgPieceWeight: [this.getInvMasterData?.avgPieceWeight || 0, [Validators.required]],
      sampleQuantity: [this.getInvMasterData?.sampleQuantity || 0, [Validators.required]],
      minimumUseScaleQuantity: [this.getInvMasterData?.minimumUseScaleQuantity || 0, [Validators.required]],
      useScale: [this.getInvMasterData?.useScale || false, [Validators.required]],



      unitCost: [this.getInvMasterData?.unitCost || 0, [Validators.required, Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      // supplierItemID: [ '', [Validators.required]],
      manufacturer: [this.getInvMasterData?.manufacturer || '', [Validators.maxLength(50)]],
      specialFeatures: [this.getInvMasterData?.specialFeatures || '', [Validators.maxLength(255)]],


      inventoryTable: [this.invMasterLocations?.inventoryTable || '', [Validators.required]],
      count: [this.invMasterLocations?.count || '', [Validators.required]],


      wsid: [this.userData?.wsid || '', [Validators.required]],
      username: [this.userData?.userName || '', [Validators.required]],

      itemQuarantined: [this.getInvMasterData?.itemQuarantined || '', [Validators.required]],


      supplierName: ['']
    });
    var CopyObject = JSON.stringify(this.invMaster.value);
    this.OldinvMaster = JSON.parse(CopyObject || '{}');
  }
  onSubmit(form: FormGroup) { 
  }
  public getInventory() {
    let paylaod = {
      "itemNumber": this.currentPageItemNo,
      "app": "",
      "newItem": false,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.api.GetInventory(paylaod).subscribe((res: any) => {

      if (this.currentPageItemNo == '') {
        this.currentPageItemNo = res.data?.firstItemNumber;
      }
      this.searchValue = this.currentPageItemNo;
      this.paginationData = {
        total: res.data?.filterCount.total,
        position: res.data?.filterCount.pos,
        itemNumber: res.data?.filterCount.itemNumber,
      }
      this.saveDisabled = true;
      this.getInvMasterDetail(this.currentPageItemNo);
      this.getInvMasterLocations(this.currentPageItemNo);
      //this.getInvMasterDetail('024768000010');
      //this.getInvMasterLocations('024768000010');
    });
  }

  async getInvMasterDetail(itemNum: any): Promise<void> {
    let paylaod = {
      "itemNumber": itemNum,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    };

    try {
      const res: any = await this.api.GetInventoryMasterData(paylaod).toPromise();
      this.getInvMasterData = res.data;

      await this.initialzeIMFeilds();
    } catch (error) {
    }
    this.api.GetInventoryMasterData(paylaod).subscribe((res: any) => {
      res.data['scanCode'] = res.data['scanCode'].map(item => {
        return { ...item, isDisabled: true };
      })
      this.getInvMasterData = res.data;
 

      this.initialzeIMFeilds();
    })
  }
  private getChangedProperties(): string[] {
    let changedProperties: any = [];

    Object.keys(this.invMaster.controls).forEach((name) => {
      const currentControl = this.invMaster.controls[name];

      if (currentControl.dirty) {
        changedProperties.push(name);
      }
    });

    return changedProperties;
  }
  public OSFieldFilterNames() { 
    this.api.ColumnAlias().subscribe((res: any) => {
      this.columns = res.data;
    })
  }
  public getInvMasterLocations(itemNum: any, pageSize?, startIndex?, sortingColumnName?, sortingOrder?) {
    
    let paylaod = {
      "draw": 0,
      "itemNumber": itemNum,
      "start": startIndex ? startIndex : 0,
      "length": pageSize ? pageSize : 5,
      "sortColumnNumber": sortingColumnName ? sortingColumnName : 0,
      "sortOrder": sortingOrder ? sortingOrder : "asc",
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.api.GetInventoryMasterLocation(paylaod).subscribe((res: any) => {
      // this.invMasterLocations ='asdsad';
      this.invMaster.get('inventoryTable')?.setValue(res.data.inventoryTable);
      this.count = res.data.count 
      this.initialzeIMFeilds();
    })
  }

  public getLocationTable(stockCode: any) {
    let paylaod = {
      "stockCode": stockCode,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.api.GetLocationTable(paylaod).subscribe((res: any) => {
      // console.log(res.data);
      this.locationTable = res.data;
    })
  }

  nextPage() {
    if (this.paginationData.position >= 1 && this.paginationData.position <= this.paginationData.total) {
      let paylaod = {
        "itemNumber": this.currentPageItemNo,
        "filter": "1=1",
        "firstItem": 1,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      this.api.NextItemNumber(paylaod).subscribe((res: any) => {
        this.currentPageItemNo = res.data;
        this.searchValue = this.currentPageItemNo;
        this.getInventory();
      })
    }

  }
  prevPage() {
    
    // const dialogRef = this.dialog.open(this.propertiesChanged, {
    //   width: '450px',
    //   autoFocus: '__non_existing_element__',
    // });
    this.searchValue = this.currentPageItemNo;
    if (this.paginationData.position >= 1 && this.paginationData.position <= this.paginationData.total) {
      let paylaod = {
        "itemNumber": this.currentPageItemNo,
        "filter": "1=1",
        "firstItem": 1,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      this.api.PreviousItemNumber(paylaod).subscribe((res: any) => {
        this.currentPageItemNo = res.data;
        this.searchValue = this.currentPageItemNo;
        this.getInventory();
      })
    }

  }

  updateInventoryMasterValidate() {
    if (this.invMaster.value?.avgPieceWeight == null || this.invMaster.value?.avgPieceWeight < 0 || this.invMaster.value?.avgPieceWeight > 99999999999) {
      return false;
    }
    if (this.invMaster.value?.sampleQuantity == null || this.invMaster.value?.sampleQuantity < 0 || this.invMaster.value?.sampleQuantity > 999999999) {
      return false;
    }
    if (this.invMaster.value?.minimumUseScaleQuantity == null || this.invMaster.value?.minimumUseScaleQuantity < 0 || this.invMaster.value?.minimumUseScaleQuantity > 999999999) {
      return false;
    }
    if (this.invMaster.value?.unitCost == null || this.invMaster.value?.unitCost < 0 || this.invMaster.value?.unitCost > 99999999999) {
      return false;
    }
    return true;
  }

  public updateInventoryMaster() {
    if (this.updateInventoryMasterValidate()) {
      this.invMaster.patchValue({
        'bulkGoldZone': this.invMaster.value?.bulkVelocity,
        'CfGoldZone': this.invMaster.value?.cfVelocity,
        'splitCase': this.invMaster.value.splitCase ? true : false,
        'active': this.invMaster.value.active ? true : false
      });
      this.api.UpdateInventoryMaster(this.invMaster.value).subscribe((res: any) => {
        if (res.isExecuted) {
          this.saveDisabled = true;
          this.ifAllowed = false;
          this.getInventory();
          this.toastr.success(labels.alert.update, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        } else {
          this.saveDisabled = false
          this.toastr.error(res.responseMessage, 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      })
      this.OldinvMaster = { ...this.invMaster.value };
    }
  }

  public updateItemNumber(form: any) {
    let paylaod = {
      "oldItemNumber": form.oldItemNumber,
      "newItemNumber": form.newItemNumber,
      "username": this.userData.userName,
      "wsid": this.userData.wsid
    }
    this.api.UpdateItemNumber(paylaod).subscribe((res: any) => {
      // console.log(res.data);
    })
  }

  public openAddItemDialog() {
    this.isDialogOpen = true
    let dialogRef = this.dialog.open(ItemNumberComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        itemNumber: this.currentPageItemNo,
        description: this.getInvMasterData.description,
        fromInventoryMaster: 1,
        newItemNumber: '',
        addItem: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
      if (result.itemNumber) {
        const { itemNumber, description } = result;
        let paylaod = {
          "itemNumber": itemNumber,
          "description": description,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.api.AddNewItem(paylaod).subscribe((res: any) => {
          if (res.isExecuted && res.data) {
            this.toastr.success(labels.alert.success, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.currentPageItemNo = itemNumber;
            this.getInventory();
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      } else {
        // this.toastr.error('Enter Valid Item Number', 'Error!', {
        //   positionClass: 'toast-bottom-right',
        //   timeOut: 2000
        // });
      }

    });
  }

  deleteItem($event) {
    this.isDialogOpen = true
    let itemToDelete = this.currentPageItemNo

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        actionMessage: `item :${this.searchValue}`,
        action: 'delete',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.isDialogOpen = false
      if (res == 'Yes') {

        let paylaodNextItemNumber = {
          "itemNumber": this.currentPageItemNo,
          "filter": "1=1",
          "firstItem": 1,
          "username": this.userData.userName,
          "wsid": this.userData.wsid,
        }
        this.api.NextItemNumber(paylaodNextItemNumber).subscribe((res: any) => {
          this.currentPageItemNo = res.data;
          this.searchValue = this.currentPageItemNo;
          //this.getInventory();
        })

        let paylaod = {
          "itemNumber": itemToDelete,
          "append": true,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.api.DeleteItem(paylaod).subscribe((res: any) => {
          if (res.isExecuted) {
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.getInventory();
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      }
    });
  }

  quarantineDialog(): void {
    this.isDialogOpen = true
    const dialogRef = this.dialog.open(this.quarantineTemp, {
      width: '560px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((x) => {
      this.isDialogOpen = false
      if (x) {
        let paylaod = {
          "itemNumber": this.currentPageItemNo,
          "append": true,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.api.UpdateInventoryMasterOTQuarantine(paylaod).subscribe((res: any) => {
          if (res.isExecuted) {
            this.toastr.success(res.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.getInventory();
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      }
    })
  }

  checkCheckBoxvalue(event) {
    this.append = event.checked;
  }

  unquarantineDialog(): void {
    this.isDialogOpen = false
    const dialogRef = this.dialog.open(this.unquarantineTemp, {
      width: '450px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((x) => {
      this.isDialogOpen = true
      if (x) {
        let paylaod = {
          "itemNumber": this.currentPageItemNo,
          "append": this.append,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.api.UpdateInventoryMasterOTUnQuarantine(paylaod).subscribe((res: any) => {
          if (res.isExecuted) {
            this.toastr.success(res.responseMessage, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
            this.getInventory();
          } else {
            this.toastr.error(res.responseMessage, 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        })
      }
    })
  }


  viewLocations() {
    if (this.setVal == true) {
      this.router.navigate(['/OrderManager/InventoryMap'], { state: { colHeader: 'itemNumber', colDef: 'Item Number', searchValue: this.currentPageItemNo } })
    }
    else {
      this.router.navigate(['/admin/inventoryMap'], { state: { colHeader: 'itemNumber', colDef: 'Item Number', searchValue: this.currentPageItemNo } })
    }
  }


  handleFocusOut() {
    if (!this.isDataFound && this.isDataFoundCounter > 0) {
      this.isDataFoundCounter = 0;
      this.toastr.error('Value undefined Does not exist!', 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }
  }
  getSearchList(e: any) {

    this.searchValue = e.currentTarget.value; 
    let paylaod = {
      "stockCode": e.currentTarget.value,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.api.GetLocationTable(paylaod).subscribe((res: any) => {
      if (res.data?.length) {

        this.searchList = res.data;
        this.isDataFound = true;
        this.isDataFoundCounter = 0;
        this.saveDisabled = true;
      } else {
        this.isDataFound = false;
        this.isDataFoundCounter = 1;
        this.saveDisabled = false;
      }
    });
  }

  onSearchSelect(e: any) {
    this.searchValue = e.option.value;
    this.currentPageItemNo = e.option.value;
    this.getInventory();
    // this.getInvMasterDetail(e.option.value);
    // this.getInvMasterLocations(e.option.value);
  }

  clearSearchField() {

    this.searchValue = '';
  }
  getNotification(e: any) {
    // console.log(e);

    if (e?.newItemNumber) {
      this.currentPageItemNo = e.newItemNumber;
      this.getInventory();
    } else if (e?.refreshLocationGrid) {
      this.getInvMasterLocations(this.currentPageItemNo);
    } else if (e?.locationPageSize) {  //&& e?.startIndex 

      this.getInvMasterLocations(this.currentPageItemNo, e.locationPageSize, e.startIndex);
    } else if (e?.sortingColumn) {
      this.getInvMasterLocations(this.currentPageItemNo, '', '', e.sortingColumn, e.sortingSeq);
    } else {
      this.getInventory();
    }
    this.isDisabledSubmit = false;

  }
  kitItemChecks() {
    var IsReturn: any = false;
    if (this.kititemcom.kitItemsList.length) {
      for (let i = 0; i < this.kititemcom.kitItemsList.length; i++) {
        for (var key in this.OldinvMaster.kitInventories[0]) {
          if (this.OldinvMaster.kitInventories[i] && this.OldinvMaster.kitInventories[i][key] == this.kititemcom.kitItemsList[i][key]) {

          } else {
            IsReturn = true;
            break;
          }
        }
      }
    }
    return IsReturn;
  }
  ScanCodesChecks() {
    var IsReturn: any = false;
    if (this.ScanCodesCom.scanCodesList.length) {
      for (let i = 0; i < this.ScanCodesCom.scanCodesList.length; i++) {
        for (var key in this.ScanCodesCom.scanCodesList[0]) {
          if (this.OldinvMaster.scanCode[i] && this.OldinvMaster.scanCode[i][key] == this.ScanCodesCom.scanCodesList[i][key]) {

          } else { 
            IsReturn = true;
            break;
          }
        }
      }
    }
    return IsReturn;
  }
  getChangesCheck() {
    var IsReturn: any = false;
    for (var key in this.invMaster.value) {
      if ((typeof this.invMaster.value[key]) == 'object' && key == 'kitInventories') {
        if (this.kitItemChecks()) {
          IsReturn = true;
          break;
        };
      }
      if ((typeof this.invMaster.value[key]) == 'object' && key == 'scanCode') {
        if (this.ScanCodesChecks()) {
          IsReturn = true;
          break;
        };
      }
      else if (this.invMaster.value[key] != this.OldinvMaster[key] && (typeof this.invMaster.value[key]) != 'object') {
        IsReturn = true;
        break;
      }
    }
    return IsReturn;
  }

  tabChanged(tab: any) {
    if (!this.IstabChange) {
      this.IstabChange = true;
      this.spinnerService.show();
      var IsCheck = this.getChangesCheck();

      if (IsCheck) { 
        this.ConfirmationDialog(tab.index);
        this.tabIndex = this.PrevtabIndex;

      }
      else if (tab.index == 2 || tab.index == 5) {
        this.saveDisabled = true;
        this.PrevtabIndex = tab.index;
        this.tabIndex = tab.index;
        this.IstabChange = false;
      }
      else {
        this.saveDisabled = false;
        this.PrevtabIndex = tab.index;
        this.tabIndex = tab.index;
        this.IstabChange = false;
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 500);
      // this.PrevtabIndex =this.tabIndex; 
    }
  }

  async ConfirmationDialog(tabIndex) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '786px',
      data: {
        message: 'Changes you made may not be saved.',
        heading: 'Inventory Master'
      },
      autoFocus: '__non_existing_element__',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === 'Yes') { 
        await this.getInvMasterDetail(this.searchValue);
        console.log(this.tabIndex);
        this.tabIndex = tabIndex;
        this.PrevtabIndex = tabIndex;
        this.IstabChange = false;
      } else {
        this.IstabChange = false;
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  onbeforeunload(event) {
    if (this.ifAllowed) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

  @HostListener('document:keyup', ['$event'])
  documentClick(event: MouseEvent) {
    var IsCheck = this.getChangesCheck();
    if (IsCheck) {
      this.ifAllowed = true;
    }
  }
}

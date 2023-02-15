import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { AdminPrefrencesService } from './admin-prefrences.service';
import labels from '../../labels/labels.json';

@Component({
  selector: 'app-admin-prefrences',
  templateUrl: './admin-prefrences.component.html',
  styleUrls: ['./admin-prefrences.component.scss']
})
export class AdminPrefrencesComponent implements OnInit {

  public userData : any;
  preferencesForm : FormGroup;

  shortMethodList : any = [
    {
      id    : "Complete Short",
      name  : "Complete Short"
    },
    {
      id    : "Send to Markout",
      name  : "Send to Markout"
    },
    {
      id    : "Split and Deallocate",
      name  : "Split and Deallocate"
    }
  ];
  
  stripSideList : any = [
    {
      id    : "Left",
      name  : "Left"
    },
    {
      id    : "Right",
      name  : "Right"
    }
  ];
  
  pickOrderSortList : any = [
    {
      id    : "Order Number Sequence",
      name  : "Order Number Sequence"
    },
    {
      id    : "Import Date and Order Number",
      name  : "Import Date and Order Number"
    },
    {
      id    : "Import Date and Priority",
      name  : "Import Date and Priority"
    },
    {
      id    : "Import File Sequence",
      name  : "Import File Sequence"
    },
    {
      id    : "Priority and Import Date",
      name  : "Priority and Import Date"
    },
    {
      id    : "Required Date and Priority",
      name  : "Required Date and Priority"
    }
  ];
  
  defaultPutAwayScanTypeList : any = [
    {
      id    : "Any",
      name  : "Any"
    },
    {
      id    : "Item Number",
      name  : "Item Number"
    },
    {
      id    : "Serial Number",
      name  : "Serial Number"
    },
    {
      id    : "Lot Number",
      name  : "Lot Number"
    },
    {
      id    : "Host Transaction ID",
      name  : "Host Transaction ID"
    },
    {
      id    : "Scan Code",
      name  : "Scan Code"
    },
    {
      id    : "Supplier Item ID",
      name  : "Supplier Item ID"
    }
  ];
  
  putAwayInductionScreenList : any = [
    {
      id    : "Unlimited Positions",
      name  : "Unlimited Positions"
    },
    {
      id    : "20 Tote Matrix",
      name  : "20 Tote Matrix"
    }
  ];

  constructor(private authService               : AuthService,
              private adminPrefrencesService    : AdminPrefrencesService,
              public formBuilder                : FormBuilder,
              private toast                     : ToastrService) {

                this.preferencesForm = this.formBuilder.group({
                  // goalName: new FormControl('', Validators.compose([
                  //   Validators.required,
                  //   Validators.minLength(2),
                  //   Validators.maxLength(50)
                  // ])),

                  // System Settings
                  useDefault                        : new FormControl('', Validators.compose([])),
                  //useDefaultFilter                  : new FormControl(false, Validators.compose([])),
                  //useDefaultZone                    : new FormControl(true, Validators.compose([])),
                  defaultSuperBatchSize             : new FormControl(0, Validators.compose([])),
                  defaultCells                      : new FormControl(0, Validators.compose([])),
                  shortMethod                       : new FormControl('', Validators.compose([])),
                  selectIfOne                       : new FormControl(false, Validators.compose([])),
                  validateTotes                     : new FormControl(false, Validators.compose([])),                  
                  autoForwardReplenish              : new FormControl(false, Validators.compose([])),
                  createItemMaster                  : new FormControl(false, Validators.compose([])),
                  sapLocationTransactions           : new FormControl(false, Validators.compose([])),
                  stripScan                         : new FormControl(false, Validators.compose([])),
                  stripSide                         : new FormControl('', Validators.compose([])),
                  stripNumber                       : new FormControl(0, Validators.compose([])),

                  // Pick Settings
                  autoPickOrderSelection            : new FormControl(false, Validators.compose([])),
                  autoPickToteID                    : new FormControl(false, Validators.compose([])),
                  carouselToteIDPicks               : new FormControl(false, Validators.compose([])),
                  offCarouselToteIDPicks            : new FormControl(false, Validators.compose([])),
                  usePickBatchManager               : new FormControl(false, Validators.compose([])),
                  carouselBatchIDPicks              : new FormControl(false, Validators.compose([])),
                  offCarouselBatchIDPicks           : new FormControl(false, Validators.compose([])),
                  orderSort                         : new FormControl('', Validators.compose([])),
                  useInZonePickScreen               : new FormControl(false, Validators.compose([])),
                  autoPrintCaseLabel                : new FormControl(false, Validators.compose([])),

                  // Put Away Settings
                  autoPutAwayToteID                 : new FormControl(false, Validators.compose([])),
                  splitShortPutAway                 : new FormControl(false, Validators.compose([])),
                  carouselBatchIDPutAways           : new FormControl(false, Validators.compose([])),
                  offCarouselBatchIDAways           : new FormControl(false, Validators.compose([])),
                  createPutAwayAdjustments          : new FormControl(false, Validators.compose([])),
                  defaultPutAwayScanType            : new FormControl('', Validators.compose([])),
                  defaultPutAwayPriority            : new FormControl(0, Validators.compose([])),
                  defaultPutAwayQuantity            : new FormControl(0, Validators.compose([])),
                  putAwayInductionScreen            : new FormControl('', Validators.compose([])),

                  // Print Settings
                  autoPrintCrossDockLabel           : new FormControl(false, Validators.compose([])),
                  autoPrintPickLabels               : new FormControl(false, Validators.compose([])),
                  pickLabelsOnePerQty               : new FormControl(false, Validators.compose([])),
                  autoPrintPickToteLabels           : new FormControl(false, Validators.compose([])),
                  autoPrintPutAwayToteLabels        : new FormControl(false, Validators.compose([])),
                  autoPrintOffCarouselPickList      : new FormControl(false, Validators.compose([])),
                  autoPrintOffCarouselPutAwayList   : new FormControl(false, Validators.compose([])),
                  autoPrintPutAwayLabels            : new FormControl(false, Validators.compose([])),
                  requestNumberOfPutAwayLabels      : new FormControl(false, Validators.compose([])),
                  autoPrintPickBatchList            : new FormControl(false, Validators.compose([])),
                  printDirectly                     : new FormControl(false, Validators.compose([])),
                  maxNumberOfPutAwayLabels          : new FormControl(0, Validators.compose([]))

                });
            
  }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getPreferences();
  }

  getPreferences() {
    try {
      var payload = { wsid: this.userData.wsid }
      this.adminPrefrencesService.get(payload, '/Induction/PreferenceIndex').subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            // console.log(res.data)
            const values = res.data.imPreference
            this.preferencesForm.patchValue({

              // System Settings
              'useDefault'                        : values.useDefaultFilter ? 'filter' : 'zone',
              // 'useDefaultFilter'                  : values.useDefaultFilter,
              // 'useDefaultZone'                    : values.useDefaultZone,
              'defaultSuperBatchSize'             : values.defaultSuperBatchSize,
              'defaultCells'                      : values.defaultCells,
              'shortMethod'                       : values.shortMethod,
              'selectIfOne'                       : values.selectIfOne,
              'validateTotes'                     : values.validateTotes,
              'autoForwardReplenish'              : values.autoForwardReplenish,
              'createItemMaster'                  : values.createItemMaster,
              'sapLocationTransactions'           : values.sapLocationTransactions,
              'stripScan'                         : values.stripScan,
              'stripSide'                         : values.stripSide,
              'stripNumber'                       : values.stripNumber,

              // Pick Settings
              'autoPickOrderSelection'            : values.autoPickOrderSelection,
              'autoPickToteID'                    : values.autoPickToteID,
              'carouselToteIDPicks'               : values.carouselToteIDPicks,
              'offCarouselToteIDPicks'            : values.offCarouselToteIDPicks,
              'usePickBatchManager'               : values.usePickBatchManager,
              'carouselBatchIDPicks'              : values.carouselBatchIDPicks,
              'offCarouselBatchIDPicks'           : values.offCarouselBatchIDPicks,
              'orderSort'                         : values.orderSort,
              'useInZonePickScreen'               : values.useInZonePickScreen,
              'autoPrintCaseLabel'                : values.autoPrintCaseLabel,

              // Put Away Settings
              'autoPutAwayToteID'                 : values.autoPutAwayToteID,
              'splitShortPutAway'                 : values.splitShortPutAway,
              'carouselBatchIDPutAways'           : values.carouselBatchIDPutAways,
              'offCarouselBatchIDAways'           : values.offCarouselBatchIDAways,
              'createPutAwayAdjustments'          : values.createPutAwayAdjustments,
              'defaultPutAwayScanType'            : values.defaultPutAwayScanType,
              'defaultPutAwayPriority'            : values.defaultPutAwayPriority,
              'defaultPutAwayQuantity'            : values.defaultPutAwayQuantity,
              'putAwayInductionScreen'            : values.putAwayInductionScreen,

              // Print Settings
              'autoPrintCrossDockLabel'           : values.autoPrintCrossDockLabel,
              'autoPrintPickLabels'               : values.autoPrintPickLabels,
              'pickLabelsOnePerQty'               : values.pickLabelsOnePerQty,
              'autoPrintPickToteLabels'           : values.autoPrintPickToteLabels,
              'autoPrintPutAwayToteLabels'        : values.autoPrintPutAwayToteLabels,
              'autoPrintOffCarouselPickList'      : values.autoPrintOffCarouselPickList,
              'autoPrintOffCarouselPutAwayList'   : values.autoPrintOffCarouselPutAwayList,
              'autoPrintPutAwayLabels'            : values.autoPrintPutAwayLabels,
              'requestNumberOfPutAwayLabels'      : values.requestNumberOfPutAwayLabels,
              'autoPrintPickBatchList'            : values.autoPrintPickBatchList,
              'printDirectly'                     : values.printDirectly,
              'maxNumberOfPutAwayLabels'          : values.maxNumberOfPutAwayLabels,

            });
          } else {
            this.toast.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => { }
      );
    } catch (error) {
      console.log(error);
    }
  }

  updatePreferences(type : any) {
    try {

      const values = this.preferencesForm.value;
      let payLoad = {};
      let endPoint = '';

      if (type == 1) {
        
        payLoad = { 
          "AutoPickOrder": values.autoPickOrderSelection,
          "OrderSort": values.orderSort,
          "AutoPickTote": values.autoPickToteID,
          "CarTotePicks": values.carouselToteIDPicks,
          "OffCarTotePicks": values.offCarouselToteIDPicks,
          "UsePickBatch": values.usePickBatchManager,
          "UseDefFilter": values.useDefault == 'filter' ? true : false,
          "UseDefZone": values.useDefault == 'zone' ? true : false,
          "AutoPutTote": values.autoPutAwayToteID,
          "DefPutPrior": values.defaultPutAwayPriority,
          "DefPutQuant": values.defaultPutAwayQuantity,
          "PickBatchQuant": values.defaultSuperBatchSize,
          "DefCells": values.defaultCells,
          "SplitShortPut": values.splitShortPutAway,
          "SelIfOne": values.selectIfOne,
          "PutInductScreen": values.putAwayInductionScreen,
          "ValTote": values.validateTotes,
          "CarBatchPicks": values.carouselBatchIDPicks,
          "CarBatchPuts": values.carouselBatchIDPutAways,
          "OffCarBatchPicks": values.offCarouselBatchIDPicks,
          "OffCarBatchPuts": values.offCarouselBatchIDAways,
          "AutoForReplen": values.autoForwardReplenish,
          "CreateItemMast": values.createItemMaster,
          "SAPLocTrans": values.sapLocationTransactions,
          "CreatePutAdjusts": values.createPutAwayAdjustments,
          "StripScan": values.stripScan,
          "StripSide": values.stripSide,
          "StripNum": values.stripNumber,
          "PutScan": values.defaultPutAwayScanType,
          "UseInZonePickScreen": values.useInZonePickScreen,
          "AutoPrintCaseLabel": values.autoPrintCaseLabel,
          "ShortMethod": values.shortMethod,
          "WSID": this.userData.wsid 
        }

        endPoint = '/Induction/IMSytemSettingsUpdate'

      } else {
        
        payLoad = { 
          "AutoPrintCross": values.autoPrintCrossDockLabel,
          "AutoPrintPickLabs": values.autoPrintPickLabels,
          "PickLabsOnePer": values.pickLabelsOnePerQty,
          "AutoPrintPickToteLabs": values.autoPrintPickToteLabels,
          "AutoPrintPutToteLabs": values.autoPrintPutAwayToteLabels,
          "AutoPrintOffCarPickList": values.autoPrintOffCarouselPickList,
          "AutoPrintOffCarPutList": values.autoPrintOffCarouselPutAwayList,
          "AutoPrintPutLabs": values.autoPrintPutAwayLabels,
          "ReqNumPutLabs": values.requestNumberOfPutAwayLabels,
          "MaxNumPutLabs": values.maxNumberOfPutAwayLabels,
          "PrintDirect": values.printDirectly,
          "AutoPrintPickBatchList": values.autoPrintPickBatchList,
          "WSID": this.userData.wsid 
        }

        endPoint = '/Induction/IMPrintSettingsUpdate'

      }
    
      this.adminPrefrencesService.update(payLoad, endPoint).subscribe(
        (res: any) => {
          if (res.data && res.isExecuted) {
            this.toast.success(labels.alert.update, 'Success!',{
              positionClass: 'toast-bottom-right',
              timeOut:2000
           });            
          } else {
            this.toast.error('Something went wrong', 'Error!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000,
            });
          }
        },
        (error) => { }
      );
      
    } catch (error) {
      console.log(error);
    }
  }

}

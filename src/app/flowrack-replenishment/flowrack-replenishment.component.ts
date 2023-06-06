import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrNumpadComponent } from '../dialogs/fr-numpad/fr-numpad.component';
import { FlowrackService } from './flowrack.service';
import { AuthService } from '../init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-flowrack-replenishment',
  templateUrl: './flowrack-replenishment.component.html',
  styleUrls: ['./flowrack-replenishment.component.scss']
})
export class FlowrackReplenishmentComponent implements OnInit {
  public userData: any;
  public itemQtyRow: boolean = true;
  public LocationRow: boolean = true;
  public submitBtnDisplay: boolean = true;
  public itemnumscan: any;
  public itemLocation: string;
  public itemQty: any
  public locationSuggestions: any = [];
  public zone: any;

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  searchByItem: any = new Subject<string>();
  searchAutocompleteItemNum: any = [];

  @ViewChild('autoFocusField') autoFocusField: ElementRef
  @ViewChild('itemQtyFocus') itemQtyFocus: ElementRef
  @ViewChild('itemLocationFocus') itemLocationFocus: ElementRef
  @ViewChild('scrollbar') scrollbar: ElementRef

  @ViewChild('auto') matAutocomplete: MatAutocompleteTrigger;


  constructor(private dialog: MatDialog,
    private flowrackHub: FlowrackService,
    private authservice: AuthService,
    private toastr: ToastrService,
    private _elementRef: ElementRef) { }

  ngOnInit(): void {
    this.userData = this.authservice.userData()
    this.cartonFlow()
  }


  values(event) {
   
    this.itemLocation = this.autocompleteTrigger.activeOption?.value.location;
 
  }



  locationchange(e) {
    if (e === '') {
      this.clearQtyField()
    }
    if (e.keyCode == 13) {      
      this.onLocationSelected(this.itemLocation)
    }
  }


  cartonFlow() {
    let payload = {
      "wsid": this.userData.wsid,
    }
    this.flowrackHub.getAll('/FlowRackReplenish/wslocation', payload).subscribe((res) => {
      console.log(res)
      this.zone = res.data == 'No'||'' ? 'This workstation is not assigned to a zone' : res.data
      console.log(res)
    })
  }

  updateQty(val) {
    // console.log(val)
    if (val !== 0) {
      this.submitBtnDisplay = false;
      this.itemQtyFocus.nativeElement.focus()
    }
    if (val === 0 || val === '') {
      this.submitBtnDisplay = true;
    }
    if (val == '') {
      this.submitBtnDisplay = true;
    }
  }

  clearItemNum() {
    this.clearAllFields();
  }

  scanItemChange(e) {
    if (e === '') {
      this.clearAllFields()
    }
  }


  locationchangeClick(e) {
    this.itemLocation = e
    this.onLocationSelected(this.itemLocation)
  }

  locationchangeSelect(event: MatAutocompleteSelectedEvent): void {
    this.itemLocation = '';
    setTimeout(() => { 
      this.itemLocation = event.option.value.location; 
      this.onLocationSelected(this.itemLocation)
    }, 1);
  }


  findItemLocation(event) {
    this.clearQtyField()
    if (event.keyCode == 13) {
      this.LocationRow = false;
      this.itemnumscan = event.target.value
      let payload = {
        "ItemNumber": this.itemnumscan,
      }
      this.flowrackHub.getAll('/FlowRackReplenish/CFData', payload).subscribe((res => {
        if (res.data != '') {
          this.itemnumscan = res.data
          let payload = {
            "itemNumber": this.itemnumscan,
            "wsid": this.userData.wsid
          }
          this.flowrackHub.getAll('/FlowRackReplenish/ItemLocation', payload).subscribe((res => {
            if (res.data.length < 1) {
              this.locationSuggestions = [];
              let payload = {
                "wsid": this.userData.wsid
              }
              this.flowrackHub.getAll('/FlowRackReplenish/openlocation', payload).subscribe((res => {
                // console.log(res)
                if (res.data.length < 1) {
                  this.toastr.error("There are no open locations.", 'Error!', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000
                  });
                  this.LocationRow = true;
                  this.itemLocation = ''
                }
                else {
                  this.toastr.error("No Locations found for Item Number, Scan or Select an open Location.", 'Error!', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 2000
                  });
                  this.locationSuggestions = res.data
                  this.LocationRow = false;


                  setTimeout(() => {
                    this.itemLocationFocus.nativeElement.focus();
                    this.itemLocationFocus.nativeElement.select();
                  }, 0);
                }
              }))
            }
            else {
              this.locationSuggestions = res.data
            }
            this.LocationRow = false;
            this.itemLocation = res.data[0].location;
            setTimeout(() => {
              this.itemLocationFocus.nativeElement.focus();
              this.itemLocationFocus.nativeElement.select();
            }, 0);
          }))

        }
        else {
          this.itemnumscan = '';
          this.toastr.error("This item does not exist in Inventory Master for this carton flow zone.", 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
          this.clearAllFields()
        }
      }))

    }
  }

  onLocationSelected(location) {
    let payload = {
      "itemNumber": this.itemnumscan,
      "Input": this.itemLocation,
      "wsid": this.userData.wsid,
    }
    this.flowrackHub.getAll('/FlowRackReplenish/verifyitemlocation', payload).subscribe((res => {
      if (res) {
        this.itemQtyRow = false;
        this.itemQty = '';

        this.openCal()
      }
      else {
        this.clearLocationField()
        this.LocationRow = true;
        this.autoFocusField.nativeElement.focus()
        this.toastr.error("Location unavailable.", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    }))
  }

  openCal() {
    const dialogRef = this.dialog.open(FrNumpadComponent, {
      width: '480px',
      minWidth: '480px',
      autoFocus: '__non_existing_element__',
   
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result)
      this.itemQty = !result ? '' : result;
      this.submitBtnDisplay = !result ? true : false;
  
      // console.log(this.itemLocation)
      this.autocompleteTrigger.closePanel()
      setTimeout(() => {
        this.itemQtyFocus.nativeElement.focus();
      }, 0);
     
    });
  }

  clearAllFields() {
    this.submitBtnDisplay = true;
    this.itemQty = '';
    this.itemQtyRow = true;
    this.itemLocation = '';
    this.LocationRow = true;
    this.itemnumscan = '';
    this.autoFocusField.nativeElement.focus()
  }

  clearQtyField() {
    this.submitBtnDisplay = true;
    this.itemQty = '';
    this.itemQtyRow = true;
  }

  clearLocationField() {
    this.submitBtnDisplay = true;
    this.itemQty = '';
    this.itemQtyRow = true;
    this.itemLocation = ''
  }

  resetForm() {
    this.submitBtnDisplay = true;
    this.itemQty = '';
    this.itemQtyRow = true;
    this.itemLocation = '';
    this.LocationRow = true;
    this.itemnumscan = '';
    this.autoFocusField.nativeElement.focus()
  }

  updateItemQuantity() {
    // debugger
    if (this.itemQty <= 0) {
      // console.log('less than zero')
      this.toastr.error("Quantity must be greater than zero.", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      // this.itemQty = ''
      // this.itemQty.nativeElement.focus()
    }

    else if (this.itemQty == '') {
      // console.log('empty')
      this.toastr.error("Please enter a quantity.", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }

    else {

      let payload = {
        "itemNumber": this.itemnumscan,
        "Input": this.itemLocation,
        "Quantity": this.itemQty,
        "wsid": this.userData.wsid,
      }
      // console.log(payload)
      this.flowrackHub.getAll('/FlowRackReplenish/verifyitemquantity', payload).subscribe((res => {
        // console.log(res)
        if (res.data) {
          let payload = {
            "itemNumber": this.itemnumscan,
            "Input": this.itemLocation,
            "Quantity": this.itemQty,
            "wsid": this.userData.wsid,
          }

          this.flowrackHub.put(payload, '/FlowRackReplenish/itemquantity').subscribe((res => {
            if (res.isExecuted) {
              // console.log('added')
              this.toastr.success('Item Quantity Added', 'Success!', {
                positionClass: 'toast-bottom-right',
                timeOut: 2000,
              });
              this.resetForm()
            }
          }))
        }
        else {
          this.itemQty = '';
          this.itemQtyFocus.nativeElement.select()
          this.toastr.error("The quantity was not entered due to an error in the Inventory Map", 'Error!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }

      }))
    }
  }

}

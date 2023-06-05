import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrNumpadComponent } from '../dialogs/fr-numpad/fr-numpad.component';
import { FlowrackService } from './flowrack.service';
import { AuthService } from '../init/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-flowrack-replenishment',
  templateUrl: './flowrack-replenishment.component.html',
  styleUrls: ['./flowrack-replenishment.component.scss']
})
export class FlowrackReplenishmentComponent implements OnInit {
  public userData : any;
  public itemQtyRow : boolean = true;
  public LocationRow: boolean = true;
  public submitBtnDisplay  : boolean = true;
  public itemnumscan : any;
  public itemLocation : any;
  public itemQty:any
  public locationSuggestions: any = [];

  searchByItem: any = new Subject<string>();
  searchAutocompleteItemNum: any = [];

  @ViewChild('autoFocusField') autoFocusField : ElementRef
  @ViewChild('itemQtyFocus') itemQtyFocus : ElementRef
  @ViewChild('itemLocationFocus') itemLocationFocus : ElementRef
  @ViewChild('scrollbar') scrollbar : ElementRef
  
  constructor(private dialog: MatDialog,
              private flowrackHub : FlowrackService,
              private authservice : AuthService,
              private toastr: ToastrService,
              private _elementRef : ElementRef) { }

  ngOnInit(): void {
    this.userData = this.authservice.userData()
    this.searchByItem
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe((value) => {
      // console.log(value)
    });
    
  }

  ModifyDOMElement() : void
  { 
    // debugger
    //Do whatever you wish with the DOM element.
    let domElement = this._elementRef.nativeElement.querySelector(`#someID`);
    // console.log(domElement)
  } 

  findItemLocation(event){
    
    if(event.keyCode == 13){
      this.LocationRow = false;
      this.itemnumscan = event.target.value
      // this.onLocationSelected(this.itemnumscan)
    //  debugger
    // console.log(event.target.value)
    let payload = {
      "ItemNumber": this.itemnumscan,
    }
    this.flowrackHub.getAll('/FlowRackReplenish/CFData',payload).subscribe((res=>{
      // console.log(res)
      if(res.data != null){
        let payload = {
          "itemNumber": this.itemnumscan,
          "wsid": this.userData.wsid
        }

        // later change this fc with api from preferences
        // console.log(payload)
        this.flowrackHub.getAll('/FlowRackReplenish/ItemLocation',payload).subscribe((res=>{
          // console.log(res.data.length)
          if(res.data.length<1){
            this.locationSuggestions = [];
            let payload = {
              "wsid": this.userData.wsid
            }
            this.flowrackHub.getAll('/FlowRackReplenish/openlocation',payload).subscribe((res=>{
              if(res.data.length<1){
                this.toastr.error("There are no open locations.", 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000
                });
                this.LocationRow = true;
                // destroy type ahead
              }
              else{
                this.toastr.error("No Locations found for Item Number, Scan or Select an open Location.", 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000
                });
                this.locationSuggestions = res.data
                this.LocationRow = false;
                this.itemLocationFocus.nativeElement.focus();
                this.itemLocationFocus.nativeElement.select();
                // open typeahead
              }
            }))
          }
          else{
            this.locationSuggestions = res.data
            this.ModifyDOMElement()
            // this.itemLocation = res.data[0].location;
            // this.autoFocusField.nativeElement.focus();
            // this.LocationRow = false;
            // open typeahead
          }
          this.LocationRow = false;
          this.itemLocation = res.data[0].location;
          // this.itemLocation= '55'
          this.itemLocationFocus.nativeElement.focus();
          this.itemLocationFocus.nativeElement.select();
        }))
      }
      else{
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

  onLocationSelected(location){
    // debugger
    console.log(location)
    this.itemLocation = location.location
    console.log(this.itemLocation)

    let payload = {
      "itemNumber": this.itemnumscan,
      "Input": location.location,
      "wsid": this.userData.wsid,
    }
    console.log(payload)
    this.flowrackHub.getAll('/FlowRackReplenish/verifyitemlocation',payload).subscribe((res=>{
      console.log(res)
      if(res){
        this.itemQtyRow = false;
        this.itemQty = '';
        this.itemQtyFocus.nativeElement.focus()
        this.openCal()
      }
      else{
        this.clearLocationField()
        this.LocationRow = true;
        this.autoFocusField.nativeElement.focus
        this.toastr.error("Location unavailable.", 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
    }))
  }

  updateQty(val){
    
    if(val !== 0){
      this.submitBtnDisplay = false;
      this.itemQtyFocus.nativeElement.focus()
    }
    if(val === 0 || val === ''){
      this.submitBtnDisplay = true;
    }
  }

  clearItemNum(){
    this.clearAllFields();
  }



  openCal() {
    const dialogRef = this.dialog.open(FrNumpadComponent, {
      width: '480px',
      minWidth:'480px',
      autoFocus: '__non_existing_element__',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // console.log(result)
      this.itemQty = !result?'':result;
      console.log(this.itemQty)
    });
  }

  clearAllFields(){
    this.submitBtnDisplay =true;
    this.itemQty = '';
    this.itemQtyRow=true;
    this.itemLocation = '';
    this.LocationRow =true;
    this.itemnumscan = '';
    this.autoFocusField.nativeElement.focus()
    // end typeahead
  }

  clearQtyField(){
    this.submitBtnDisplay = false;
    this.itemQty = '';
    this.itemQtyRow = false;
  }

  clearLocationField(){
    this.submitBtnDisplay = false;
    this.itemQty = '';
    this.itemQtyRow = false;
  }

//   async autocompleteSearchColumnItem() {
// // function for location typeahead
//     let payload = {
 
//       "username": this.userData.userName,
//       "wsid": this.userData.wsid,
//     }

//     this.flowrackHub.get(payload, '').subscribe((res: any) => {
//       // this.searchAutocompleteItemNum = res.data;
//     });

//   }


  updateItemQuantity(){
    if(this.itemQty <= 0){
      this.toastr.error("Quantity can not be negative.", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      this.itemQty = ''
      this.itemQty.nativeElement.focus()
    }

    if(this.itemQty == ''){
      this.toastr.error("Please enter a quantity.", 'Error!', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
    }

    else{
      let payload = {
        
      }
    }
  }

  tests(e){
  console.log(e)
  }

  onDown(e : any){
    console.log('selection changed using keyboard arrow');
    console.log(e)
  }

  scanItemChange(e){
    if(e === ''){
      this.clearAllFields()
    }
  }







}

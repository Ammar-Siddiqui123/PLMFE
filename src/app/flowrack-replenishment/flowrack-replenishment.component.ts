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
  public itemQtyRow : boolean = false;
  public LocationRow: boolean = false;
  public submitBtnDisplay  : boolean = false;
  public itemnumscan : any;
  public itemLocation : any;
  public itemQty:any
  public locationSuggestions: any = [];

  searchByItem: any = new Subject<string>();
  searchAutocompleteItemNum: any = [];

  @ViewChild('autoFocusField') autoFocusField : ElementRef
  @ViewChild('itemQtyFocus') itemQtyFocus : ElementRef
  @ViewChild('itemLocationFocus') itemLocationFocus : ElementRef
  
  constructor(private dialog: MatDialog,
              private flowrackHub : FlowrackService,
              private authservice : AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userData = this.authservice.userData()
  }

  findItemLocation(event){
    
    if(event.keyCode == 13){
     debugger
    // console.log(event.target.value)
    this.itemnumscan = event.target.value
    let payload = {
      "ItemNumber": this.itemnumscan,
    }
    this.flowrackHub.getAll('/FlowRackReplenish/CFData',payload).subscribe((res=>{
      console.log(res)
      console.log('test')
      if(res.data != null){
        let payload = {
          "itemNumber": this.itemnumscan,
          "Zone": 'FC'
        }

        // later change this fc with api from preferences
        console.log(payload)
        this.flowrackHub.getAll('/FlowRackReplenish/ItemLocation',payload).subscribe((res=>{
          // console.log(res.data.length)
          if(res.data.length<1){
            this.locationSuggestions = [];
            this.flowrackHub.get('','').subscribe((res=>{
              if(res.length<1){
                this.toastr.error("There are no open locations.", 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000
                });
                // destroy type ahead
              }
              else{
                this.toastr.error("No Locations found for Item Number, Scan or Select an open Location.", 'Error!', {
                  positionClass: 'toast-bottom-right',
                  timeOut: 2000
                });
                this.locationSuggestions = res.data
                // open typeahead
              }
            }))
          }
          else{
            this.locationSuggestions = res.data
            console.log(this.locationSuggestions )
            // open typeahead
          }
          this.LocationRow = true;
          // this.itemLocationFocus.nativeElement.focus()
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
    let payload = {
      "itemNumber": this.itemnumscan,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.flowrackHub.get(payload,'verifyitemLoc').subscribe((res=>{
      console.log(res)
      if(res){
        this.itemQtyRow = true;
        this.itemQty = '';
        this,this.itemQtyFocus.nativeElement.focus()
        this.openCal()
      }
      else{
        this.clearLocationField()
        this.LocationRow = false;
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
      this.submitBtnDisplay = true;
      this.itemQtyFocus.nativeElement.focus()
    }
    if(val === 0 || val === ''){
      this.submitBtnDisplay = false;
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
      console.log(result)
      this.itemQty = !result?'':result;
    });
  }

  clearAllFields(){
    this.submitBtnDisplay = false;
    this.itemQty = '';
    this.itemQtyRow= false;
    this.itemLocation = '';
    this.LocationRow = false;
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

  async autocompleteSearchColumnItem() {
// function for location typeahead
    let payload = {
 
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }

    this.flowrackHub.get(payload, '').subscribe((res: any) => {
      this.searchAutocompleteItemNum = res.data;
    });

  }

  getRow(){
    
  }

}

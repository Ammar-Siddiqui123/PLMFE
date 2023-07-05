import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/admin/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ApiFuntions } from 'src/app/services/ApiFuntions';

@Component({
  selector: 'app-cpb-blossom-tote',
  templateUrl: './cpb-blossom-tote.component.html',
  styleUrls: ['./cpb-blossom-tote.component.scss']
})
export class CpbBlossomToteComponent implements OnInit {

  displayedColumns: string[] = ['item_number', 'transaction_qty', 'qty_in_old_date'];
  toteId: any;
  transactions: any = [];
  newToteID: any = "";
  submitBlossomEnable = false;
  @ViewChild('NewToteID') NewToteIDField: ElementRef;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private Api: ApiFuntions,
    public dialogRef: MatDialogRef<CpbBlossomToteComponent>,
  ) { }

  ngOnInit(): void {
    this.toteId = this.data.toteId;
    this.data.transactions.forEach((x: any) => {
      this.transactions.push(
        {
          id: x.id,
          itemNumber: x.itemNumber,
          transactionQuantity: x.transactionQuantity,
          oldToteQuantity: null
        }
      );
    });
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.NewToteIDField.nativeElement.focus();  
    }, 500);
  }

  newToteIdFocusOut() {
    if (this.newToteID != "") {
      this.Api.ValidateTote({ toteID: this.newToteID }).subscribe((res: any) => {
        if (res.isExecuted && res.data != "") {
          this.submitBlossomEnable = true;
        }
        else {
          this.newToteID = "";
          this.submitBlossomEnable = false;
          this.toastr.error("This tote is currently assigned to another open order", 'Invalid Tote', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
      });
    }
    else {
      this.submitBlossomEnable = false;
    }
  }

  qtyInOldToteFoucusOut(element:any){
    if(element.oldToteQuantity < 0 || element.oldToteQuantity > element.transactionQuantity){
      this.toastr.error("Invalid Quantity Entered", 'Invalid Quantity Entered', {
        positionClass: 'toast-bottom-right',
        timeOut: 2000
      });
      element.oldToteQuantity = null;
    }
  }

  submitBlossom() {
    let payload:any = {
      blossomTotes: [],
      newTote: this.newToteID
    }


    this.transactions.forEach((x:any) => {
      payload.blossomTotes.push({
        id:x.id,
        transactionQuantity: x.transactionQuantity,
        oldToteQuantity: x.oldToteQuantity ? x.oldToteQuantity : 0
      });
    });

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        heading: 'Perform Blossom?',
        message: 'Perform a blossom wiht the current setup? This will complete the original tote with the quantities entered, and assign any remaining quantities to the new tote.',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        this.Api.blossomTote(payload).subscribe((res: any) => {
          if(res.isExecuted){
            this.dialogRef.close({newToteID:this.newToteID});
          }
          else{
            this.toastr.error("An error occured when blossoming this tote", 'Error', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      }
    });
  }
}

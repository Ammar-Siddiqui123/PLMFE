import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiFuntions } from 'src/app/services/ApiFuntions';
import { ReelDetailComponent } from '../reel-detail/reel-detail.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reel-transactions',
  templateUrl: './reel-transactions.component.html',
  styleUrls: ['./reel-transactions.component.scss']
})
export class ReelTransactionsComponent implements OnInit {

  ELEMENT_DATA: any[] =[
    {reel_serial_number: '1202122', reel_part_quantity: '36'},
    {reel_serial_number: '1202122', reel_part_quantity: '36'},
    {reel_serial_number: '1202122', reel_part_quantity: '36'},
  ];
    
  displayedColumns: string[] = ['reel_serial_number','button','reel_part_quantity','action'];
  generateReelAndSerial:MatTableDataSource<any> = new MatTableDataSource<any>([]);

  itemNumber:any;
  description:any;
  partsInducted:any;
  partsNotAssigned:any;
  noOfReels:any
  AutoGenerateReel:any =false

  @ViewChild('noOfReeltemp') noOfReeltemp: ElementRef
  @ViewChild('serialTemp') serialTemp: ElementRef
  
  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<ReelTransactionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private Api:ApiFuntions,private toastr: ToastrService,) { }

  ngOnInit(): void {
    
    this.itemNumber = this.data.itemObj.number
    this.description = this.data.itemObj.description
    this.partsInducted =this.data.itemObj.totalParts
    this.partsNotAssigned =this.oldIncluded?this.oldIncluded:''
    this.noOfReels = this.data.itemObj.numReels
    setTimeout(() => {
      this.ReelDetailDialogue()
    }, 300);
    
  }

reel
oldIncluded
  ReelDetailDialogue() {
    
    const dialogRef = this.dialog.open(ReelDetailComponent, {
      height: 'auto',
      width: '932px',
      autoFocus: '__non_existing_element__',
      data: {
        hvObj: this.data.hvObj,
        itemObj:this.data.itemObj
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result !=true || result != 'undefined'){
        this.partsInducted  =result.reelQty
        this.partsNotAssigned =result.reelQty
        this.oldIncluded = result.reelQty
        this.noOfReeltemp.nativeElement.select()

      }
      else{
        this.partsNotAssigned = this.oldIncluded?this.oldIncluded:''
        // this.partsIncluded = this.oldIncluded?this.oldIncluded:0
        // this.partsNotAssigned =this.oldIncluded?this.oldIncluded:0
      }
    })
  }

  OpenReelSerial(){
    debugger
    this.AutoGenerateReel = true
    let partsPerReel = Math.floor(this.partsInducted / this.noOfReels);

    let payload = {
      "numReels": this.noOfReels
    }
    this.Api.NextSerialNumber(payload).subscribe((res: any)=>{
      if (res.data && res.isExecuted){
        const dataArray: any[] = [];
        for (var x = 0; x < this.noOfReels; x++){
          dataArray.push({reel_serial_number: '', reel_part_quantity: partsPerReel});
        }
        this.generateReelAndSerial.data = dataArray;
       setTimeout(() => {
        this.serialTemp.nativeElement.focus()
       }, 100);


      }
      else {
        this.toastr.error('Something went wrong', 'Error!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000,
        });
      }
    },
    (error) => {}
    )
    

  }
}

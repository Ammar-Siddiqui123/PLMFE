import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventoryMasterService } from '../inventory-master.service';
import labels from '../../../labels/labels.json'
import { AuthService } from 'src/app/init/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-kit-item',
  templateUrl: './kit-item.component.html',
  styleUrls: ['./kit-item.component.scss']
})
export class KitItemComponent implements OnInit {

  @Input() kitItem: FormGroup;
  public userData: any;
  kitItemsList: any = [];
  dialogitemNumber: any = '';
  dialogDescription: any = '';

  searchValue: any = '';
  searchList: any;

  @ViewChild('additemNumber') additemNumber: TemplateRef<any>;
  @ViewChild('description') description: TemplateRef<any>;

  constructor(private invMasterService: InventoryMasterService,
    private toastr: ToastrService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    if( this.kitItem.controls['kitInventories'].value){
      this.kitItemsList =  this.kitItem.controls['kitInventories'].value;
    }

    console.log( this.kitItemsList)
  }

  openPrintRangeDialog(){

  }
  addCatRow(e: any){
    this.kitItemsList.push({
      itemNumber: '',
      description: '',
      specialFeatures: '',
      kitQuantity: ''
  })
  
  }

  dltCategory(e: any){
    if(e.itemNumber){
      let paylaod = {
        "itemNumber": this.kitItem.controls['itemNumber'].value,
        "kitItem": e.itemNumber,
        "kitQuantity": e.kitQuantity,
        "specialFeatures": e.specialFeatures,
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      this.invMasterService.get(paylaod, '/Admin/DeleteKit').subscribe((res: any) => {
  
        if(res.isExecuted){
          this.toastr.success(labels.alert.success, 'Success!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000
          });
        }
  
      })
    }

  }

  saveCategory(e: any){
    let paylaod = {
      "itemNumber": this.kitItem.controls['itemNumber'].value,
      "kitItem": e.itemNumber,
      "kitQuantity": e.kitQuantity,
      "specialFeatures": e.specialFeatures,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/InsertKit').subscribe((res: any) => {

      if(res.isExecuted){
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }

    })
  }

  openAddItemNumDialog(e): void {
    const dialogRef = this.dialog.open(this.additemNumber, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((x) => {
      debugger
      if(x){
        e.itemNumber= this.dialogitemNumber;
        e.description= this.dialogDescription;
    }
  })
  }

  openDescriptionDialog(e): void {
    const dialogRef = this.dialog.open(this.description, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((x) => {
      debugger
      if(x){
        e.description= this.dialogDescription
    }
  })
  }

  
  getSearchList(e: any) {
    
    this.searchValue = e.currentTarget.value;
    console.log(e.currentTarget.value)
    let paylaod = {
      "stockCode": e.currentTarget.value,
      "username": this.userData.userName,
      "wsid": this.userData.wsid,
    }
    this.invMasterService.get(paylaod, '/Admin/GetLocationTable').subscribe((res: any) => {
      if(res.data){
        this.searchList = res.data
      }
    });
  }

  onSearchSelect(e: any){
    this.dialogitemNumber = e.option.value.itemNumber;
    this.dialogDescription = e.option.value.description;
  }

}

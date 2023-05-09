import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintRangeComponent } from '../print-range/print-range.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/common/services/category.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {

  public category_list: any;
  public userData: any;
  enableButton=[{index:-1,value:true}];

  constructor(private dialog: MatDialog,
              private catService: CategoryService,
              private authService: AuthService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<any>) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getCategoryList();
  }

  enableDisableButton(i:any)
  {
  this.enableButton[i].value=false;
  }

 getCategoryList(){ 
    // this.enableButton.shift();
    this.catService.getCategory().subscribe((res) => {
      this.category_list = res.data;
      this.enableButton=[];
      for(var i=0;i<this.category_list.length;i++)
      {
        this.category_list.fromDB = true;
        this.enableButton.push({index:i,value:true});
      }
     });
  }

  addCatRow(row : any){
    this.category_list.unshift({
      category : "",
      subCategory: "",
      fromDB:false
  });
  this.enableButton.push({index:-1,value:true})
  }

  saveCategory(category : any, oldCat : any, subCategory : any, oldSubCat : any) {
    //console.log(category, oldCat, subCategory, oldSubCat);
    
    let cond = true;
    if(category){
    this.category_list.forEach(element => {
      if(element.category?.toLowerCase() == category?.toLowerCase() && element.subCategory?.toLowerCase() == subCategory?.toLowerCase() ) {
        cond = false;
       this.toastr.error('Category cannot be saved. Category matches another entry. Save any pending changes before attempting to save this entry.', 'Error!', {
         positionClass: 'toast-bottom-right',
         timeOut: 2000
       });
       return;
      }   
    });
  } 
    if(category || (subCategory && cond)){
      let paylaod = {      
        "category": category,
        "oldCategory": oldCat.toString(),
        "subCategory": subCategory,
        "oldSubCategory": oldSubCat.toString(),
        "username": this.userData.userName,
        "wsid": this.userData.wsid,
      }
      // console.log(paylaod);
      
      this.catService.saveCategory(paylaod).subscribe((res) => {
        if(res.isExecuted){
          this.getCategoryList();
        this.toastr.success(oldCat.toString()==''?labels.alert.success:labels.alert.update, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
      });
    }

  }

  dltCategory(category : any, subCategory : any , fromDb:any){

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      height: 'auto',
      width: '480px',
      autoFocus: '__non_existing_element__',
    })
    dialogRef.afterClosed().subscribe(result => {
     if(result === 'Yes'){
      if(category && subCategory && fromDb){
        let paylaod = {
          "category": category,
          "subCategory": subCategory,
          "username": this.userData.userName,
          "wsid": this.userData.wsid,
        }
       // this.category_list.pop(category);
        
        this.catService.dltCategory(paylaod).subscribe((res) => {
          if(res.isExecuted){
            this.getCategoryList();
            this.toastr.success(labels.alert.delete, 'Success!', {
              positionClass: 'toast-bottom-right',
              timeOut: 2000
            });
          }
        });
      } else {
        this.enableButton.shift();
        this.category_list.shift();
      }
     }
    })











    
  }

  selectCategory(selectedCat: any){
    if(selectedCat.category!='' && selectedCat.subCategory!='')
    {

      this.dialogRef.close(selectedCat);
    }
  }

  clearCategory(){
    this.dialogRef.close('');
  }

  public openPrintRangeDialog(){
    let dialogRef = this.dialog.open(PrintRangeComponent, {
      height: 'auto',
      width: '560px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      
    })
  }
}

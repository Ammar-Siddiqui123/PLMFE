import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrintRangeComponent } from '../print-range/print-range.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/common/services/category.service';
import { AuthService } from '../../../../app/init/auth.service';
import labels from '../../../labels/labels.json'

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {

  public category_list: any;
  public userData: any;

  constructor(private dialog: MatDialog,
              private catService: CategoryService,
              private authService: AuthService,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<any>) {}

  ngOnInit(): void {
    this.userData = this.authService.userData();
    this.getCategoryList();
  }

 getCategoryList(){
    this.catService.getCategory().subscribe((res) => {
      this.category_list = res.data;
     });
  }

  addCatRow(row : any){
    this.category_list.unshift({
      category : "",
      subCategory: ""
  });
  }

  saveCategory(category : any, oldCat : any, subCategory : any, oldSubCat : any) {
  
    let cond = true;
    if(category){
    this.category_list.forEach(element => {
      if(element.category?.toLowerCase() == category?.toLowerCase() && element.subCategory?.toLowerCase() == subCategory?.toLowerCase() ) {
        cond = false;
       this.toastr.error('Already Exists', 'Error!', {
         positionClass: 'toast-bottom-right',
         timeOut: 2000
       });
       return;
      }   
    });
  } 
    if(category && subCategory && cond){
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
        this.toastr.success(labels.alert.success, 'Success!', {
          positionClass: 'toast-bottom-right',
          timeOut: 2000
        });
      }
      });
    }

  }

  dltCategory(category : any, subCategory : any){
    if(category && subCategory){
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
    this.category_list.shift();
  }
  }

  selectCategory(selectedCat: any){
    this.dialogRef.close(selectedCat);
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
      console.log(result);
      
    })
  }
}

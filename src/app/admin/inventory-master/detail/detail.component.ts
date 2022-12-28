import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/init/auth.service';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { ItemCategoryComponent } from '../../dialogs/item-category/item-category.component';
import { ItemNumberComponent } from '../../dialogs/item-number/item-number.component';
import { UnitMeasureComponent } from '../../dialogs/unit-measure/unit-measure.component';
import { InventoryMasterService } from '../inventory-master.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() details: FormGroup;
  public userData: any;
  @ViewChild('quarantineAction') quarantineTemp: TemplateRef<any>;
  

  constructor(   
    private invMasterService: InventoryMasterService, 
    private authService: AuthService, 
    private dialog: MatDialog,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
    console.log(this.details)

  }


  public openItemNumDialog() {
    let dialogRef = this.dialog.open(ItemNumberComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        itemNumber: this.details.value.itemNumber,
        newItemNumber : '',
        addItem : false
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {
        let paylaod = {
          "oldItemNumber": this.details.value.itemNumber,
          "newItemNumber": result,
          "username": this.userData.userName,
          "wsid": this.userData.wsid
        }
        this.invMasterService.update(paylaod, '/Admin/UpdateItemNumber').subscribe((res: any) => {
          // console.log(res.data);
          if (res.isExecuted) {
            this.details.patchValue({
              'itemNumber' : res.data.newItemNumber
            }); 
          }          
        })
      }

    })
  }

  public opencategoryDialog() {
    let dialogRef = this.dialog.open(ItemCategoryComponent, {
      height: 'auto',
      width: '800px',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);

      this.details.patchValue({        
        'category': result.category,        
        'subCategory': result.subCategory,        
      });
      
    })
  }
  public openUmDialog() {
    let dialogRef = this.dialog.open(UnitMeasureComponent, {
      height: 'auto',
      width: '750px',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.details.patchValue({
        'unitOfMeasure' : result
      });

    })
  }



}

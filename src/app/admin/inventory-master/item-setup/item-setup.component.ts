import { Component, Input, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CellSizeComponent } from '../../dialogs/cell-size/cell-size.component';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { VelocityCodeComponent } from '../../dialogs/velocity-code/velocity-code.component';
@Component({
  selector: 'app-item-setup',
  templateUrl: './item-setup.component.html',
  styleUrls: ['./item-setup.component.scss']
})
export class ItemSetupComponent implements OnInit {


  @Input() itemSetup: FormGroup;
  public userData: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  public openCellSizeDialog(param) {
    let currentValue="";
    if(param == 'cellSize'){
      currentValue  = this.itemSetup.controls['cellSize'].value
    } else if(param == 'bulkCellSize'){
      currentValue  = this.itemSetup.controls['bulkCellSize'].value
    } else if(param == 'cfCellSize'){
      currentValue  = this.itemSetup.controls['cfCellSize'].value
    }
    let dialogRef = this.dialog.open(CellSizeComponent, {
      height: 'auto',
      width: '750px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
        cs:currentValue
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
      if(param == 'cellSize'){
        this.itemSetup.patchValue({
          'cellSize' : result
        });
      } else if(param == 'bulkCellSize'){
        this.itemSetup.patchValue({
          'bulkCellSize' : result
        });
      } else if(param == 'cfCellSize'){
        this.itemSetup.patchValue({
          'cfCellSize' : result
        });
      }
    }


    })
  }
  public openVelocityCodeDialog(param) {
    let currentValue="";
    if(param == 'goldenZone'){
      currentValue  = this.itemSetup.controls['goldenZone'].value
    } else if(param == 'bulkVelocity'){
      currentValue  = this.itemSetup.controls['bulkVelocity'].value
    } else if(param == 'cfVelocity'){
      currentValue  = this.itemSetup.controls['cfVelocity'].value
    }
    
    let dialogRef = this.dialog.open(VelocityCodeComponent, {
      height: 'auto',
      width: '750px',
      autoFocus: '__non_existing_element__',
      data: {
        mode: '',
        vc: currentValue
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      if(param == 'goldenZone'){
        this.itemSetup.patchValue({
          'goldenZone' : result
        });
      } else if(param == 'bulkVelocity'){
        this.itemSetup.patchValue({
          'bulkVelocity' : result
        });
      } else if(param == 'cfVelocity'){
        this.itemSetup.patchValue({
          'cfVelocity' : result
        });
      }

    }
    })

    
  }


  cellQuantityChange(){
    if(this.itemSetup.controls['maximumQuantity'].value < this.itemSetup.controls['minimumQuantity'].value){
      this.itemSetup.controls['minimumQuantity'].setValue(this.itemSetup.controls['maximumQuantity'].value);
    } else if(this.itemSetup.controls['bulkMaximumQuantity'].value < this.itemSetup.controls['bulkMinimumQuantity'].value){
      this.itemSetup.controls['bulkMinimumQuantity'].setValue(this.itemSetup.controls['bulkMaximumQuantity'].value)
    }  else    if(this.itemSetup.controls['cfMaximumQuantity'].value < this.itemSetup.controls['cfMinimumQuantity'].value){
      this.itemSetup.controls['cfMinimumQuantity'].setValue(this.itemSetup.controls['cfMaximumQuantity'].value)
    } 
  }


}

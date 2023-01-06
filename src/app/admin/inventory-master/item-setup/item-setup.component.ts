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


  public openCellSizeDialog() {
    let dialogRef = this.dialog.open(CellSizeComponent, {
      height: '500px',
      width: '750px',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }
  public openVelocityCodeDialog() {
    let dialogRef = this.dialog.open(VelocityCodeComponent, {
      height: '500px',
      width: '750px',
      data: {
        mode: '',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }

}

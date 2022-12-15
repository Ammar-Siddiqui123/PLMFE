import { Component, OnInit, TemplateRef, ViewChild,} from '@angular/core';
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

  constructor(private dialog: MatDialog) { }
  @ViewChild('quarantineAction') quarantineTemp: TemplateRef<any>;

  ngOnInit(): void {
  }

  quarantineDialog(): void {
    const dialogRef = this.dialog.open(this.quarantineTemp, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
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

  deleteItem($event) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}

import { Component, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
}

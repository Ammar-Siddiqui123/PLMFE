import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/init/auth.service';

@Component({
  selector: 'app-print-range',
  templateUrl: './print-range.component.html',
  styleUrls: ['./print-range.component.scss']
})
export class PrintRangeComponent implements OnInit {
  @ViewChild('begin_loc') begin_loc: ElementRef;
  userData:any;
  beginLoc:string = "";
  endLoc:string = "";
  groupLikeLoc:boolean = false;
  quantitySelected:number = 0;
  constructor(
    private route: Router,
    public dialogRef: MatDialogRef<any>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData();
  }
  
  ngAfterViewInit() {
    this.begin_loc.nativeElement.focus();
  }

  printRange(){
    this.dialogRef.close();
    this.route.navigateByUrl(`/report-view?file=FileName:printIMReport|invMapID:0|groupLikeLoc:${this.groupLikeLoc}|beginLoc:${this.beginLoc}|endLoc:${this.endLoc}|User:${this.userData.userName}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss']
})
export class PrintersComponent implements OnInit {
  sideBarOpen: boolean = true;

  running: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  displayedColumns: string[] = ['printerName', 'printerAddress', 'labelPrinter', 'actions'];
  toteTable: any[] = ['10', '10', '10', '10', '10', '10'];

  ServiceToggle(text: any) {
    if (text == "Start Print Service") {
      this.running = true;
      this.WaitForService();
      // config.server.startService().done(function (success) {
      this.ServiceStatus('start', true);
      // });
    }
    else {
      this.running = false;
      this.WaitForService();
      // config.server.stopService().done(function (success) {
      this.ServiceStatus('stop', true);
      // });
    }
  }

  RestartService(){
    this.WaitForService();
    // config.server.restartService().done(function (success) {
        this.ServiceStatus('restart', true);
    // });
  }

  ServiceStatus(changeType: any, success: any) {
    if (changeType == 'start' || changeType == 'restart') {
      if (success) {
        this.setOnline();
        // alert('Service ' + changeType + ' was successful.');
      } else {
        this.setOffline();
        // alert('Service ' + changeType + ' was unsuccessful.  Please try again or contact Scott Tech for support.');
      };
    } else {
      this.setOffline();
      if (success) {
        // alert('Service stop was successful.');
      } else {
        // alert('Service stop encountered an error.  Please try again or contact Scott Tech for support.');
      };
    };
  }

  WaitForService() {

  }

  setOnline() {

  }

  setOffline() {

  }

}


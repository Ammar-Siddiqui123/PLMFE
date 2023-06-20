import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-verification-defaults',
  templateUrl: './scan-verification-defaults.component.html',
  styleUrls: ['./scan-verification-defaults.component.scss']
})
export class ScanVerificationDefaultsComponent implements OnInit {
  displayedColumns: string[] = ['transType', 'scanSequence', 'field', 'verifyType', 'verifyStringStart','verifyStringLength','actions'];
  constructor() { }

  ngOnInit(): void {
  }

}

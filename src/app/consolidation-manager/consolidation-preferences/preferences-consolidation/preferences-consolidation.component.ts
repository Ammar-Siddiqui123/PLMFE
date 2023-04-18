import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preferences-consolidation',
  templateUrl: './preferences-consolidation.component.html',
  styleUrls: ['./preferences-consolidation.component.scss']
})
export class PreferencesConsolidationComponent implements OnInit {
  filtersForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}

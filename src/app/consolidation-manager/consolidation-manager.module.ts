import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsolidationManagerRoutingModule } from './consolidation-manager-routing.module';
import { ConsolidationManagerComponent } from './consolidation-manager.component';
import { GeneralModule } from '../gen-module';
import { MaterialModule } from '../material-module';
import { ConsolidationPreferencesComponent } from './consolidation-preferences/consolidation-preferences.component';


@NgModule({
  declarations: [
    ConsolidationManagerComponent,
    ConsolidationPreferencesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralModule,
    ConsolidationManagerRoutingModule
  ]
})
export class ConsolidationManagerModule { }

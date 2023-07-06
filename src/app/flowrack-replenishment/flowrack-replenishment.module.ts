import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowrackReplenishmentRoutingModule } from './flowrack-replenishment-routing.module';
import { FlowrackReplenishmentComponent } from './flowrack-replenishment.component';
import { FrPreferencesComponent } from './fr-preferences/fr-preferences.component';
import { MaterialModule } from '../material-module';
import { GeneralModule } from '../gen-module';
import { FrFlowrackReplenishmentComponent } from './fr-flowrack-replenishment/fr-flowrack-replenishment.component';


@NgModule({
  declarations: [
    FlowrackReplenishmentComponent,
    FrPreferencesComponent,
    FrFlowrackReplenishmentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralModule,
    FlowrackReplenishmentRoutingModule
  ]
})
export class FlowrackReplenishmentModule { }

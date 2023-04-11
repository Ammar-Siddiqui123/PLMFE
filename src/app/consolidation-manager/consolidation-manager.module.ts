import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsolidationManagerRoutingModule } from './consolidation-manager-routing.module';
import { ConsolidationManagerComponent } from './consolidation-manager.component';
import { GeneralModule } from '../gen-module';
import { MaterialModule } from '../material-module';


@NgModule({
  declarations: [
    ConsolidationManagerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralModule,
    ConsolidationManagerRoutingModule
  ]
})
export class ConsolidationManagerModule { }

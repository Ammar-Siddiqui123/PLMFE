import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InductionManagerRoutingModule } from './induction-manager-routing.module';
import { InductionManagerComponent } from './induction-manager.component';
import { MaterialModule } from '../material-module';
import { GeneralModule } from '../gen-module';
import { SuperBatchComponent } from './super-batch/super-batch.component';
import { RequiredDateStatusComponent } from '../dialogs/required-date-status/required-date-status.component';


@NgModule({
  declarations: [
    InductionManagerComponent,
    SuperBatchComponent,
    RequiredDateStatusComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GeneralModule,
    InductionManagerRoutingModule
  ]
})
export class InductionManagerModule { }

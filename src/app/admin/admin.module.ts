import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module'; 
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material-module';
import { GeneralModule } from '../gen-module';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    GeneralModule
  ]
})
export class AdminModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAndLabelRoutingModule } from './list-and-label-routing.module';
import { ListAndLabelComponent } from './list-and-label.component';
import { WrdComponent } from './wrd/wrd.component';
import { WrvComponent } from './wrv/wrv.component';
import { WrvFrontendComponent } from './wrv-frontend/wrv-frontend.component';
import { WrdFrontendComponent } from './wrd-frontend/wrd-frontend.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ListAndLabelComponent,
    WrdComponent,
    WrvComponent,
    WrvFrontendComponent,
    WrdFrontendComponent
  ],
  imports: [
    // BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    HttpClientModule,
    FormsModule,
    ListAndLabelRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ListAndLabelModule { }

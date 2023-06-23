import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrdComponent } from './wrd/wrd.component';
import { WrvComponent } from './wrv/wrv.component';
import { WrdFrontendComponent } from './wrd-frontend/wrd-frontend.component';
import { WrvFrontendComponent } from './wrv-frontend/wrv-frontend.component';
import { ListAndLabelComponent } from './list-and-label.component';

const routes: Routes = [
  { path: '', component: ListAndLabelComponent },
  { path: 'wrd', component: WrdComponent },
  { path: 'wrv', component: WrvComponent },
  { path: 'wrd-frontend', component: WrdFrontendComponent },
  { path: 'wrv-frontend', component: WrvFrontendComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAndLabelRoutingModule { }

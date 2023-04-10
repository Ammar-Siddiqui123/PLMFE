import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsolidationManagerComponent } from './consolidation-manager.component';

const routes: Routes = [{ path: '', component: ConsolidationManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolidationManagerRoutingModule { }

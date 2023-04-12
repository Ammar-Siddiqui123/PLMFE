import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { ConsolidationManagerComponent } from './consolidation-manager.component';
import { ConsolidationComponent } from './consolidation/consolidation.component';

const routes: Routes = [{ path: '', component: ConsolidationManagerComponent },
{
  path: 'Consolidation',
  component: ConsolidationComponent,
  canActivate: [AuthGuardGuard],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolidationManagerRoutingModule { }

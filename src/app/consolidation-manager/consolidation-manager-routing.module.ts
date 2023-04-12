import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsolidationManagerComponent } from './consolidation-manager.component';
import { ConsolidationPreferencesComponent } from './consolidation-preferences/consolidation-preferences.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';

const routes: Routes = [{ path: '', component: ConsolidationManagerComponent },
{ path: 'ConsolidationPreferences', component: ConsolidationPreferencesComponent, canActivate: [AuthGuardGuard], }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolidationManagerRoutingModule { }

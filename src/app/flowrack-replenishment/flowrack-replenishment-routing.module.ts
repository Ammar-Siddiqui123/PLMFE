import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrPreferencesComponent } from './fr-preferences/fr-preferences.component';
import { FlowrackReplenishmentComponent } from './flowrack-replenishment.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';

const routes: Routes = [{ path: '', component: FlowrackReplenishmentComponent },
{
  path: 'Preferences',
  component: FrPreferencesComponent,
  canActivate: [AuthGuardGuard],
},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowrackReplenishmentRoutingModule { }

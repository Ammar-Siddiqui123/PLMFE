import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderManagerComponent } from './order-manager.component';
import { EventLogComponent } from './event-log/event-log.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { OmPreferencesComponent } from './om-preferences/om-preferences.component';

const routes: Routes = [{ path: '', component: OrderManagerComponent },
{ path: 'EventLog', 
component: EventLogComponent, 
canActivate: [AuthGuardGuard],
},

{ path: 'OmPreferences', 
component: OmPreferencesComponent, 
canActivate: [AuthGuardGuard], 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagerRoutingModule { }

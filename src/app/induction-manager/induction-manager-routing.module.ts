import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { InductionManagerComponent } from './induction-manager.component';
import { SuperBatchComponent } from './super-batch/super-batch.component';

const routes: Routes = [
  { path: '', component: InductionManagerComponent },
  {
    path: 'SuperBatch',
    component: SuperBatchComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InductionManagerRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { AdminComponent } from './admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { InventoryMapComponent } from './inventory-map/inventory-map.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'inventoryMap',
    component: InventoryMapComponent,
    canActivate:[AuthGuardGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

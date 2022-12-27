import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { AdminComponent } from './admin.component';
import { BatchManagerComponent } from './batch-manager/batch-manager.component';
import { CCDiscrepanciesComponent } from './cycle-counts/ccdiscrepancies/ccdiscrepancies.component';
import { CreateTransactionComponent } from './cycle-counts/create-transaction/create-transaction.component';
import { CycleCountsComponent } from './cycle-counts/cycle-counts.component';
import { EmployeesComponent } from './employees/employees.component';
import { InventoryMapComponent } from './inventory-map/inventory-map.component';
import { InventoryMasterComponent } from './inventory-master/inventory-master.component';
import { LocationAssignmentComponent } from './location-assignment/location-assignment.component';

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
  {
    path: 'inventoryMaster',
    component: InventoryMasterComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'batchManager',
    component: BatchManagerComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'cycleCounts',
    component: CycleCountsComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'createCounts',
    component: CreateTransactionComponent,
    canActivate:[AuthGuardGuard]
    
  },
  {
    path: 'locationAssignment',
    component: LocationAssignmentComponent,
    canActivate:[AuthGuardGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

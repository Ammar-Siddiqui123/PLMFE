import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { AdminComponent } from './admin.component';
import { BatchManagerComponent } from './batch-manager/batch-manager.component';
import { CCDiscrepanciesComponent } from './cycle-counts/ccdiscrepancies/ccdiscrepancies.component';
import { CreateCountBatchesComponent } from './cycle-counts/create-count-batches/create-count-batches.component';
import { CreateTransactionComponent } from './cycle-counts/create-transaction/create-transaction.component';
import { CycleCountsComponent } from './cycle-counts/cycle-counts.component';
import { EmployeesComponent } from './employees/employees.component';
import { InventoryMapComponent } from './inventory-map/inventory-map.component';
import { InventoryMasterComponent } from './inventory-master/inventory-master.component';
import { LocationAssignmentComponent } from './location-assignment/location-assignment.component';
import { ManualTransactionsComponent } from './manual-transactions/manual-transactions.component';
import { SystemReplenishmentComponent } from './system-replenishment/system-replenishment.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ConfirmationGuard } from '../guard/confirmation-guard.guard';
import { MoveItemsComponent } from './move-items/move-items.component';
import { AdminPreferencesComponent } from './admin-preferences/admin-preferences.component';
import { EventLogComponent } from '../order-manager/event-log/event-log.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'EventLog',
    component: EventLogComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'inventoryMap',
    component: InventoryMapComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'inventoryMaster/:itemNumber',
    component: InventoryMasterComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'inventoryMaster',
    component: InventoryMasterComponent,
    canActivate: [AuthGuardGuard],
    canDeactivate: [ConfirmationGuard],
    data: {title: 'Inventory Master'}
  },
  {
    path: 'batchManager',
    component: BatchManagerComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'cycleCounts',
    component: CycleCountsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'createCountBatches',
    component: CreateCountBatchesComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'locationAssignment',
    component: LocationAssignmentComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'manualTransactions',
    component: ManualTransactionsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'moveItems',
    component: MoveItemsComponent,
    // canActivate: [AuthGuardGuard],
  },
  {
    path: 'systemReplenishment',
    component: SystemReplenishmentComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'adminPreferences',
    component: AdminPreferencesComponent,
    // canActivate: [AuthGuardGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

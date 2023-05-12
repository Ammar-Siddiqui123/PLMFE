import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { InductionManagerComponent } from './induction-manager.component';
import { ProcessPicksComponent } from './process-picks/process-picks.component';
import { ProcessPutAwaysComponent } from './process-put-aways/process-put-aways.component';
import { SuperBatchComponent } from './super-batch/super-batch.component';
import { AdminPrefrencesComponent } from './admin-prefrences/admin-prefrences.component';
import { ConfirmationGuard } from '../guard/confirmation-guard.guard';
import { TransactionComponent } from '../admin/transaction/transaction.component';
import { InventoryMapComponent } from '../admin/inventory-map/inventory-map.component';
import { InventoryMasterComponent } from '../admin/inventory-master/inventory-master.component';
import { ManualTransactionsComponent } from '../admin/manual-transactions/manual-transactions.component';
import { PalletReceivingComponent } from './pallet-receiving/pallet-receiving.component';
import { MarkEmptyReelsComponent } from './mark-empty-reels/mark-empty-reels.component';

const routes: Routes = [
  { path: '', component: InductionManagerComponent },
  {
    path: 'MarkEmptyReels',
    component: MarkEmptyReelsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'PalletReceiving',
    component: PalletReceivingComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'SuperBatch',
    component: SuperBatchComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'ProcessPutAways',
    component: ProcessPutAwaysComponent,
    canActivate: [AuthGuardGuard],
  },
  
  {
    path: 'ProcessPicks',
    component: ProcessPicksComponent,
    canActivate: [AuthGuardGuard],
    canDeactivate: [ConfirmationGuard]
  },
  {
    path: 'Admin/AdminPrefrences',
    component: AdminPrefrencesComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'Admin',
    component: AdminComponent,
    canActivate: [AuthGuardGuard],
    children:[
      // { 
      //   path: 'Transaction',
      //   loadChildren: () =>
      //     import('../admin/admin.module').then((m) => m.AdminModule),
      // },
      // { 
      //   path: 'TransactionJournal',
      //   component: TransactionComponent
      // },
      
    ]
  },

  {
    path: 'Admin/TransactionJournal',
    component: TransactionComponent,
    canActivate: [AuthGuardGuard]
  },
  
  {
    path: 'Admin/InventoryMap',
    component: InventoryMapComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'Admin/InventoryMaster',
    component: InventoryMasterComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'Admin/ManualTransactions',
    component: ManualTransactionsComponent,
    canActivate: [AuthGuardGuard]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InductionManagerRoutingModule { }

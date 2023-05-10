import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderManagerComponent } from './order-manager.component';
import { EventLogComponent } from './event-log/event-log.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { OmOrderManagerComponent } from './om-order-manager/om-order-manager.component';
import { OmPreferencesComponent } from './om-preferences/om-preferences.component';
import { OmCreateOrdersComponent } from '../dialogs/om-create-orders/om-create-orders.component';
import { TransactionComponent } from '../admin/transaction/transaction.component';
import { InventoryMasterComponent } from '../admin/inventory-master/inventory-master.component';
import { InventoryMapComponent } from '../admin/inventory-map/inventory-map.component';

const routes: Routes = [{ path: '', component: OrderManagerComponent },
{ path: 'EventLog', 
component: EventLogComponent, 
canActivate: [AuthGuardGuard],
},

{ path: 'OmPreferences', 
component: OmPreferencesComponent, 
canActivate: [AuthGuardGuard], 
},

{ path: 'OmCreateOrders', 
component: OmCreateOrdersComponent,
canActivate: [AuthGuardGuard],  },

{ path: 'OmOrderManager', 
component: OmOrderManagerComponent, 
canActivate: [AuthGuardGuard], 
},

{ path: 'OmOrderStatus', 
component: TransactionComponent,
canActivate: [AuthGuardGuard],  },

{ path: 'OmInventoryMaster', 
component: InventoryMasterComponent,
canActivate: [AuthGuardGuard],  },

{ path: 'OmInventoryMap', 
component: InventoryMapComponent,
canActivate: [AuthGuardGuard],  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagerRoutingModule { }

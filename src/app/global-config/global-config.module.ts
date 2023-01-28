import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalConfigComponent } from './global-config.component';
import { MaterialModule } from '../material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalConfigRoutingModule } from './global-config-routing.module';
import { GlobalDashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DatabaseConnectionsComponent } from './database-connections/database-connections.component';
import { PrintersComponent } from './printers/printers.component';
import { WorkstationComponent } from './workstation/workstation.component';
import { UserAccountComponent } from './dashboard/user-account/user-account.component';
import { ConnectedUsersComponent } from './dashboard/connected-users/connected-users.component';
import { ConfigDatabaseComponent } from './database-connections/config-database/config-database.component';
import { ConnectionStringsComponent } from './database-connections/connection-strings/connection-strings.component';
import { LicensingComponent } from './licensing/licensing.component';



@NgModule({
  declarations: [GlobalConfigComponent, GlobalDashboardComponent, DatabaseConnectionsComponent, PrintersComponent, WorkstationComponent, UserAccountComponent, ConnectedUsersComponent, ConfigDatabaseComponent, ConnectionStringsComponent, LicensingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    GlobalConfigRoutingModule,
    DashboardModule
  ]
})
export class GlobalConfigModule { }

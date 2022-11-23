import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module'; 
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material-module';
import { GeneralModule } from '../gen-module';
import { CdkTableModule} from '@angular/cdk/table';

//Employees Components
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesLookupComponent } from './employees/employees-lookup/employees-lookup.component';
import { EmployeePickupLevelComponent } from './employees/employee-pickup-level/employee-pickup-level.component';
import { GroupsAllowedComponent } from './employees/groups-allowed/groups-allowed.component';
import { GroupsLookupComponent } from './employees/groups-lookup/groups-lookup.component';
import { AssignedFunctionsComponent } from './employees/assigned-functions/assigned-functions.component';
import { UnassignedFunctionsComponent } from './employees/unassigned-functions/unassigned-functions.component';
import { StatisticsLookupComponent } from './employees/statistics-lookup/statistics-lookup.component';

//Dialogs
import { AddNewEmployeeComponent } from './dialogs/add-new-employee/add-new-employee.component';
import { AddZoneComponent } from './dialogs/add-zone/add-zone.component';
import { DeleteConfirmationComponent } from './dialogs/delete-confirmation/delete-confirmation.component';
import { AddLocationComponent } from './dialogs/add-location/add-location.component';
import { AddPickuplevelsComponent } from './dialogs/add-pickuplevels/add-pickuplevels.component';
import { AddGroupAllowedComponent } from './dialogs/add-group-allowed/add-group-allowed.component';
import { AddNewGroupComponent } from './dialogs/add-new-group/add-new-group.component';
import { FunctionAllocationComponent } from './dialogs/function-allocation/function-allocation.component';
import { InventoryMapComponent } from './inventory-map/inventory-map.component';
import { ChecksWithDragTableComponent } from '../components/checks-with-drag-table/checks-with-drag-table.component';
import { AddInvMapLocationComponent } from './dialogs/add-inv-map-location/add-inv-map-location.component';
import { WarehouseComponent } from './dialogs/warehouse/warehouse.component';
import { SetColumnSeqComponent } from './dialogs/set-column-seq/set-column-seq.component';


@NgModule({
  declarations: [
    AdminComponent,
    EmployeesComponent,
    EmployeesLookupComponent,
    EmployeePickupLevelComponent,
    GroupsAllowedComponent,
    GroupsLookupComponent,
    AssignedFunctionsComponent,
    UnassignedFunctionsComponent,
    StatisticsLookupComponent,
    AddNewEmployeeComponent,
    AddZoneComponent,
    DeleteConfirmationComponent,
    AddLocationComponent,
    AddPickuplevelsComponent,
    AddGroupAllowedComponent,
    AddNewGroupComponent,
    FunctionAllocationComponent,
    InventoryMapComponent,
    ChecksWithDragTableComponent,
    AddInvMapLocationComponent,
    WarehouseComponent,
    SetColumnSeqComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    GeneralModule,
    CdkTableModule
  ]
})
export class AdminModule { }

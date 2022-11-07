import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DataTablesModule } from "angular-datatables";
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { EmployeesLookupComponent } from './employees/employees-lookup/employees-lookup.component';
import { EmployeePickupLevelComponent } from './employees/employee-pickup-level/employee-pickup-level.component';
import { GroupsAllowedComponent } from './employees/groups-allowed/groups-allowed.component';
import { GroupsLookupComponent } from './employees/groups-lookup/groups-lookup.component';
import { AssignedFunctionsComponent } from './employees/assigned-functions/assigned-functions.component';
import { UnassignedFunctionsComponent } from './employees/unassigned-functions/unassigned-functions.component';
import { StatisticsLookupComponent } from './employees/statistics-lookup/statistics-lookup.component';
import { AddNewEmployeeComponent } from './dialogs/add-new-employee/add-new-employee.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideNavComponent,
    EmployeesComponent,
    MainComponent,
    EmployeesLookupComponent,
    EmployeePickupLevelComponent,
    GroupsAllowedComponent,
    GroupsLookupComponent,
    AssignedFunctionsComponent,
    UnassignedFunctionsComponent,
    StatisticsLookupComponent,
    AddNewEmployeeComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatRippleModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 0,
      extendedTimeOut: 0,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      }
    }),
    NgScrollbarModule


  ]
})
export class DashboardModule { }

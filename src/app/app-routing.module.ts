import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { EmployeesComponent } from './dashboard/employees/employees.component';
import { MainComponent } from './dashboard/main/main.component';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { GlobalDashboardComponent } from './global-config/dashboard/dashboard.component';
import { DatabaseConnectionsComponent } from './global-config/database-connections/database-connections.component';
import { PrintersComponent } from './global-config/printers/printers.component';
import { WorkstationComponent } from './global-config/workstation/workstation.component';
import { LicensingComponent } from './global-config/licensing/licensing.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'globalconfig',
    component: GlobalConfigComponent,
  },
  {
    path: 'globalconfig/dashboard',
    component: GlobalDashboardComponent,
    
  },
  {
    path: 'globalconfig/printers',
    component: PrintersComponent,
    
  },
  {
    path: 'globalconfig/workstation',
    component: WorkstationComponent,
    
  },
  {
    path: 'globalconfig/database-connections',
    component: DatabaseConnectionsComponent,
  },
  {
    path: 'globalconfig/licensing',
    component: LicensingComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: MainComponent,
        canActivate: [AuthGuardGuard],
      },
      // {
      //   path: 'globalconfig/dashboard',
      //   component: MainComponent,
      //   // canActivate:[AuthGuardGuard]
      // },

      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuardGuard],
      },
      { 
        path: 'InductionManager', 
        loadChildren: () => import('./induction-manager/induction-manager.module').then(m => m.InductionManagerModule),
        canActivate:[AuthGuardGuard]
      },

    ]

  },


  

  // {
  //   path:'dashboard',
  //   component:DashboardComponent,
  //   children: [
  //     // {
  //     //   path:''
  //     // },
  //     // {
  //     //   path:'all-employees',
  //     //   component:AllEmployeesComponentComponent
  //     // }

  //   ]
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

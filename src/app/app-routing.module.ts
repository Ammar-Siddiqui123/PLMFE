import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { EmployeesComponent } from './dashboard/employees/employees.component';
import { MainComponent } from './dashboard/main/main.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './login/login.component';
const routes: Routes = [

  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: MainComponent,
        canActivate:[AuthGuardGuard]
      },
      
      { 
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate:[AuthGuardGuard]
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
  exports: [RouterModule]
})
export class AppRoutingModule { }

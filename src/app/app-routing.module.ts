import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { MainComponent } from './dashboard/main/main.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [

  {
    path:'login',
    component:LoginComponent
  },

  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: MainComponent,
      },
      {
        path: 'all-employees',
        component: EmployeesComponent,
      }
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllEmployeesComponentComponent } from './employee/all-employees-component/all-employees.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'',
    component:LoginComponent
  }
  ,
  {
    path:'employee/all-employees',
    component:AllEmployeesComponentComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

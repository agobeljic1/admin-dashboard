import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsPageComponent } from './ui/pages/employee-details-page/employee-details-page.component';
import { EmployeesPageComponent } from './ui/pages/employees-page/employees-page.component';
import { HomePageComponent } from './ui/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './ui/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'employees', component: EmployeesPageComponent },
  { path: 'employees/:id', component: EmployeeDetailsPageComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

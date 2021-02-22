import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/components/login/login.component';
import { LoginGuard } from './account/guards/login.guard';
import { HomeComponent } from './dashboard/components/home/home.component';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { PageNotFoundComponent } from './shared/components/';

const routes: Routes = [
  {
    path: 'dashboard',
    canLoad: [LoginGuard],
    loadChildren: './dashboard/dashboard-routing.module#DashboardRoutingModule',
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    DashboardRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

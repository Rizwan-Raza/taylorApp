import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/components/login/login.component';
import { DashboardLoadGuard } from './account/guards/dashboard-load.guard';
import { LoginGuard } from './account/guards/login.guard';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { PageNotFoundComponent } from './shared/components/';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    canLoad: [DashboardLoadGuard],
    loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
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

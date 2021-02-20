import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
// import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './account/components/login/login.component';
import { NavbarComponent } from './core/navbar/navbar.component';
// import { HomeRoutingModule } from './home/home-routing.module';
// import { DetailRoutingModule } from './detail/detail-routing.module';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent
    // redirectTo: 'home',
    // pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    // HomeRoutingModule,
    // DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

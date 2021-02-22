import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '../account/guards/dashboard.guard';
import { HomeComponent } from './components/home/home.component';
import { MensComponent } from './components/mens/mens.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { WomensComponent } from './components/womens/womens.component';
import { DashboardComponent } from './dashboard.component';



const routes: Routes = [
  {
    path: '',
    canActivate: [DashboardGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: 'men',
        component: MensComponent
      },
      {
        path: 'women',
        component: WomensComponent
      },
      {
        path: 'view-all',
        component: ViewAllComponent
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '../account/guards/dashboard.guard';
import { AddMeasurementsComponent } from './components/add-measurements/add-measurements.component';
import { HomeComponent } from './components/home/home.component';
import { MensComponent } from './components/mens/mens.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
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
        path: 'add-measurements',
        component: AddMeasurementsComponent
      },
      {
        path: 'view-all',
        component: ViewAllComponent
      },
      {
        path: 'view-all/:filter',
        component: ViewAllComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
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

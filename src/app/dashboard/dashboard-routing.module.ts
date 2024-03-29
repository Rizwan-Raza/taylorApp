import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '../account/guards/dashboard.guard';
import { AddMeasurementsComponent } from './components/add-measurements/add-measurements.component';
import { HomeComponent } from './components/home/home.component';
import { RecordComponent } from './components/record/record.component';
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
        path: 'add-measurements',
        component: AddMeasurementsComponent
      },
      {
        path: 'add-measurements/:id',
        component: AddMeasurementsComponent,
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
      },
      {
        path: 'record/edited/:id',
        component: RecordComponent,
        data: {
          nopadding: true
        }
      },

    ]
  },
  {
    path: 'record/:id',
    component: RecordComponent,
  },
  {
    path: 'record',
    component: RecordComponent,
    pathMatch: 'full'
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

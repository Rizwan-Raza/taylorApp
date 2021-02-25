import { LayoutModule } from '@angular/cdk/layout';
import { CdkStepper } from '@angular/cdk/stepper';
import { CdkColumnDef } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AddMeasurementsComponent } from './components/add-measurements/add-measurements.component';
import { ChangeEmailComponent } from './components/dialogs/change-email/change-email.component';
import { ChangePasswordComponent } from './components/dialogs/change-password/change-password.component';
import { MoreInfoComponent } from './components/dialogs/more-info/more-info.component';
import { PleaseWaitComponent } from './components/dialogs/please-wait/please-wait.component';
import { HomeComponent } from './components/home/home.component';
import { MensComponent } from './components/mens/mens.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { DashboardComponent } from './dashboard.component';
import { PaidStatusPipe } from './pipes/paid-status.pipe';
import { MeasurementsService } from './services/measurements.service';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { RecordComponent } from './components/record/record.component';


@NgModule({
  declarations: [MensComponent, NavbarComponent, HomeComponent, DashboardComponent, ViewAllComponent, AddMeasurementsComponent, SettingsComponent, PaidStatusPipe, PleaseWaitComponent, MoreInfoComponent, ChangePasswordComponent, ChangeEmailComponent, YesNoPipe, RecordComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  providers: [
    MeasurementsService,
    CdkColumnDef,
    CdkStepper
  ]
})
export class DashboardModule { }

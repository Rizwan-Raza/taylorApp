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
import { MatExpansionModule } from '@angular/material/expansion';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AddMeasurementsComponent } from './components/add-measurements/add-measurements.component';
import { MoreInfoComponent } from './components/dialogs/more-info/more-info.component';
import { PleaseWaitComponent } from './components/dialogs/please-wait/please-wait.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecordComponent } from './components/record/record.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ViewAllComponent } from './components/view-all/view-all.component';
import { DashboardComponent } from './dashboard.component';
import { CheckUncheckPipe } from './pipes/check-uncheck.pipe';
import { GreenRedPipe } from './pipes/green-red.pipe';
import { IsPaidPipe } from './pipes/is-paid.pipe';
import { PaymentMethodPipe } from './pipes/payment-method.pipe';
import { PaymentStatusPipe } from './pipes/payment-status.pipe';
import { TailoringPipe } from './pipes/tailoring.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { MeasurementsService } from './services/measurements.service';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    ViewAllComponent,
    AddMeasurementsComponent,
    SettingsComponent,
    IsPaidPipe,
    PleaseWaitComponent,
    MoreInfoComponent,
    YesNoPipe,
    RecordComponent,
    PaymentStatusPipe,
    PaymentMethodPipe,
    CheckUncheckPipe,
    GreenRedPipe,
    TailoringPipe
  ],
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
    MatSlideToggleModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [
    MeasurementsService,
    CdkColumnDef,
    CdkStepper
  ]
})
export class DashboardModule { }

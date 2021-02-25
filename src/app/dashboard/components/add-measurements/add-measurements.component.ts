import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Billing } from '../../models/billing';
import { Customer } from '../../models/customer';
import { Measurements } from '../../models/measurements';
import { Record } from '../../models/record';
import { MeasurementsService } from '../../services/measurements.service';
import { PleaseWaitComponent } from '../dialogs/please-wait/please-wait.component';
@Component({
  selector: 'kt-add-measurements',
  templateUrl: './add-measurements.component.html',
  styleUrls: ['./add-measurements.component.scss'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
  ]
})
export class AddMeasurementsComponent {

  title: string = "Add Body Measurements";

  customerForm: FormGroup;
  measurementForm: FormGroup;
  billingForm: FormGroup;

  customerModel: Customer;
  measurementsModel: Measurements;
  billingModel: Billing;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, private _measurementsService: MeasurementsService, public dialog: MatDialog) { }

  cards = [
    { title: 'Neck', control: "neck", img: "assets/men/neck.svg" },
    { title: 'Chest', control: "chest", img: "assets/men/chest.svg" },
    { title: 'Waist', control: "waist", img: "assets/men/waist.svg" },
    { title: 'Seat (for Shirt)', control: "shirtSeat", img: "assets/men/hip.svg" },
    { title: 'Shirt Length', control: "shirtLength", img: "assets/men/shirtl.svg" },
    { title: 'Shoulder Width', control: "shoulderWidth", img: "assets/men/back.svg" },
    { title: 'Arm Length', control: "armLength", img: "assets/men/arm.svg" },
    { title: 'Wrist', control: "wrist", img: "assets/men/cuff.svg" },

    { title: 'Hip (for Pant)', control: "pantHip", img: "assets/men/pant_hip.svg" },
    { title: 'Seat (for Pant)', control: "pantSeat", img: "assets/men/pant_seat.svg" },
    { title: 'Inner Length', control: "inseam", img: "assets/men/innerlength_long.svg" },
    { title: 'Hip', control: "hip", img: "assets/men/realhip.svg" },
  ];

  ngOnInit() {

    this.customerForm = this._formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null],
      phoneNumber: [null, Validators.compose([
        Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      ],
      email: [null],
      address: [null],
      tailoring: [null]
    });

    this.measurementForm = this._formBuilder.group({
      neck: [null],
      chest: [null],
      waist: [null],
      shirtSeat: [null],
      shirtLength: [null],
      shoulderWidth: [null],
      armLength: [null],
      wrist: [null],

      pantHip: [null],
      pantSeat: [null],
      inseam: [null],
      hip: [null],

      other: [null]
    });

    this.billingForm = this._formBuilder.group({
      cost: [null, Validators.required],
      method: [null],
      status: [null],
      installment: [null]
    });
  }

  confirmReset() {
    return window.confirm("Are you sure want to reset the whole form?");
  }

  async onSubmit() {
    var dialog = this.openWaitDialog();
    this.customerModel = new Customer(this.customerForm.value);
    this.measurementsModel = new Measurements(this.measurementForm.value);
    this.billingModel = new Billing(this.billingForm.value);

    this._measurementsService.addNew(new Record(this.customerModel, this.measurementsModel, this.billingModel, Date.now())).then(_ => {
      dialog.close();
      alert("Record added successfully!");
      this.stepper.reset();
    }).catch(err => {
      dialog.close();
      alert("Something went wrong. Try again. \n\nError: " + err.message);
    });
  }

  openWaitDialog() {
    return this.dialog.open(PleaseWaitComponent, { disableClose: true, minWidth: 300, minHeight: 200 });
  }
}

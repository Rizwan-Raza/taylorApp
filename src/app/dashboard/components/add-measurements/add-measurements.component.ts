import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Billing } from '../../models/billing';
import { Customer } from '../../models/customer';
import { Measurements } from '../../models/measurements';
import { Record } from '../../models/record';
import { MeasurementsService } from '../../services/measurements.service';
import { MoreInfoComponent } from '../dialogs/more-info/more-info.component';
import { PleaseWaitComponent } from '../dialogs/please-wait/please-wait.component';

@Component({
  selector: 'kt-add-measurements',
  templateUrl: './add-measurements.component.html',
  styleUrls: ['./add-measurements.component.scss'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
  ]
})
export class AddMeasurementsComponent implements OnInit {

  title: string = "Add Body Measurements";
  record: Record;
  toUpdate: boolean = false;

  customerForm: FormGroup;
  measurementForm: FormGroup;
  billingForm: FormGroup;

  customerModel: Customer;
  measurementsModel: Measurements;
  billingModel: Billing;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, private _measurementsService: MeasurementsService, public dialog: MatDialog, private route: ActivatedRoute, private _router: Router) { }

  cards = [
    { title: 'Neck', control: "neck", img: "assets/men/neck.svg" },
    { title: 'Chest', control: "chest", img: "assets/men/chest.svg" },
    { title: 'Waist', control: "waist", img: "assets/men/waist.svg" },
    { title: 'Seat (for Shirt)', control: "shirtSeat", img: "assets/men/hip.svg" },
    { title: 'Shirt Length', control: "shirtLength", img: "assets/men/shirtl.svg" },
    { title: 'Shoulder Width', control: "shoulderWidth", img: "assets/men/back.svg" },
    { title: 'Arm Length', control: "armLength", img: "assets/men/arm.svg" },
    { title: 'Wrist', control: "wrist", img: "assets/men/cuff.svg" },

    { title: 'Hip (for Pant)', control: "pantsHip", img: "assets/men/pant_hip.svg" },
    { title: 'Seat (for Pant)', control: "pantsSeat", img: "assets/men/pant_seat.svg" },
    { title: 'Inner Length', control: "inseam", img: "assets/men/innerlength_long.svg" },
    { title: 'Hip', control: "hip", img: "assets/men/realhip.svg" },
  ];

  ngOnInit() {

    if (this.route.snapshot.params.id) {
      this.title = "Update";
      let id = this.route.snapshot.params.id;
      this.toUpdate = true;
      this._measurementsService.getById(id).subscribe(x => {
        this.record = x.data();
        this.formData(this.record);
      });
    } else {
      this.formData();
    }

  }

  confirmReset() {
    return window.confirm("Are you sure want to reset the whole form?");
  }

  async onSubmit() {
    var dialog = this.openWaitDialog();
    this.customerModel = this.customerForm.value;
    this.measurementsModel = this.measurementForm.value;
    this.billingModel = this.billingForm.value;

    let recordToAdd = new Record(
      this.customerModel,
      this.measurementsModel,
      this.billingModel,
      this.record ? this.record.date : Date.now(),
      this.record ? this.record.uid : (JSON.parse(localStorage.getItem("user")) as { uid: string, email: string }).uid
    );

    this._measurementsService.addNew(recordToAdd).then(_ => {
      dialog.close();
      alert("Record " + (this.toUpdate ? "updated" : "added") + " successfully!");
      this.stepper.reset();
      if (this.toUpdate) {
        this._router.navigate(['/record/' + recordToAdd.uid + recordToAdd.date]);
      }
      console.log(recordToAdd.uid + recordToAdd.date);
    }).catch(_ => {
      dialog.close();
      alert("Something went wrong. Try again.");
    });
  }

  openWaitDialog() {
    return this.dialog.open(PleaseWaitComponent, { disableClose: true, minWidth: 300, minHeight: 200 });
  }

  openInfoDialog() {
    return this.dialog.open(MoreInfoComponent, { minWidth: 400, minHeight: 300 });
  }


  formData(record?: Record) {
    this.customerForm = this._formBuilder.group({
      firstName: [record && record.customer.firstName, Validators.required],
      lastName: [record && record.customer.lastName],
      phoneNumber: [record && record.customer.phoneNumber, Validators.compose([
        Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      ],
      email: [record && record.customer.email],
      address: [record && record.customer.address],
      tailoring: [record && record.customer.tailoring, Validators.required]
    });

    this.measurementForm = this._formBuilder.group({
      neck: [record && record.measurement.neck],
      chest: [record && record.measurement.chest],
      waist: [record && record.measurement.waist],
      shirtSeat: [record && record.measurement.shirtSeat],
      shirtLength: [record && record.measurement.shirtLength],
      shoulderWidth: [record && record.measurement.shoulderWidth],
      armLength: [record && record.measurement.armLength],
      wrist: [record && record.measurement.wrist],

      pantsHip: [record && record.measurement.pantsHip],
      pantsSeat: [record && record.measurement.pantsSeat],
      inseam: [record && record.measurement.inseam],
      hip: [record && record.measurement.hip],

      other: [record && record.measurement.other]
    });

    this.billingForm = this._formBuilder.group({
      cost: [record && record.billing.cost, Validators.required],
      method: [record && record.billing.method],
      status: [record && record.billing.status],
      installment: [record && record.billing.installment]
    });

    if (this.toUpdate) {
      this.customerForm.controls['phoneNumber'].markAsDirty({ onlySelf: true });
      this.billingForm.controls['cost'].markAsDirty({ onlySelf: true });
      this.billingForm.controls['installment'].markAsDirty({ onlySelf: true });
    }
  }

  getCustomerFormError(): string {
    let fields: string[] = [];
    this.customerForm.controls['firstName']?.hasError('required') && fields.push("Name");
    this.customerForm.controls['phoneNumber']?.hasError('required') && fields.push("Phone");
    this.customerForm.controls['tailoring']?.hasError('required') && fields.push("Tailoring");
    return fields.length > 1 && (fields.slice(0, fields.length - 1).join(", ") + " and ") + fields.slice(-1) + (fields.length > 1 ? " are " : " is ") + "required";
  }


}

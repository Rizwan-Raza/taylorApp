import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  lateTitle: EventEmitter<string> = new EventEmitter<string>();

  customerForm: FormGroup;
  measurementForm: FormGroup;
  billingForm: FormGroup;

  customerModel: Customer;
  measurementsModel: Measurements;
  billingModel: Billing;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, private _measurementsService: MeasurementsService, public dialog: MatDialog, private route: ActivatedRoute, private _router: Router) { }

  cards = [
    {
      title: 'Neck',
      control: "neck",
      img: "assets/men/neck.svg",
      dImg: "assets/men/detailed/ts-men-neck.webp",
      desc: "The neck measurement is taken around the neck with the tape resting on your shoulders. You should put one finger between the tape and the neck if you want to allow for some extra room."
    },
    {
      title: 'Chest', control: "chest", img: "assets/men/chest.svg",
      dImg: "assets/men/detailed/ts-men-chest.webp",
      desc: "The chest measurement is taken as a circumference measurement around your chest at the widest point. Stand in a relaxed posture and breathe out."
    },
    {
      title: 'Waist', control: "waist", img: "assets/men/waist.svg",
      dImg: "assets/men/detailed/ts-men-waist.webp",
      desc: "The waist measurement is taken as a circumference measurement around your waist just above your belly button. Stand in a relaxed posture and breathe out."
    },
    {
      title: 'Seat (for Shirt)', control: "shirtSeat", img: "assets/men/hip.svg",
      dImg: "assets/men/detailed/ts-men-hip.webp",
      desc: "The seat measurement is taken as a circumference measurement around your seat at the widest part."
    },
    {
      title: 'Shirt length', control: "shirtLength", img: "assets/men/shirtl.svg",
      dImg: "assets/men/detailed/ts-men-shirtlength.webp",
      desc: "The shirt length measurement is taken from the top of the shoulder, close to the mid side of your neck, following your body down to the point where you want your shirt to end."
    },
    {
      title: 'Shoulder width', control: "shoulderWidth", img: "assets/men/back.svg",
      dImg: "assets/men/detailed/ts-men-back.webp",
      desc: "Think of a line going from your armpit straight upwards to your shoulder. Measure between those two points and hold the tape measure straight."
    },
    {
      title: 'Arm length', control: "armLength", img: "assets/men/arm.svg",
      dImg: "assets/men/detailed/ts-men-arm-length.webp",
      desc: "The sleeve length measurement is taken from the point of your shoulder (where you took the shoulder width measurement), following your bent arm down to where you want the sleeve to end. NOTE 1! Bend your arm slightly when taking this measurement. NOTE 2! This measurement is always the full length of the arm. For short sleeve and 3/4 sleeve you should still measure the full length of the arm."
    },
    {
      title: 'Wrist', control: "wrist", img: "assets/men/cuff.svg",
      dImg: "assets/men/detailed/ts-men-wrist.webp",
      desc: "The wrist measurement is taken as a circumference measurement around your wrist. NOTE ! We will add movement ease according to the cuff you select."
    },

    {
      title: 'Hip (for Pant)', control: "pantsHip", img: "assets/men/pant_hip.svg",
      dImg: "assets/men/detailed/ts-men-pants-hip.webp",
      desc: "The hip measurement is a circumferential measurement. NOTE! please measure directly on the body i.e. not outside of the garment or on top of a belt."
    },
    {
      title: 'Seat (for Pant)', control: "pantsSeat", img: "assets/men/pant_seat.svg",
      dImg: "assets/men/detailed/ts-men-pants-seat.webp",
      desc: "The seat measurement is a circumferential measurement taken around the seat at your widest point."
    },
    {
      title: 'Inner length', control: "inseam", img: "assets/men/innerlength_long.svg",
      dImg: "assets/men/detailed/ts-men-pants-inseam.webp",
      desc: "The inseam is measured from the crotch along the inner side of the leg straight down to the floor. Stand upright, do not bend the leg and ask someone to help you take the measurement."
    },
    {
      title: 'Actual hip', control: "hip", img: "assets/men/realhip.svg",
      dImg: "assets/men/detailed/ts-men-hip.webp",
      desc: "The hip measurement is taken as a circumference measurement around your hips at the widest part."
    },
  ];

  ngOnInit() {

    if (this.route.snapshot.params.id) {
      this.title = "Update Body Measurements";
      let id = this.route.snapshot.params.id;
      this.toUpdate = true;
      this.lateTitle.emit(this.title);
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
      this.customerForm.reset();
      this.billingForm.reset();
      this.stepper.selected.interacted = false;
      if (this.toUpdate) {
        this._router.navigate(['/record/edited/' + recordToAdd.uid + recordToAdd.date]);
      }
    }).catch(_ => {
      dialog.close();
      alert("Something went wrong. Try again.");
    });
  }

  openWaitDialog() {
    return this.dialog.open(PleaseWaitComponent, { disableClose: true, minWidth: 300, minHeight: 200 });
  }

  openInfoDialog(title: string, img: string,
    desc: string) {
    return this.dialog.open(MoreInfoComponent, {
      minWidth: 400,
      maxWidth: 720,
      minHeight: 300,
      data: {
        title: title,
        image: img,
        desc: desc
      }
    });
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
      this.billingForm.controls['status'].value == "install" && this.billingForm.controls['installment'].markAsDirty({ onlySelf: true });
    }
  }

  getCustomerFormError(): string {
    let fields: string[] = [];
    this.customerForm.controls['firstName']?.hasError('required') && fields.push("Name");
    this.customerForm.controls['phoneNumber']?.hasError('required') && fields.push("Phone");
    this.customerForm.controls['tailoring']?.hasError('required') && fields.push("Tailoring");
    return fields.length > 1 && (fields.slice(0, fields.length - 1).join(", ") + " and ") + fields.slice(-1) + (fields.length > 1 ? " are " : " is ") + "required";
  }

  checkCompleted(target: MatStep): boolean {
    return this.toUpdate ?
      true : (target.interacted && !target.hasError);
  }
}

import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatStep, MatStepper } from '@angular/material/stepper';
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
  styleUrls: ['./add-measurements.component.scss']
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

  tailorSelector: string = "";

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private _formBuilder: FormBuilder, private _measurementsService: MeasurementsService, public dialog: MatDialog, private route: ActivatedRoute, private _router: Router) { }

  customCards = {
    "neck": {
      title: 'Neck (गला)',
      control: "neck",
      img: "assets/men/neck.svg",
      dImg: "assets/men/detailed/ts-men-neck.webp",
      desc: "The neck measurement is taken around the neck with the tape resting on your shoulders. You should put one finger between the tape and the neck if you want to allow for some extra room."
    },
    "chest": {
      title: 'Chest (सीना)', control: "chest", img: "assets/men/chest.svg",
      dImg: "assets/men/detailed/ts-men-chest.webp",
      desc: "The chest measurement is taken as a circumference measurement around your chest at the widest point. Stand in a relaxed posture and breathe out."
    },
    "waist": {
      title: 'Waist (कमर)', control: "waist", img: "assets/men/waist.svg",
      dImg: "assets/men/detailed/ts-men-waist.webp",
      desc: "The waist measurement is taken as a circumference measurement around your waist just above your belly button. Stand in a relaxed posture and breathe out."
    },
    "shirtSeat": {
      title: 'Seat (for Shirt, सामना)', control: "shirtSeat", img: "assets/men/hip.svg",
      dImg: "assets/men/detailed/ts-men-hip.webp",
      desc: "The seat measurement is taken as a circumference measurement around your seat at the widest part."
    },
    "shirtLength": {
      title: 'Shirt length (लम्बाई)', control: "shirtLength", img: "assets/men/shirtl.svg",
      dImg: "assets/men/detailed/ts-men-shirtlength.webp",
      desc: "The shirt length measurement is taken from the top of the shoulder, close to the mid side of your neck, following your body down to the point where you want your shirt to end."
    },
    "shoulderWidth": {
      title: 'Shoulder width (कन्धा)', control: "shoulderWidth", img: "assets/men/back.svg",
      dImg: "assets/men/detailed/ts-men-back.webp",
      desc: "Think of a line going from your armpit straight upwards to your shoulder. Measure between those two points and hold the tape measure straight."
    },
    "armLength": {
      title: 'Arm length (आस्तीन)', control: "armLength", img: "assets/men/arm.svg",
      dImg: "assets/men/detailed/ts-men-arm-length.webp",
      desc: "The sleeve length measurement is taken from the point of your shoulder (where you took the shoulder width measurement), following your bent arm down to where you want the sleeve to end. NOTE 1! Bend your arm slightly when taking this measurement. NOTE 2! This measurement is always the full length of the arm. For short sleeve and 3/4 sleeve you should still measure the full length of the arm."
    },
    "wrist": {
      title: 'Wrist (कलाई)', control: "wrist", img: "assets/men/cuff.svg",
      dImg: "assets/men/detailed/ts-men-wrist.webp",
      desc: "The wrist measurement is taken as a circumference measurement around your wrist. NOTE ! We will add movement ease according to the cuff you select."
    },
    "pantsHip": {
      title: 'Hip (for Pant, कूल्हे)', control: "pantsHip", img: "assets/men/pant_hip.svg",
      dImg: "assets/men/detailed/ts-men-pants-hip.webp",
      desc: "The hip measurement is a circumferential measurement. NOTE! please measure directly on the body i.e. not outside of the garment or on top of a belt."
    },
    "pantsSeat": {
      title: 'Seat (for Pant, सामना)', control: "pantsSeat", img: "assets/men/pant_seat.svg",
      dImg: "assets/men/detailed/ts-men-pants-seat.webp",
      desc: "The seat measurement is a circumferential measurement taken around the seat at your widest point."
    },
    "inseam": {
      title: 'Inner length (लंबाई)', control: "inseam", img: "assets/men/innerlength_long.svg",
      dImg: "assets/men/detailed/ts-men-pants-inseam.webp",
      desc: "The inseam is measured from the crotch along the inner side of the leg straight down to the floor. Stand upright, do not bend the leg and ask someone to help you take the measurement."
    },
    "hip": {
      title: 'Actual hip (कूल्हे)', control: "hip", img: "assets/men/realhip.svg",
      dImg: "assets/men/detailed/ts-men-hip.webp",
      desc: "The hip measurement is taken as a circumference measurement around your hips at the widest part."
    },
    "back": {
      title: 'Back (बैक)', control: "back", img: "assets/men/back.svg",
    },
    "outerLength": {
      title: 'Outer Length (लंबाई)', control: "outerLength", img: "assets/men/outerlength.svg",
    },
    "crotch": {
      title: 'Crotch (गेदरी/आसन)', control: "crotch", img: "assets/men/blackless.svg",
    },
    "thigh": {
      title: 'Thigh (जांघ)', control: "thigh", img: "assets/men/thigh.svg",
    },
    "pantsCuff": {
      title: 'Pant Cuff (मोहरी)', control: "pantsCuff", img: "assets/men/pant_cuff.svg",
    },
  };

  cards = [];
  private _shirtCards = [
    this.customCards.shirtLength, // 1
    this.customCards.chest, // 2
    this.customCards.shoulderWidth, // 3
    this.customCards.armLength, // 4
    this.customCards.wrist, // 5
    this.customCards.neck,  // 6
    this.customCards.shirtSeat, // 7
  ];
  private _pantCards = [
    this.customCards.outerLength, // 1
    this.customCards.waist, // 2 
    this.customCards.pantsHip, // 3
    this.customCards.crotch, // 4
    this.customCards.pantsCuff, // 5
    this.customCards.thigh, // 6
    this.customCards.pantsSeat, // 7
    this.customCards.back, // 8
  ];

  private _coatCards = [
    this.customCards.shirtLength, // 1
    this.customCards.chest, // 2
    this.customCards.hip, // 3 
    this.customCards.shoulderWidth, // 4 
    this.customCards.armLength, // 5
    this.customCards.back, // 6
    this.customCards.wrist, // 7
  ];

  private _jacketCards = [
    this.customCards.shirtLength, // 1
    this.customCards.chest, // 2
    this.customCards.waist, // 3
    this.customCards.hip, // 4
    this.customCards.shoulderWidth, // 5
    this.customCards.neck, // 6
  ];

  private _kurtaCards = [
    this.customCards.shirtLength, // 1
    this.customCards.chest, // 2
    this.customCards.waist, // 3
    this.customCards.hip, // 4
    this.customCards.shoulderWidth, // 5
    this.customCards.armLength, // 6
    this.customCards.neck, // 7
  ];

  private _pajamaCards = [
    this.customCards.outerLength, // 1
    this.customCards.waist, // 2
    this.customCards.pantsCuff, // 3
  ];

  private _customCards = [
    this.customCards.shirtLength, // 1
    this.customCards.chest, // 2
    this.customCards.waist, // 3
    this.customCards.shirtSeat, // 4
    this.customCards.shoulderWidth, // 5
    this.customCards.armLength, // 6
    this.customCards.wrist, // 7
    this.customCards.neck, // 8
    this.customCards.hip, // 9
    this.customCards.back, // 10
    this.customCards.pantsSeat, // 11
    this.customCards.inseam, // 12
    this.customCards.outerLength, // 13
    this.customCards.pantsHip, // 14
    this.customCards.crotch, // 15
    this.customCards.thigh, // 16
    this.customCards.pantsCuff, // 17
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
      this.measurementForm.reset();
      this.billingForm.reset();

      this.customerForm.controls['firstName'].setErrors(null);
      this.customerForm.controls['phoneNumber'].setErrors(null);
      this.customerForm.controls['tailoring'].setErrors(null);
      this.customerForm.controls['custom'].setErrors(null);

      this.billingForm.controls['cost'].setErrors(null);
      this.billingForm.controls['method'].setValue("cash");
      this.billingForm.controls['status'].setValue("pod");
      this.billingForm.controls['installment'].setValue("0");

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
      tailoring: [record && record.customer.tailoring, Validators.required],
      custom: [record && record.customer.custom]
    });

    this.measurementForm = this._formBuilder.group({
      neck: [record && record.measurement.neck, Validators.pattern(/[0-9 /\\]*/)],
      chest: [record && record.measurement.chest, Validators.pattern(/[0-9 /\\]*/)],
      waist: [record && record.measurement.waist, Validators.pattern(/[0-9 /\\]*/)],
      shirtSeat: [record && record.measurement.shirtSeat, Validators.pattern(/[0-9 /\\]*/)],
      shirtLength: [record && record.measurement.shirtLength, Validators.pattern(/[0-9 /\\]*/)],
      shoulderWidth: [record && record.measurement.shoulderWidth, Validators.pattern(/[0-9 /\\]*/)],
      armLength: [record && record.measurement.armLength, Validators.pattern(/[0-9 /\\]*/)],
      wrist: [record && record.measurement.wrist, Validators.pattern(/[0-9 /\\]*/)],

      pantsHip: [record && record.measurement.pantsHip, Validators.pattern(/[0-9 /\\]*/)],
      pantsSeat: [record && record.measurement.pantsSeat, Validators.pattern(/[0-9 /\\]*/)],
      inseam: [record && record.measurement.inseam, Validators.pattern(/[0-9 /\\]*/)],
      hip: [record && record.measurement.hip, Validators.pattern(/[0-9 /\\]*/)],

      back: [record && record.measurement.back, Validators.pattern(/[0-9 /\\]*/)],
      outerLength: [record && record.measurement.outerLength, Validators.pattern(/[0-9 /\\]*/)],
      crotch: [record && record.measurement.crotch, Validators.pattern(/[0-9 /\\]*/)],
      thigh: [record && record.measurement.thigh, Validators.pattern(/[0-9 /\\]*/)],
      pantsCuff: [record && record.measurement.pantsCuff, Validators.pattern(/[0-9 /\\]*/)],

      other: [record && record.measurement.other]
    });

    this.billingForm = this._formBuilder.group({
      cost: [record && record.billing.cost, Validators.required],
      method: [record ? record.billing.method : 'cash'],
      status: [record ? record.billing.status : 'pod'],
      installment: [record ? record.billing.installment : '0', Validators.required]
    });

    if (this.toUpdate) {
      this.customerForm.controls['phoneNumber'].markAsDirty({ onlySelf: true });
      this.billingForm.controls['cost'].markAsDirty({ onlySelf: true });
      this.billingForm.controls['status'].value == "install" && this.billingForm.controls['installment'].markAsDirty({ onlySelf: true });
      this.tailorSelectorEvent({ value: record.customer.tailoring } as MatSelectChange);
    }
  }

  checkCompleted(target: MatStep): boolean {
    return this.toUpdate ?
      true : (target.interacted && !target.hasError);
  }

  tailorSelectorEvent(e: MatSelectChange) {
    e?.source?.close();
    this.customerForm.controls['custom'].setValidators([]);
    let v: String = e.value;
    if (v.startsWith("shirt")) {
      this.cards = this._shirtCards;
    } else if (v.startsWith("pant")) {
      this.cards = this._pantCards;
    } else if (v.startsWith("coat")) {
      this.cards = this._coatCards;
    } else if (v.startsWith("jacket")) {
      this.cards = this._jacketCards;
    } else if (v.startsWith("kurta")) {
      this.cards = this._kurtaCards;
    } else if (v.startsWith("pajama")) {
      this.cards = this._pajamaCards;
    } else {
      this.cards = this._customCards;
      this.customerForm.controls['custom'].setValidators([Validators.required]);
    }
    switch (e.value) {
      case "shirt-0":
        this.tailorSelector = "Shirt";
        break;
      case "shirt-1":
        this.tailorSelector = "Open Shirt";
        break;
      case "shirt-2":
        this.tailorSelector = "Bushirt";
        break;
      case "pant-0":
        this.tailorSelector = "Pant";
        break;
      case "pant-1":
        this.tailorSelector = "Long Belt Pant";
        break;
      case "pant-2":
        this.tailorSelector = "Wide Leg Pant";
        break;
      case "pant-3":
        this.tailorSelector = "Trouser";
        break;
      case "pant-4":
        this.tailorSelector = "Jeans";
        break;
      case "coat-0":
        this.tailorSelector = "Coat";
        break;
      case "coat-1":
        this.tailorSelector = "Coat 2 Button";
        break;
      case "coat-2":
        this.tailorSelector = "Waistcoat";
        break;
      case "coat-3":
        this.tailorSelector = "Jodhpuri Coat";
        break;
      case "coat-4":
        this.tailorSelector = "V Neck Coat";
        break;
      case "jacket-0":
        this.tailorSelector = "Jacket";
        break;
      case "jacket-1":
        this.tailorSelector = "Basket Jacket";
        break;
      case "jacket-2":
        this.tailorSelector = "V Neck Jacket";
        break;
      case "jacket-3":
        this.tailorSelector = "Double Breasted Jacket";
        break;
      case "kurta-0":
        this.tailorSelector = "Kurta/Kurti";
        break;
      case "kurta-1":
        this.tailorSelector = "Pathani Kurta";
        break;
      case "pajama-0":
        this.tailorSelector = "Pajama";
        break;
      case "pajama-1":
        this.tailorSelector = "Chudidaar Pajama";
        break;
      case "pajama-2":
        this.tailorSelector = "Pocket Pajama";
        break;
      case "pajama-3":
        this.tailorSelector = "Shalwaar";
        break;
      case "custom":
      default:
        this.tailorSelector = "Custom";
    }
  }
}

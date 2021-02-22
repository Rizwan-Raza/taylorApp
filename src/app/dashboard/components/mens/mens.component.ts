import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { MenModel } from '../../model/men-model';

@Component({
  selector: 'kt-mens',
  templateUrl: './mens.component.html',
  styleUrls: ['./mens.component.scss']
})
export class MensComponent implements OnInit {

  menMeasurementForm : FormGroup;
  menModel : MenModel = new MenModel();

  constructor( private angularStore : AngularFirestore, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.menMeasurementForm = this.formBuilder.group({
      neck: ["", Validators.required],
      chest: ["", Validators.required],
      waist: ["", Validators.required],
      seat: ["", Validators.required],
      shirtLength: ["", Validators.required],
      shoulderWidth: ["", Validators.required],
      armLength: ["", Validators.required],
      wrist: ["", Validators.required],
      hipMeasurement: ["", Validators.required],
      seatMeasurement: ["", Validators.required],
      inseam: ["", Validators.required],
      hip: ["", Validators.required],
    });    
  }

  public submit(){
    const date = Date();
    this.menModel.date = date;
    this.menModel.neck = this.menMeasurementForm.value.neck;
    this.menModel.chest = this.menMeasurementForm.value.chest;
    this.menModel.waist = this.menMeasurementForm.value.waist;
    this.menModel.seat = this.menMeasurementForm.value.seat;
    this.menModel.shirtLength = this.menMeasurementForm.value.shirtLength;
    this.menModel.shoulderWidth = this.menMeasurementForm.value.shoulderWidth;
    this.menModel.armLength = this.menMeasurementForm.value.armLength;
    this.menModel.wrist = this.menMeasurementForm.value.wrist;
    this.menModel.hipMeasurement = this.menMeasurementForm.value.hipMeasurement;
    this.menModel.seatMeasurement = this.menMeasurementForm.value.seatMeasurement;
    this.menModel.inseam = this.menMeasurementForm.value.inseam;
    this.menModel.hip = this.menMeasurementForm.value.hip;

    this.angularStore.collection("men").doc(date).set({...this.menModel});
    window.alert("added");
  }
}


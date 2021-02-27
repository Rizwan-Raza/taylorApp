import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Record } from '../../models/record';
import { MeasurementsService } from '../../services/measurements.service';

@Component({
  selector: 'kt-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  title: string = "Customer Tailoring Record";
  recordId: string;

  record: Record;

  constructor(private _measurementService: MeasurementsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recordId = this.route.snapshot.params.id;
    this._measurementService.getById(this.recordId).subscribe(x => {
      this.record = x.data();
      console.log(this.record);
    });
  }

}

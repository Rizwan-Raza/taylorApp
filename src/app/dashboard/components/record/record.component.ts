import { Component, OnInit } from '@angular/core';
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
    console.log(this.recordId);
    console.log(this._measurementService.records);
    // console.log(this._measurementService.records?.filter(x => (x.uid + x.date) == this.recordId));
    this.route.data.subscribe((data: Record) => {
      console.log(data);
      if (data == null) {
        // fetch from service
      } else {
        this.record = data;
      }
    });
  }

}

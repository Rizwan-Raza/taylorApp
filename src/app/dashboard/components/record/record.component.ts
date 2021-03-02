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

  currentDate: Date = new Date();
  nopadding: boolean = false;

  record: Record;

  constructor(private _measurementService: MeasurementsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(location.hash);
    this.recordId = this.route.snapshot.params.id;
    this._measurementService.getById(this.recordId).subscribe(x => {
      this.record = x.data();
    });
    this.route.data.subscribe(x => x && (this.nopadding = x.nopadding));
  }

  onPrint() {
    if (localStorage.getItem("theme") == "dark") {
      if (confirm("Printing won't work with Dark theme, want to switch Light Theme?")) {
        document.body.classList.toggle("kt-dark-theme");
        localStorage.setItem("theme", "light");
      } else {
        return;
      }
    }
    // document.getElementsByClassName("prt-sc")[0].classList.add("printing");
    print();
  }
}

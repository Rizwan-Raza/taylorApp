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
  mi: number = 0;

  record: Record;

  constructor(private _measurementService: MeasurementsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(location.hash);
    this.mi = 0;
    this.recordId = this.route.snapshot.params.id;
    this._measurementService.getById(this.recordId).subscribe(x => {
      this.record = x.data();
    });
    this.route.data.subscribe(x => x && (this.nopadding = x.nopadding));

    window.onafterprint = function () {
      document.getElementsByClassName("prt-sc")[0].classList.remove("printing-4-customer");
      document.getElementsByClassName("prt-sc")[0].classList.remove("printing-4-tailor");
      document.getElementsByClassName("prt-sc")[0].classList.remove("printing-both");
    }
  }

  onPrint(type: number) {
    if (localStorage.getItem("theme") == "dark") {
      if (confirm("Printing won't work with Dark theme, want to switch Light Theme?")) {
        document.body.classList.toggle("kt-dark-theme");
        localStorage.setItem("theme", "light");
      } else {
        return;
      }
    }
    // document.getElementsByClassName("prt-sc")[0].classList.add("printing");
    switch (type) {
      case 0:
        document.getElementsByClassName("prt-sc")[0].classList.add("printing-both");
        break;
      case 1:
        document.getElementsByClassName("prt-sc")[0].classList.add("printing-4-customer");
        break;
      case 2:
        document.getElementsByClassName("prt-sc")[0].classList.add("printing-4-tailor");
        break;
      default:
    }
    print();
  }

  get increment(): boolean {
    this.mi++;
    return true;
  }

  get setZero() :boolean {
    this.mi = 0;
    return true;
  }

}

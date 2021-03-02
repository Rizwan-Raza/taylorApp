import { Component, OnInit } from '@angular/core';
import { Record } from '../../models/record';
import { MeasurementsService } from '../../services/measurements.service';

@Component({
  selector: 'kt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string = "Dashboard";
  areYouReady_IfYouReady_WholeSquadReady: boolean = false;

  unpaid_inc: number = 0;
  unpaid_com: number = 0;
  paid_inc: number = 0;
  paid_com: number = 0;
  total: number = 0;

  cards = [
    { title: 'Paid Pending Works', link: '/view-all/:paid:incomplete', value: this.paid_inc },
    { title: 'Pending Payments', link: '/view-all/:unpaid:completed', value: this.unpaid_com },
    { title: 'Unpaid Pending Works', link: '/view-all/:unpaid:incomplete', value: this.unpaid_inc },
    { title: 'Paid and Delivered', link: '/view-all/:paid:completed', value: this.paid_com },
    { title: 'Total Records', link: '/view-all', value: this.total }
  ];
  constructor(private _measurementsService: MeasurementsService) { }

  ngOnInit() {
    this._measurementsService.getAll().subscribe(data => {
      if (this.areYouReady_IfYouReady_WholeSquadReady)
        return;
      else
        this.areYouReady_IfYouReady_WholeSquadReady = true;
      data.forEach(x => {
        let r = x.payload.doc.data() as Record;
        this.total++;
        if (r.billing.status == 'paid') {
          if (r.completed) {
            this.paid_com++;
          } else {
            this.paid_inc++;
          }
        } else {
          if (r.completed) {
            this.unpaid_com++;
          } else {
            this.unpaid_inc++;
          }
        }
      });

      // Here we go again!
      this.cards[0].value = this.paid_inc;
      this.cards[1].value = this.unpaid_com;
      this.cards[2].value = this.unpaid_inc;
      this.cards[3].value = this.paid_com;
      this.cards[4].value = this.total;
    });

  }
}

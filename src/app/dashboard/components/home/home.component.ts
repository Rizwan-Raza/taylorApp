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

  shirt: number = 0;
  pant: number = 0;
  coat: number = 0;
  jacket: number = 0;
  kurta: number = 0;
  shirt_pant: number = 0;
  custom: number = 0;

  cards = [
    { title: 'Paid Pending Works', link: '/view-all/::paid::incomplete', value: this.paid_inc },
    { title: 'Pending Payments', link: '/view-all/::unpaid::completed', value: this.unpaid_com },
    { title: 'Unpaid Pending Works', link: '/view-all/::unpaid::incomplete', value: this.unpaid_inc },
    { title: 'Paid and Delivered', link: '/view-all/::paid::completed', value: this.paid_com },
    { title: 'Shirts', link: '/view-all/::shirt', value: this.shirt },
    { title: 'Pants', link: '/view-all/::pant', value: this.pant },
    { title: 'Coats', link: '/view-all/::coat', value: this.coat },
    { title: 'Basket Jackets', link: '/view-all/::jacket', value: this.jacket },
    { title: 'Kurta / Kurti', link: '/view-all/::kurta', value: this.kurta },
    { title: 'Shirts + Pants', link: '/view-all/::shirt_pant', value: this.shirt_pant },
    { title: 'Customs', link: '/view-all/::custom', value: this.custom },
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
        switch (r.customer.tailoring) {
          case "shirt":
            this.shirt++;
            break;
          case "pant":
            this.pant++;
            break;
          case "coat":
            this.coat++;
            break;
          case "jacket":
            this.jacket++;
            break;
          case "kurta":
            this.kurta++;
            break;
          case "shirt_pant":
            this.shirt_pant++;
            break;
          case "custom":
          default:
            this.custom++;
            break;
        }
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

      this.cards[4].value = this.shirt;
      this.cards[5].value = this.pant;
      this.cards[6].value = this.coat;
      this.cards[7].value = this.jacket;
      this.cards[8].value = this.kurta;
      this.cards[9].value = this.shirt_pant;
      this.cards[10].value = this.custom;

      this.cards[11].value = this.total;
    });

  }
}

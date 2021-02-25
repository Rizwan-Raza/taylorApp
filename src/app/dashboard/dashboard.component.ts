import { Component } from '@angular/core';

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  title: string = "Dashboard";

  constructor() { }

  getInitials(componentReference) {
    this.title = componentReference.title;
  }

}

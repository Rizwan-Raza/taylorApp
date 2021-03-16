import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kt-please-wait',
  templateUrl: './please-wait.component.html',
  styleUrls: ['./please-wait.component.scss']
})
export class PleaseWaitComponent implements OnInit {

  @Input('notitle') notitle = false;

  constructor() { }

  ngOnInit(): void {
  }

}

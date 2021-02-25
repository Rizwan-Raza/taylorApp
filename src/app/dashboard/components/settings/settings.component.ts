import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'kt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  title: string = "Settings";
  @ViewChild('sliderToggle') sliderToggle: MatSlideToggle;

  darkToggle: boolean = localStorage.getItem('theme') == 'dark';

  constructor() { }

  ngOnInit(): void {
  }
  slider(cl) {
    cl.contains("mat-list-item-content") ? this.sliderToggle.toggle() : cl.length == 0 && this.sliderToggle.toggle();
    document.body.classList.toggle("kt-dark-theme") ?
      localStorage.setItem("theme", "dark") :
      localStorage.setItem("theme", "light");
  }
}

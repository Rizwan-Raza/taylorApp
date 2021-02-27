import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { UpdateEmailComponent } from '../../../account/components/update-email/update-email.component';
import { UpdatePasswordComponent } from '../../../account/components/update-password/update-password.component';


@Component({
  selector: 'kt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  title: string = "Settings";
  @ViewChild('sliderToggle') sliderToggle: MatSlideToggle;

  darkToggle: boolean = localStorage.getItem('theme') == 'dark';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  slider(cl) {
    cl.contains("mat-list-item-content") ? this.sliderToggle.toggle() : cl.length == 0 && this.sliderToggle.toggle();
    document.body.classList.toggle("kt-dark-theme") ?
      localStorage.setItem("theme", "dark") :
      localStorage.setItem("theme", "light");
  }

  changePassword() {
    this.dialog.open(UpdatePasswordComponent, {
      autoFocus: true,
      disableClose: true,
      maxWidth: 600
    });
  }

  changeEmail() {
    this.dialog.open(UpdateEmailComponent, {
      autoFocus: true,
      disableClose: true,
      maxWidth: 600
    });
  }

  deleteAccount() {
    if (confirm("Are you sure you want to delete your account?")) {
      alert("This service is not available yet.");
    }
  }

}

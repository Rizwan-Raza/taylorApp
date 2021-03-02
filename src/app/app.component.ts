import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { ElectronService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private snackbar: MatSnackBar
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }

    if (localStorage.getItem("theme") == "dark") {
      document.body.classList.add("kt-dark-theme");
    }
    var dh = new Date().getHours()
    this.snackbar.open(dh < 12 ? "Good Morning" : dh < 16 ? "Good Afternoon" : dh < 20 ? "Good Evening" : "Good Night", "CLOSE", { duration: 4000 });
  }
}

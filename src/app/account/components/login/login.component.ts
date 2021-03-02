import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/account.service';
@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  processing: boolean = false;
  forgot: boolean = false;
  new: boolean = false;
  dMode: boolean = localStorage.getItem("theme") == "dark";

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private snackbar: MatSnackBar, private _router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  changeTheme() {
    document.body.classList.toggle("kt-dark-theme") ?
      localStorage.setItem("theme", "dark") :
      localStorage.setItem("theme", "light");
    this.dMode = !this.dMode;
  }

  toggleSettings(elem) {
    elem.classList.toggle("slideup");
  }

  submit() {
    this.processing = true;
    let email = this.loginForm.value.email;
    this.loginService.login(email, this.loginForm.value.password).then(data => {
      localStorage.setItem("user", JSON.stringify({ uid: data.user.uid, email: data.user.email }));
      localStorage.setItem("isLogin", "1");
      this._router.navigate(['/dashboard']);
    }, error => {
      let sbRef = this.snackbar.open(error.message, 'CLOSE', { duration: 5000 });
      sbRef.onAction().subscribe(() => {
        sbRef.dismiss();
      });

      this.processing = false;
    });
  }

  forgotToggle() {
    this.forgot = !this.forgot;
    this.new = false;
  }

  newToggle() {
    this.new = !this.new;
    this.forgot = false;
  }

  forgotComplete() {
    this.forgot = false;
  }

  newComplete() {
    this.new = false;
  }

}

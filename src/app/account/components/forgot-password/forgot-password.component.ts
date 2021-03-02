import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/account.service';

@Component({
  selector: 'kt-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Output('onComplete') completed = new EventEmitter<boolean>();
  processing: boolean = false;

  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ["", [Validators.required]]
    });
  }

  submit() {
    this.processing = true;
    let email = this.resetForm.value.email;
    this.loginService.resetPassword(email).then(data => {
      this.processing = false;
      this.snackbar.open("Reset Mail Sent Successfully", 'CLOSE', { duration: 5000 });
      this.completed.emit(true);
    }, error => {
      this.snackbar.open(error.message, 'CLOSE', { duration: 5000 });
      this.processing = false;
    });
  }

}

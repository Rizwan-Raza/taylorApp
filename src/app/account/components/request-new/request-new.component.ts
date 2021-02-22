import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/account.service';

@Component({
  selector: 'kt-request-new',
  templateUrl: './request-new.component.html',
  styleUrls: ['./request-new.component.scss']
})
export class RequestNewComponent implements OnInit {


  @Output('onComplete') completed = new EventEmitter<boolean>();
  processing: boolean = false;

  requestNew: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private snackbar: MatSnackBar) {
    this.requestNew = this.formBuilder.group({
      email: ["", Validators.required]
    });

  }

  ngOnInit() {
  }

  submit() {
    this.processing = true;
    let email = this.requestNew.value.email;
    this.loginService.addRequest(email).then(() => {
      this.processing = false;
      this.snackbar.open("Request Sent Successfully", 'CLOSE', { duration: 5000 });
      this.completed.emit(false);
    }, error => {
      this.snackbar.open(error.message, 'CLOSE', { duration: 5000 });
    });
  }

}

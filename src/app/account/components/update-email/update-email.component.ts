import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../services/account.service';

@Component({
  selector: 'kt-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {

  updateEmail: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, public dialogRef: MatDialogRef<UpdateEmailComponent>) { }

  ngOnInit(): void {
    this.updateEmail = this.formBuilder.group({
      currentEmail: ["", Validators.required],
      newEmail: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  submit() {
    this.loginService.updateEmail(this.updateEmail.value.currentEmail, this.updateEmail.value.newEmail, this.updateEmail.value.password);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}

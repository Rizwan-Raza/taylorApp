import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../services/account.service';

@Component({
  selector: 'kt-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  updatePassword: FormGroup;
  misMatch: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, public dialogRef: MatDialogRef<UpdatePasswordComponent>) { }

  ngOnInit(): void {
    this.updatePassword = this.formBuilder.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });

  }

  submit(){
    if(this.updatePassword.value.newPassword == this.updatePassword.value.confirmPassword){
      this.loginService.updatePassword(this.updatePassword.value.currentPassword, this.updatePassword.value.newPassword);
    }else{
      this.misMatch = true;
    }
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}

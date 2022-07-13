import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangePass } from '../models/changePass';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,) { }
              
  public mode = 1;
  public token = '';
  public errorMessage = '';
  public emailControl = new FormControl('', Validators.required);
  public newPasswordControl = new FormControl('', Validators.required);
  public confirmPasswordControl = new FormControl('', [Validators.required, Validators.pattern(this.newPasswordControl.value)]);

  public changePassForm = this.fb.group({
    newPassword: this.newPasswordControl,
    confirmPassword: this.confirmPasswordControl,
  })

  public requestForm = this.fb.group({
    email: this.emailControl,
  })
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(query => {
      this.token = query["token"];
      if (this.token) this.mode = 2;
      else this.mode = 1;
    })
  }

  public requestResetPassword() {
    var email = this.emailControl.value;
    this.userService.requestResetPassword(email).subscribe(token => {
      console.log(token);
      this.emailControl.reset();
    }, error => {

    })
  }

  public resetPassword(formValue: ChangePass) {
    this.userService.resetPassword(this.token, formValue).subscribe(success => {
      this.errorMessage = 'Success';
    }, error => {
      this.errorMessage = 'Failed';

    })
  }

}

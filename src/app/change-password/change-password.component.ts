import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ChangePass } from '../models/changePass';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
  }
  public errorMessage = '';

  public emailControl = new FormControl('', Validators.required);
  public oldPasswordControl = new FormControl('', Validators.required);
  public newPasswordControl = new FormControl('', Validators.required);
  public confirmPasswordControl = new FormControl('',
   [Validators.required, Validators.pattern(this.newPasswordControl.value)]);
  
  public changePassForm = this.fb.group({
    email: this.emailControl,
    oldPassword: this.oldPasswordControl,
    newPassword: this.newPasswordControl,
    confirmPassword: this.confirmPasswordControl,
  })

  public changePassword() {
    if (this.changePassForm.valid) {
      this.userService.changePassword(this.changePassForm.value).subscribe(success => {
        this.errorMessage = "Thay đổi mật khẩu thành công";
        
      }, error => {
        this.changePassForm.reset();
        this.errorMessage = "Thay đổi mật khẩu không thành công";
      });
      
    }
  }

  public getErrorMessage(fc: FormControl) {
    if (fc == this.confirmPasswordControl) {
      if (fc.hasError('pattern')) return "Mật khẩu không giống";
    }
    return fc.hasError('required') ? "Bạn phải điền vào trường này" : "";
  }
}

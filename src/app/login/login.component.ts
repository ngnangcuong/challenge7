import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { UserService } from '../services/user.service';
import { ReCAPTCHA } from './recaptcha';

declare var grecaptcha : ReCAPTCHA;
declare var window : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
             private userService: UserService,
             private router: Router,
             private reCaptchaV3Service: ReCaptchaV3Service) { }

  loginForm = this.fb.group({
    'email': new FormControl('', [
      Validators.required,
    ]),
    'password': new FormControl(),
    'recaptcha': [''],
  })

  siteKey : string = '6Lez19QfAAAAAOD76uihNiKbKv62kL9ap-8KS35_';
  private secretKey: string = '';
  lang : string = 'en';
  sizeCaptcha = 'normal' as const;
  typeCaptcha = 'image' as const;
  themeCaptcha = 'light' as const;
  captchaSuccess : boolean = false;
  private isLoginFailed: boolean = false;

  ngOnInit(): void {
    if(this.userService.isLogedIn()) {
      this.router.navigateByUrl("/");
    }
  }

  login() {
    let numOfFailedLogin: any = localStorage.getItem('failedLogin');
    const postBody = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
      captcha: this.secretKey,
    }

    console.log(postBody);

    this.userService.login(postBody).subscribe((data) => {
      this.isLoginFailed = false;
      localStorage.setItem('failedLogin', '0')
      this.router.navigateByUrl("/");

    },
    (error) => {
      numOfFailedLogin++;
      localStorage.setItem('failedLogin', numOfFailedLogin || 1)
      this.loginForm.reset();
      this.isLoginFailed = true;
    }); 
  }


  public getErrorEmail(): String {
    if (this.isLoginFailed) {
      return 'Email hoặc mật khẩu không đúng';
    }
    return this.loginForm.get('email')!.hasError('required')? 'Bạn phải điền vào trường này' : '';
  }

  public getErrorPassword(): String {
    if (this.isLoginFailed) {
      return 'Email hoặc mật khẩu không đúng';
    }
    return this.loginForm.get('password')!.hasError('required')? 'Bạn phải điền vào trường này' : '';
  }

  handleReset() {
    this.captchaSuccess = false;
    this.secretKey = '';
  }

  handleExpire() {
    this.captchaSuccess = false;
  }

  handleLoad() {
    this.captchaSuccess = false;

  }

  handleSuccess($event: any) {
    this.captchaSuccess = true;
    this.secretKey = $event;
  }

  handleRender(): boolean {
    const numOfFailedLogin: any = localStorage.getItem('failedLogin')!;
    if (numOfFailedLogin >= 2) {
      return true;
    }
    return false;
  }

}

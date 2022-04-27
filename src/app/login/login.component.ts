import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  loginForm = this.fb.group({
    'email': new FormControl('', [
      Validators.required,
    ]),
    'password': new FormControl(),
  })

  ngOnInit(): void {
  }

  login() {
    const postBody = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    }

    this.userService.login(postBody);
    
    console.log(this.userService.token ? this.userService.token : this.userService.errorMessage);
    if (this.userService.errorMessage) {
      this.loginForm.reset();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,
             private userService: UserService,
             private router: Router) { }
  
  ngOnInit(): void {
  }

  registerObj = {
    email: '',
    name: '',
    password: '',
    passwordConfirm:'',
    date: new Date(),
    address: '',
  }
  
  registerForm: FormGroup = this.fb.group({
    'email': new FormControl(this.registerObj.email, [
      Validators.required
    ]),
    'name': new FormControl(this.registerObj.name, [
      Validators.required
    ]),
    'password': new FormControl(this.registerObj.password, [
      Validators.required
    ]),
    'passwordCf': new FormControl(this.registerObj.passwordConfirm, Validators.compose([
      Validators.required,
    ])),
    'date': new FormControl(),
    'address': new FormControl(),
  })

  register() {
    const user = {
      email: this.registerObj.email,
      name: this.registerObj.name,
      password: this.registerObj.password,
    };

    this.userService.register(user);
    if (this.userService.errorMessage != 'Create user successfully') {
      this.userService.errorMessage = '';
      this.registerForm.reset();
    }
  }

}

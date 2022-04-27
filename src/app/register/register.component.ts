import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    'email': new FormControl(),
    'fullname': new FormControl(),
    'password': new FormControl(),
    'passwordCf': new FormControl(),
  })

}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../models/user'

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input()
  username = '';
  @Input()
  userEmail = '';
  @Input()
  myEmail = '';
  constructor(private userService: UserService,
              private dialog: MatDialog) { }
  isEditable = false;
  nameControl = new FormControl(this.username);

  ngOnInit(): void {
  }

  public handleEditField() {
    if (!this.isEditable) {
      this.isEditable = true;
    } else {
      
    }
  }

}

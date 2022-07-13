import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-personal-avatar',
  templateUrl: './personal-avatar.component.html',
  styleUrls: ['./personal-avatar.component.scss']
})
export class PersonalAvatarComponent implements OnInit {

  @Input()
  username: string = '';
  @Input()
  userEmail: string = '';
  @Output()
  mode = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.changeModeToTimestamp();
  }

  public changeModeToIntro() {
    this.mode.emit('intro');
  }

  public changeModeToTimestamp() {
    this.mode.emit('timestamp');
  }

}

import { AfterViewInit, Component, OnInit, ViewChild, AfterContentInit, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, zip } from 'rxjs';
import { PersonalAvatarComponent } from '../personal-avatar/personal-avatar.component';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Post } from '../models/post'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) { }
              
  username: string = '';
  myEmail: string = '';
  userEmail: string = '';
  myPosts = new Observable<Array<Post>>();
  private myCurrentPosts = new Array<Post>();
  mode = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.userEmail = data['userEmail'];
    });
    this.userService.getMe().subscribe(data => {
      this.myEmail = data.email;
    })
    this.userService.getUser(this.userEmail).subscribe(data => {
      this.username = data.name;
    }, error => {
      console.log(error)
    })
  

    this.myPosts = this.postService.InitPost(this.userEmail);
    this.myPosts.subscribe(postList => postList.forEach(post => this.myCurrentPosts.push(post)));
  }

  handleNewPost(event: Post) {
    this.myCurrentPosts = [event, ...this.myCurrentPosts];
    setTimeout(() => {
      this.myPosts = of(this.myCurrentPosts);

    }, 140)

  }

  handleDeletePost(isDeleted: Number) {
    if(isDeleted) {

      this.myPosts = this.myPosts.pipe(map(x => x.filter(post => post.id != isDeleted)));
    }
      
  }

  changeMode(event: string) {
    this.mode = event;
  }
}

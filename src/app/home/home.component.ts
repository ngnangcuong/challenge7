import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, zip, map } from 'rxjs';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Post } from '../models/post'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnChanges {

  constructor(private postService: PostService,
             private activedRoute: ActivatedRoute,
             private router: Router,
             private userService: UserService) { }

  query: string = '';
  postList = new Observable<Array<Post>>();
  private currentPostList = new Array<Post>();
  userData: any = {};
  private nextPage = 2;
  private offset = 10;
             
  ngOnInit(): void {
    if(!this.userService.isLogedIn()) {
      this.router.navigateByUrl("/login");
      return
    }
    this.getUserData();
    this.activedRoute.queryParams.subscribe(data => {
      this.query = data['search'];
      if (this.query) { 
        this.postList = this.postService.SearchPost(this.query);
      } else {
        this.postList =  this.postService.InitPost('');
      };
    })

    this.postList.subscribe(list => list.forEach(post => this.currentPostList.push(post)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.postList = this.postService.InitPost('');
  }


  onScrolledDown(ev: any) {
    if(!this.query) {
      this.appendItems();
    }
  }

  private appendItems() {
    this.addItems();
  }

  private addItems() {
    
    this.postService.LoadMorePost(this.nextPage).subscribe(data => {
      if (data) {
        this.nextPage++;
        data.forEach(element => {
          this.currentPostList.push(element);
        })
      };
    }, error => {
      this.appendItems();
    });
    this.postList = of(this.currentPostList); 
  }

  private getUserData() {
      this.userService.getMe().subscribe(data => {
        this.userData = data;
      }, error => {
        this.userData.name = 'Unknown';
      });
  }

  handleDeletePost(isDeleted: Number) {
    if(isDeleted) {
      this.postList = this.postList.pipe(map(x => x.filter(post => post.id != isDeleted)));
    }
  }

}

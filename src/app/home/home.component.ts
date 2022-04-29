import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
interface Post {
  Id: Number;
  Email: String;
  Content: String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private postService: PostService,
             private activedRoute: ActivatedRoute,
             private router: Router,
             private userService: UserService) { }

  query: string = '';
  postList = new Array<Post>();

  ngOnInit(): void {
    if(!this.userService.isLogedIn()) {
      this.router.navigateByUrl("/login");
      return
    }
    this.activedRoute.queryParams.subscribe(data => {
      this.query = data['search'];
    })
    if (this.query) {
      this.postService.SearchPost(this.query).subscribe(data => {
        if(data) {
          data.forEach(element => {
            this.postList.push(element);
          });

        };
      })
    } else {
      this.postService.InitPost().subscribe(data => {
        data.forEach(element => {
          this.postList.push(element);
        });
      });

    };
  }

  page = 1;
  offset = 10;

  onScrolledDown(ev: any) {
    if(!this.query) {
      this.page += 1;
      this.appendItems();

    }
  }

  private appendItems() {
    this.addItems();
  }

  private addItems() {
    this.postService.LoadMorePost(this.page).subscribe(data => {
      if (data) {

        data.forEach(element => {
          this.postList.push(element);
        })
      };
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Post } from '../models/post';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  constructor(private userService: UserService,
              private postService: PostService,
              private activatedRoute: ActivatedRoute) { }
  
  public postInfo: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      var postId = parseInt(params.get("id")!);
      console.log(postId);
      this.postService.GetPost(postId).subscribe(post => {
        this.postInfo = post;
      })
    })
  }

  
}

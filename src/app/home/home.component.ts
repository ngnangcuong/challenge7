import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService) { }

  postList = [
    {
      id: 1,
      content: 'First post',
      email: 'Cuong'
    },
    {
      id: 2,
      content: 'Second post',
      email: 'Cuong'
    },
    {
      id: 3,
      content: 'Third Post',
      email: 'Cuong'
    },
    {
      id: 4,
      content: 'Fourth Post',
      email: 'Cuong'
    },
    {
      id: 5,
      content: 'Fifth Post',
      email: 'Cuong'
    },
    {
      id: 6,
      content: 'Sixth Post',
      email: 'Cuong'
    },
    {
      id: 7,
      content: 'Seventh Post',
      email: 'Cuong'
    },
  ]

  ngOnInit(): void {
    // this.postService.getAllPost();
    // this.postList = this.postService.postList;
  }

  page = 1;
  offset = 10;

  onScrolledDown(ev: any) {
    this.page += 1;
    this.appendItems();
  }

  appendItems() {
    this.addItems("push");
  }

  addItems(_method: string) {
    for (let i = 0; i < this.offset; ++i) {
      if( _method === 'push'){
        this.postList.push({
          id: 8,
          content: 'Eighth Post',
          email: 'Tham'
        });
      }
    }
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormControlName } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private postService: PostService) { }
  
  @Output()
  newPost = new EventEmitter<Post>();
  ngOnInit(): void {
  }

  createPostForm = this.fb.group({
    createPost: new FormControl(),
    submitButton: new FormControl(),
  });

  public createPost(content: string) {
    this.postService.CreatePost(content).subscribe(data => {
      this.newPost.emit(data);
      this.createPostForm.reset();
    }, error => {
      console.log(error);

    })
  }
}

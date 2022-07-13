import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../services/post.service';
import * as moment from "moment";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl } from '@angular/forms';
import { Post } from '../models/post';

export interface DialogData {
  error: string;
}



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  post: any;
  @Input()
  userEmail: string = '';
  @Input()
  userRole: string = '';
  @Output()
  isDeleted = new EventEmitter<Number>();

  editForm = new FormControl();
  isEditable: boolean = false;
  editFormValue: string = '';
  
  constructor(private postService: PostService,
              public dialog: MatDialog,
              private confirmDialog: MatDialogRef<DialogComponent>,
              ) { }
  
  ngOnInit(): void {
    console.log(this.post);
    this.editFormValue = this.post.content;
  }

  public getTime(): String {
    return moment(this.post.create_at, 'YYYY-MM-DD hh:mm:ss').fromNow();
  } 

  renderEditPost(id: string, email: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      type: 'editPost',
      author: email == this.userEmail || this.userRole == 'admin',
    };
    if (dialogConfig.data.author) {
      this.isEditable = true;

    } else {
      this.confirmDialog = this.dialog.open(DialogComponent, dialogConfig);
    }
  }

  deletePost(id: Number, email: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      type: 'deletePost',
      author: email == this.userEmail || this.userRole == 'admin',
    }
    this.confirmDialog = this.dialog.open(DialogComponent, dialogConfig);

    this.confirmDialog.afterClosed().subscribe(data => {
      console.log(`Dialog result: ${data}, ${id}`);
      if (data) {
        this.postService.DeletePost(id).subscribe(data => {
          console.log(data);
          this.isDeleted.emit(id);
        }, error => console.log(error));
      }
    })
  }

  editPost(id: Number, email: string) {
    const dialogConfig = new MatDialogConfig();
    if (this.editFormValue.trim()) {
      console.log(this.editFormValue)
      this.postService.EditPost(id, this.editFormValue.trim()).subscribe(success => {
        this.post.content = this.editFormValue.trim();
        dialogConfig.data = {
          type: 'successOperation',
          author: true,
        }
      this.confirmDialog = this.dialog.open(DialogComponent, dialogConfig);
      this.confirmDialog.afterClosed().subscribe(data => {
        this.isEditable = false;
      })
      
      }, error => {
        dialogConfig.data = {
          author: true,
          type: 'failedOperation',
        }
        this.confirmDialog = this.dialog.open(DialogComponent, dialogConfig);

      })
    } else {
      dialogConfig.data = {
          author: true,
          type: 'failedOperation',
      }
      this.confirmDialog = this.dialog.open(DialogComponent, dialogConfig);
    }
    
  }
  
}


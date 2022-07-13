import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  type: string = '';
  author: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: {type: string, author: boolean}) {
      this.type = data.type;
      this.author = data.author;
               }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(false);
  }

  accept() {
    this.dialogRef.close(true);
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CommentService} from "../services/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  FlightId: string = '';
  userId: string = '';
  comment: string = '';
  tags: string[] = [];
  newTag: string = '';

  constructor(
    private router: Router,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigateByUrl('');
  }

  addTag() {
    // Add the new tag to the current list and reset newTag field
    this.tags.push(this.newTag);
    this.newTag = '';
  }

  deleteTag(tag: string) {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  newComment() {
    this.commentService.addComment(
      {
        FlightId: this.FlightId,
        comment: this.comment,
        UserId: this.userId,
        Tags: this.tags
      }
    ).toPromise().then(result =>{
      if(result){
        this.snackBar.open('Comment Created', '', {duration: 2000});
      }
    } );
  }
}

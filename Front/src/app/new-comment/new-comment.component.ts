import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommentService} from "../services/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent implements OnInit {

  tags: string[] = [];
  newTag: string = '';
  tagFromControl: FormControl = new FormControl('',[
    Validators.required
  ]);
  form: FormGroup;

  constructor(
    private router: Router,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      FlightId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      UserId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      comment: [null, [Validators.required]],
    })
  }

  goToHome() {
    this.router.navigateByUrl('');
  }

  addTag() {
    // Add the new tag to the current list and reset newTag field
    this.tags.push(this.tagFromControl.value);
    this.tagFromControl.markAsUntouched();
    this.newTag = '';
  }

  deleteTag(tag: string) {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
  }

  newComment() {
    this.commentService.addComment(
      {
        FlightId: this.form.get('FlightId').value,
        comment: this.form.get('comment').value,
        UserId: this.form.get('UserId').value,
        Tags: this.tags
      }
    ).toPromise().then(result =>{
      if(result){
        let snackbar = this.snackBar.open('Comment Created', 'Go to Home', {duration: 2000});
        snackbar.onAction().subscribe(()=>{
          this.goToHome();
        })
      }
    } ).catch((error)=>{
      if(error.error === 'Duplicate comment'){
        this.snackBar.open('Comment already exists', '', {duration: 2000});
      }
    });
  }

  generalValidations(fieldName: string){
    return this.form.get(fieldName).invalid && this.form.get(fieldName).dirty && this.form.get(fieldName).touched
  }
}

import {Component, OnInit} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {CommentService} from "../services/comment.service";
import {Comment} from "../models/Comment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  distinctFlightIDs: [string];
  shownComments: [Comment];
  selectedFlightID: string = '';

  constructor(
    public commentService: CommentService,
    private router: Router
  ) {
    // Get all distinct FlightIDs
    commentService.getDistinctFlightIds().toPromise().then((result: [string]) => {
      this.distinctFlightIDs = result;
    });

    // Populate table with all comments
    commentService.getComments().toPromise().then((result: any) => {
      this.shownComments = result;
    })
  }

  ngOnInit(): void {
  }

  sortData(sort: Sort) {
    // Get comments with the selected sorting
    this.commentService.getComments(this.selectedFlightID, sort.active, sort.direction).toPromise().then((result: [Comment]) =>{
      this.shownComments = result;
    })
  }

  async selectedFlight(flightID: string) {
    this.selectedFlightID = flightID;
    await this.updateCommentsShown();
  }

  async updateCommentsShown(){
    this.commentService.getComments(this.selectedFlightID).toPromise().then((result: [Comment])=>{
      this.shownComments = result;
    })
  }

  newComment() {
    this.router.navigateByUrl('/newComponent');
  }
}

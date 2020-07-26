import {Component, OnInit, ViewChild} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {CommentService} from "../services/comment.service";
import {Comment} from "../models/Comment";
import {Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  distinctFlightIDs: [string];
  displayedColumns: string[] = ['_id', 'UserId', 'comment', 'date', 'Tags'];
  // @ts-ignore
  shownComments: [Comment] = [];
  selectedFlightID: string = '';
  activeSort: string = '';
  directionSort: string = '';
  limit: number = 10;
  skip: number = 0;
  @ViewChild('paginator') paginator: MatPaginator;


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
    this.activeSort = sort.active;
    this.directionSort = sort.direction;
    // Get comments with the selected sorting
    this.updateCommentsShown();
  }

  async selectedFlight(flightID: string) {
    this.selectedFlightID = flightID;
    await this.updateCommentsShown();
  }

  async updateCommentsShown(){
    this.commentService.getComments(this.selectedFlightID, this.activeSort, this.directionSort).toPromise().then((result: [Comment])=>{
      this.paginator.firstPage();
      this.shownComments = result;
    })
  }

  newComment() {
    this.router.navigateByUrl('/newComponent');
  }

  pageEvent(event: PageEvent) {
    this.skip = event.pageIndex * event.pageSize;
    this.limit = event.pageSize;
  }

  getCommentsLength(){
    return this.shownComments.length;
  }
}

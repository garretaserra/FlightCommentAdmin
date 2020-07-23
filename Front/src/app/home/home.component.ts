import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import {CommentService} from "../services/comment.service";
import {Comment} from "../models/Comment";

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  desserts: Dessert[] = [
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
  ];

  distinctFlightIDs: [string];
  shownComments: [Comment];
  sortedData: Dessert[];
  selectedFlightID: string = '';

  constructor(
    public commentService: CommentService
  ) {
    this.sortedData = this.desserts.slice();

    // Get all distinct FlightIDs
    commentService.getDistinctFlightIds().toPromise().then((result: [string]) => {
      this.distinctFlightIDs = result;
    });

    commentService.getComments().toPromise().then((result: any) => {
      this.shownComments = result;
    })
  }

  ngOnInit(): void {
  }

  sortData(sort: Sort) {
    console.log(sort);
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
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
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



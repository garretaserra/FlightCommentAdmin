import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url = 'http://localhost:8080/comment/';

  constructor(
    private http: HttpClient
  ) { }

  getComments(){
    return this.http.get(this.url + 'getComments');
  }

  addComment(data){
    return this.http.post(this.url + 'newComment', data);
  }

  getDistinctFlightIds(){
    return this.http.get(this.url + 'distinctFlightId');
  }
}

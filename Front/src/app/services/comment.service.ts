import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url = 'http://localhost:8080/comment/';

  constructor(
    private http: HttpClient
  ) { }

  getComments(filter?: string, sortColumn?: string, sortOrder?: string, limit?: number, skip?: number){
    // Add all params if they are passed
    let httpParams: any = {};
    if(filter){
      httpParams['FlightId'] = filter;
    }
    if(sortColumn){
      httpParams['sort'] = sortColumn;
    }
    if(sortOrder){
      httpParams['order'] = sortOrder;
    }
    if(limit){
      httpParams['limit'] = limit;
    }
    if(skip){
      httpParams['skip'] = skip;
    }

    return this.http.get(this.url + 'getComments', {params: httpParams});
  }

  addComment(data){
    return this.http.post(this.url + 'newComment', data);
  }

  getDistinctFlightIds(){
    return this.http.get(this.url + 'distinctFlightId');
  }
}

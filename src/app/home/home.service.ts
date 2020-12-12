import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Star } from '../stars/star.model'

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  stars = [];
  API_KEY = 'kDH0QZ8F1f2q2m9YtE6Dkp3G5aSxaMCov97dAjoM';
  starChangedEvent: Subject<Star[]> = new Subject<any[]>();

  constructor(private httpClient: HttpClient) { }


  getSearch(start: Date, end: Date) {
    const response = this.httpClient.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${this.API_KEY}`);
    this.stars = response;
    return this.stars;
  }

  getData() {
    this.httpClient.get('http://localhost:3000/boom').subscribe((response: any) => {
      console.log("Here");
    });;
  }
}

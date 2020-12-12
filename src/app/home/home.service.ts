import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  API_KEY = 'kDH0QZ8F1f2q2m9YtE6Dkp3G5aSxaMCov97dAjoM';

  constructor(private httpClient: HttpClient) { }

  getSearch(start: Date, end: Date) {
    return this.httpClient.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${this.API_KEY}`);
  }

  postData(i: string) {
    this.httpClient.post('http://localhost:3000/starpost', i);
  }
}

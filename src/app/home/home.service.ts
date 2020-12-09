import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  API_KEY = 'kDH0QZ8F1f2q2m9YtE6Dkp3G5aSxaMCov97dAjoM';

  constructor(private httpClient: HttpClient) { }

  getSearch() {
    return this.httpClient.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-08-11&end_date=2021-08-12&api_key=${this.API_KEY}`);
  }
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stars = [];
  data: {} = null;
  flattenedData = [];
  startDate: Date;
  endDate: Date;
  link = '../Assets/meteor.png';
  subscription: Subscription;

  @ViewChild('startdate') startRef: ElementRef;
  @ViewChild('enddate') endRef: ElementRef;
  @ViewChild('loading') loadRef: ElementRef;

  constructor(private homeService: HomeService, private http: HttpClient) { }

  ngOnInit(): void {
    this.subscription = this.homeService.starChangedEvent.subscribe((star: any[]) => {
      this.stars = star;
    });
  }

  formatData(data: any) {
    Object.keys(data.near_earth_objects).forEach(key => {
      this.flattenedData.push(...data.near_earth_objects[key]);
    });
    console.log(this.flattenedData);
  }
  
  search() {
    this.loadRef.nativeElement.innerHTML = 'Loading...';
    this.flattenedData = [];

    this.startDate = this.startRef.nativeElement.value;
    this.endDate = this.endRef.nativeElement.value;

    this.homeService.getSearch(this.startDate, this.endDate).subscribe(data => {
      this.data = data;
      this.formatData(this.data);
    })
  }

}
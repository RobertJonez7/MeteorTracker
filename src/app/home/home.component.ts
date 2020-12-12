import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: {} = null;
  flattenedData = [];
  startDate: Date;
  endDate: Date;
  link = '../Assets/meteor.png';

  @ViewChild('main') mainRef: ElementRef;
  @ViewChild('startdate') startRef: ElementRef;
  @ViewChild('enddate') endRef: ElementRef;
  @ViewChild('loading') loadRef: ElementRef;

  constructor(private homeService: HomeService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  displayCards() {
    this.loadRef.nativeElement.innerHTML = '';
    this.mainRef.nativeElement.innerHTML = this.flattenedData.map(val => {
      const size = Math.round(parseInt(val.estimated_diameter.feet.estimated_diameter_max));
      const date = val.close_approach_data[0].close_approach_date_full;
      const miss =  Math.round(parseInt(val.close_approach_data[0].miss_distance.miles));
      const speed = Math.round(parseInt(val.close_approach_data[0].relative_velocity.miles_per_hour));
      const hazard = val.is_potentially_hazardous_asteroid;
  
      return(
      `<div style="display: flex; flex-direction: column; align-items: center; width:250px; min-height: 300px; margin: 1em; background-color: #f1f1f1; opacity: 100; z-index: 150; font-family: arial">
      <img style="margin-top: 1em; margin-botton: 1em; width: 125px; height: 125px" src="../../assets/meteor.png">
      <div style="display: flex; flex-direction: column">
      <div style="margin-top: 1.25em;">Name: <span style="color: #ff7d00">${val.name}</span></div>
      <div style="margin-top: .25em">Diameter: <span style="color: #ff7d00">~${size}ft</span></div>
      <div style="margin-top: .25em">Time: <span style="color: #ff7d00">${date}</span></div>
      <div style="margin-top: .25em">Miss Distance: <span style="color: #ff7d00">~${miss} miles </span></div>
      <div style="margin-top: .25em">Speed:<span style="color: #ff7d00"> ~${speed}mph</span></div>
      <div style="margin-top: .25em margin-bottom: 1em;">Is Hazardous: <span style="color: ${hazard ? 'red' : 'green'}">${hazard}</span></div>
      <div style="display: flex; justify-content: center">
        <button style="width: 30%; height: 2em; margin-top: 1em; margin-bottom: 1em; color: white; background-color: rgb(72, 136, 173); cursor: pointer; border: none">Save</button>
      </div>
      </div>
      </div>`)}).join('');
  }

  formatData(data: any) {
    Object.keys(data.near_earth_objects).forEach(key => {
      this.flattenedData.push(...data.near_earth_objects[key]);
    });
    console.log(this.flattenedData);
    this.displayCards()
  }

  search() {
    this.mainRef.nativeElement.innerHTML = '';
    this.loadRef.nativeElement.innerHTML = 'Loading...';
    this.flattenedData = [];

    this.startDate = this.startRef.nativeElement.value;
    this.endDate = this.endRef.nativeElement.value;

    this.homeService.getSearch(this.startDate, this.endDate).subscribe(data => {
      this.data = data;
      this.formatData(this.data);
    })
  }

  postData() {
    this.http.post('http://localhost:3000/starpost', "Hello");
  }

}
